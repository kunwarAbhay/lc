const users = require("../models/users.js");

const { ITEM_LIMIT } = require("../constants.js");
const { buildQuery, validate } = require("../utils/helpers.js");

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
        data: [],
        msg: "failure",
    });
};

module.exports = {
    fetchUsers,
    searchUsers,
};
