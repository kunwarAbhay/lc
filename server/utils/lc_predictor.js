/* 
https://leetcode.com/discuss/general-discussion/468851/New-Contest-Rating-Algorithm-(Coming-Soon)
*/


const redis = require("../utils/redisDB.js");
const { fetchUserRating } = require('../controllers/usersController.js');
const LEADERBOARD = 'leaderboard';

// calcultate probability a wins b
const getEloWinProbability = (a, b) => {
    return 1.0 / (1.0 + Math.pow(10.0, (b - a) / 400.0));
}

const getSeed = (contestants, rating) => {
    let seed = 1.0;
    
    for(const other of contestants){
        seed += getEloWinProbability(other.oldRating, rating);
    }

    return seed;
}

const getExpectedRatingToRank = (contestants, realRating, rank) => {
    let left = 1, right = 8000;

    while(left <= right){
        const mid = parseInt((left + right) / 2);

        if(getSeed(contestants, mid) - getEloWinProbability(realRating, mid) < rank){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }

    return left;
}

const calculate = (contestants) => {
    for(const contestant of contestants){
        contestant.seed = getSeed(contestants, contestant.oldRating) - 0.5;
        // geometric mean of expected ranking and actual ranking
        const m = Math.sqrt(contestant.rank * contestant.seed); 
        contestant.expectedRating = parseInt(getExpectedRatingToRank(contestants, contestant.oldRating, m));
        const k = 0.5; // but it will actually be determined by the number of contest particpated by this contestant 
        contestant.delta = parseInt(k * (contestant.expectedRating - contestant.oldRating));
    }

    contestants.sort((a, b) => b.oldRating - a.oldRating);
    
    // Total sum should not be greater than 0
    {
        let sum = 0;
        for(const contestant of contestants){
            sum += parseInt(contestant.delta);
        }
        
        const inc = parseInt(-sum / contestants.length) - 1
        
        for(const contestant of contestants){
            contestant.delta += inc;
        }
    }
    
    // sum of top - 4*sqrt(N) should be adjusted to 0 
    {
        let sum = 0;
        
        const zeroSumCount = Math.min(parseInt(Math.round(4 * Math.sqrt(contestants.length))), contestants.length);
        
        for(let i = 0;i < zeroSumCount;i++){
            sum += contestants[i].delta;
        }
        
        const inc = Math.min(Math.max(parseInt(-sum / zeroSumCount), -10), 0);
        
        for(const contestant of contestants){
            contestant.delta += inc;
        }
    }
}

const getContestants = async () => {
    // Later on this data will come from Leetcode ranklist
    const response = await fetch(`https://codeforces.com/api/contest.ratingChanges?contestId=653`);

    const contestants = [];
    const contestantsRating = new Map();

    try{
        const users = await redis.zrange(LEADERBOARD, 0, 30000, "BYSCORE");

        const pipeline = redis.pipeline();
        const ratingPipeline = redis.pipeline();

        users.forEach(user => {
            pipeline.hgetall(user);
            ratingPipeline.hgetall(`leetcode:${user}`);
        })

        await pipeline
            .exec()
            .then((results) => {
                results.forEach(([_, user]) => {
                    if(user.username){
                        contestants.push({username : user.username, rank : user.rank});
                    }
                })
            }).catch((error) => {
                console.log("Pipeline error while get stanging : ", error);
            });



        await ratingPipeline
            .exec()
            .then(async (results) => {
                const ratings = [];
                results.forEach(([_, {rating}]) => {
                    ratings.push(rating);
                });

                const api_req = [];

                for(let i = 0;i < ratings.length;i++){
                    if(ratings[i] === undefined){
                        api_req.push(fetchUserRating(users[i]));
                    }

                    if(api_req.length === 25){
                        await Promise.all(api_req);
                        console.log("curr", i);
                    }
                }
                
                await Promise.all(api_req);

                console.log("ratings : ", results);
            }).catch((error) => {
                console.log("Pipeline error while get stanging : ", error);
            });
            
            

        contestants.sort((a, b) => a.rank - b.rank);
    }catch(err){
        console.log(err); 
    }

    // console.log(contestants);

    return contestants;

    // const data = await response.json();
    
    // Extract only required data
    // contestants = data.result.map(contestant => {
    //     const {handle, rank, oldRating, newRating}  = contestant; 

    //     return {handle, rank, oldRating, newRating};
    // });
}

/* Steps to predict ratings */
// 1. Load the current ratings of all user.
// 2. Load all 


const main = async () => {
    // Get all the contestants of the specified contest ID
    const contestants = await getContestants();
    
    // calculate(contestants);

    contestants.sort((a, b) => b.rank - a.rank);

    // for(const contestant of contestants){
    //     const realDelta = contestant.newRating - contestant.oldRating;
    //     const predictedDelta = Math.round(contestant.delta);

    //     console.log(contestant.rank, contestant.handle, contestant.oldRating, contestant.expectedRating, realDelta, predictedDelta);
    // }
}

module.exports = {
    main
}