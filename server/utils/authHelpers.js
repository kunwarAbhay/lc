const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const auth = require('../models/auth');
const { excludedRoutes, ACCESS_TOKEN } = require('../constants');
const secret = process.env.JWT_SECRET;


const verifyToken = async (authToken) => {
    try {
        const payload = jwt.verify(authToken, secret);
        const user = await auth.findOne({ uid: payload.data });
        if (!user) {
            return { status: false };
        } else {
            return { status: true, data: user, uid: payload.data };
        }
    } catch (e) {
        return { status: false };
    }
};

const generateUid = (len = 16) => {
    const uid = crypto.randomBytes(len).toString('hex');
    return uid;
};

const resolveToken = async (req, res, next) => {
    const url = req.originalUrl.split('?')[0];
    if (excludedRoutes.includes(url)) {
        next();
    } else {
        const token = req.header(ACCESS_TOKEN)
        const authData = await verifyToken(token);
        if (!authData.status) {
                res.status(401).json({
                    status: false,
                    msg: 'unauthorised access',
                });
        } else {
            req.user = authData.data;
            next();
        }
    }
};

module.exports = {
    verifyToken,
    generateUid,
    resolveToken,
};
