const users = require("../models/users.js");
const redis = require("../utils/redisDB.js");

const LEADERBOARD = 'leaderboard';

const getMyRank = async (req, res) => {
    // const { username } = req.user;
    const username = 'tusharshivansh502';
    
    try{
        const user = await redis.hgetall(username);

        if(user !== null){
            res.json({
                status: true,
                data: {
                    user
                },
                msg: "success",
            });
        }else{
            res.json({
                status: false,
                data: [],
                msg: "User NOT Found",
            });
        }
    }catch(err){
        res.json({
            status: false,
            data: [],
            msg: "failure",
        });
    }
};

const updateStanding = async (users) => {
    const usersWithRank = [];
    
    for(const user of users){
        usersWithRank.push([user.rank,user.username]);
    }

    try{
        const pipeline = redis.pipeline();

        users.forEach(user => {
            pipeline.hset(user.username, user);
        })

        pipeline.zadd(LEADERBOARD, ...usersWithRank);

        let retry = 10;

        while(retry > 0){    
            await pipeline
                .exec()
                .then((results) => {
                    console.log("Pipeline Result : ", results);
                    console.log("Retry : ", retry);
                    retry = 0;
                }).catch((error) => {
                    console.log("Pipeline error while updating standing : ", error);
                });

            retry--;
        }

    }catch(err){
        console.log(err);
    }
};

const getStanding = async (req, res) => {
    const { page } = req.params;

    const ITEM_LIMIT = 25;
    const startRank = (page - 1)*ITEM_LIMIT + 1;
    const endRank = (page)*ITEM_LIMIT;

    const allUserDetails = [];

    try{
        // TODO : USE SCRIPTING TO GET BOTH THE RESULT IN A SINGLE QUERY
        const users = await redis.zrange(LEADERBOARD, startRank, endRank, "BYSCORE");

        const pipeline = redis.pipeline();

        users.forEach(user => {
            pipeline.hgetall(user);
        })

        await pipeline
            .exec()
            .then((results) => {
                results.forEach(([_, user]) => {
                    if(user.username){
                        allUserDetails.push(user);
                    }
                })
            }).catch((error) => {
                console.log("Pipeline error while get stanging : ", error);
            });

        allUserDetails.sort((a, b) => a.rank - b.rank);

        res.json({
            status: true,
            data: {
                users : allUserDetails
            },
            msg: "success",
        });
    }catch(err){
        res.json({
            status: false,
            data: [],
            msg: "failure",
        });
    }
};

const getFriendsStanding = async (req, res) => {
    // const { friends } = req.user;
    const friends = ['abhay', 'manish'];

    try{
        const allFriendsDetails = []; 

        for(const friend of friends){
            const friendDetails = await redis.hgetall(friend);
            if(friendDetails.username){
                allFriendsDetails.push(friendDetails);
            }
        }

        allFriendsDetails.sort((a, b) => a.rank - b.rank);
        
        res.json({
            status: true,
            data: {
                friends : allFriendsDetails
            },
            msg: "success",
        });
    }catch(err){
        res.json({
            status: false,
            data: [],
            msg: "failure",
        });
    }
};

module.exports = {
    getMyRank, 
    getStanding,
    getFriendsStanding,
    updateStanding
};
