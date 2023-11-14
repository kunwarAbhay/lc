const { contestRanking, currentRating,currentRatingCN } = require("../utils/queries.js");
const redis = require("../utils/redisDB.js");

const users = require("../models/users.js");

const { ITEM_LIMIT } = require("../constants.js");
const { buildQuery, validate } = require("../utils/helpers.js");

// Converted into async function
const updateUserData = async (username, data) => {
    try{
        users.updateOne({username}, data, {upsert:true})
        const fieldsAdded = await redis.hset(`leetcode:${username}`,{
                rating: data.rating,
            },
        )
        console.log(fieldsAdded, username);
    }catch(e){
        console.log("error", e)
    }
}

const updateUserDataX = async (username, data) => {
    try{
        // users.updateOne({username}, data, {upsert:true})
        const fieldsAdded = await redis.hset(`leetcode:${username}`,{
                rating: data.rating,
            },
        )
        console.log(fieldsAdded, username);
        // const redisUSer = await redis.hget(`${username}`, 'score')
        // console.log(redisUSer);
    }catch(e){
        console.log("error", e)
    }
}

const fetchUsers = async (req, res) => {
    let { page = 1, limit = ITEM_LIMIT[0] } = req.query;
    if (!ITEM_LIMIT.includes(Number(limit))) {
        limit = ITEM_LIMIT[0];
    }
    const data = await users
        .find({})
        .skip((page - 1) * limit)
        .limit(Number(limit));
    if (data && data.length !== 0) {
        res.json({
            status: true,
            data: data,
            msg: "success",
        });
        return;
    }
    res.json({
        status: false,
        data: [],
        msg: "failure",
    });
};

const fetchUserRatingX = async (username) => {

    const response1 = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com/'
        },
        body: JSON.stringify({query : currentRating, variables: { username }}),
    })

    const data1 = await response1.json()

    if(data1.errors){
        const response2 = await fetch('https://leetcode.cn/graphql/noj-go', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.cn/'
            },
            body: JSON.stringify({query : currentRatingCN, variables: { username }}),
        });

        const data2 = await response2.json();
                
        return data2;
    }

    return data1;
}

const fetchUserRating = async (username) => {
    // const { username } = req.params;
    const data = await fetchUserRatingX(username);

    console.log(username, data);

    try {
        if (data.errors) {
            res.json({ status: false, msg: data.errors[0].message });
        } else {
            const { userContestRanking } = data.data

            const finalData = { ...userContestRanking }
            updateUserDataX(username, finalData);
            // console.log(data);
            // res.json({ status: true, data : data  })
        }
    } catch (err) {
        console.log('Error', err);
        // res.json({ status: false, msg: err.message })
    }
} 

const fetchUser = async (req, res) => {
    const { username } = req.params;
    const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({ query: contestRanking, variables: { username } }),
    })
    const data = await response.json();

    // console.log(data);
    try {
        if (data.errors) {
            res.json({ status: false, msg: data.errors[0].message });
        } else {
            const { matchedUser: {
                username, githubUrl, linkedinUrl, profile,
            }, userContestRanking } = data.data
            Object.entries(profile).forEach(([k, v]) => {
                profile[k] = typeof v === 'object' && v !== null ? v.join(",") : v;
            });
            const finalData = { username, githubUrl, linkedinUrl, ...profile, ...userContestRanking }
            finalData.currentGlobalRanking = finalData.globalRanking
            finalData.currentRating = finalData.rating
            updateUserData(username, finalData);
            // console.log(data);
            res.json({ status: true, data:finalData  })
        }
    } catch (err) {
        console.log('Error', err);
        res.json({ status: false, msg: err.message })
    }
}

const searchUsers = async (req, res) => {
    const {
        text = "",
        country = "",
        school = "",
        page = 1,
        limit = ITEM_LIMIT[0],
    } = req.query;

    if (!ITEM_LIMIT.includes(Number(limit))) {
        limit = ITEM_LIMIT[0];
    }

    const queryValue = {
        ...(validate(text) && { text }),
        ...(validate(school) && { school }),
        ...(validate(country) && { countryCode: country }),
    };

    const query = await buildQuery(queryValue);
    if (Object.keys(query).length === 0) {
        res.json({
            status: false,
            msg: "Invalid Query"
        })
        return
    }
    const data = await users
        .find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    if (data && data.length !== 0) {
        res.json({
            status: true,
            data: data,
            msg: "success",
        });
        return;
    }
    res.json({
        status: false,
        msg: "failure",
    });
};

const regSearchUsers = async (req, res) => {
    try {
        const { q } = req.query
        var regex = new RegExp(q, 'i');
        const data = await users.find({ username: regex }, 'username -_id').limit(20);
        res.status(200).json({ status: true, msg: "Success", data: data.map(o => o.username) });
    } catch (error) {
        res.status(500).json({ status: false, msg: error.message });
    }
}

module.exports = {
    fetchUsers,
    searchUsers,
    regSearchUsers,
    fetchUser,
    fetchUserRating
};
