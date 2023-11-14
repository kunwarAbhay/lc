const redis = require("../utils/redisDB.js");

const getContests = async (req, res) => {
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


module.exports = {
    getContests
};
