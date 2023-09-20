const { updateStanding } = require("../controllers/standingController");

const BASE_URL = `https://leetcode.com/contest/api/ranking`;
const CONTEST = `weekly-contest-363`;
const BATCH_SIZE = 100;

let TOTAL_PAGES = 100;

const getRankByPage = (page) => {
    const URL = `${BASE_URL}/${CONTEST}?pagination=${page}&region=global`
    let retry = 20;
    return new Promise(async (resolve, reject) => {
        while(retry){
            try{
                const response = await fetch(URL);
                const { total_rank, questions, submissions, user_num} = await response.json();

                TOTAL_PAGES = Math.ceil(user_num / 25);

                console.log(`SUCCESS : ${page}`)

                return resolve({total_rank, questions, submissions});
            }catch(error){
                console.log("ERROR", `retry-count : ${20 - retry}`, `Page : ${page}`, error);
            }

            retry -= 1;
        }
        reject(`Unable To Fetch this page`);
    });
}

const getAllRank = async () => {
    
    for(let page = 1;page <= TOTAL_PAGES;page += BATCH_SIZE){
        
        const api_req = [];

        for(let k = page;k < page + BATCH_SIZE && k <= TOTAL_PAGES;k++){
            api_req.push(getRankByPage(k));
        }
        
        const data = [];

        await Promise.all(api_req).then((responses) => {
            responses.forEach(({total_rank, questions, submissions}) => {

                const questions_id = [];

                
                questions.forEach(question => questions_id.push(question.question_id));
                
                for(let i = 0;i < total_rank.length;i++){
                    const user = {};
                    user.username = total_rank[i].username;
                    user.country_code = total_rank[i].country_code;
                    user.rank = total_rank[i].rank;
                    user.score = total_rank[i].score;
                    user.finish_time = total_rank[i].finish_time
                    user.solved = "";
                    user.timestamp = "";

                    const timestamp = [];
                    const solved = [];

                    questions_id.forEach(id => {
                        if(id in submissions[i]) {
                            solved.push('1');
                            timestamp.push(String(submissions[i][id]["date"]));
                        }else{
                            solved.push('0')
                            timestamp.push("");
                        }
                    });

                    user.solved = solved.join(":");
                    user.timestamp = timestamp.join(":");

                    data.push(user);
                }
            });
        });

        // console.log(data);
        updateStanding(data);
    }
}

module.exports = {
    getAllRank
}
