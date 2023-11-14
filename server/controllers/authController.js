const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require("../models/auth");
const { generateUid, verifyToken } = require("../utils/authHelpers");
const { ACCESS_TOKEN } = require('../constants');
const secret = process.env.JWT_SECRET
const saltRounds = 10


const loginPost = async (req, res) => {
    const { email, password } = req.body
    const exists = await auth.findOne({ email });
    if (!exists) {
        res.json({ status: false, msg: 'Wrong email or password' });
    } else {
        const match = await bcrypt.compare(password, exists.password);
        if (match) {
            const token = jwt.sign({ data: exists.uid }, secret, {
                expiresIn: '7d',
            });
            res.status(200).json({ status: true, 
                                    authtoken: token, 
                                    data : {username: exists.username, friends : exists.friends}, 
                                    msg: "Login success" });
            return;
        } else {
            res.json({ status: false, msg: 'wrong username or password' });
        }
    }
};



const signupPost = async (req, res) => {
    try {
        let { email, password, username} = req.body;

        const passhash = await bcrypt.hash(password, saltRounds)
        const uid = generateUid();
        const newUser = {
            uid,
            username,
            email,
            password: passhash,
        };
        new auth(newUser).save().then(() => {
            const token = jwt.sign({ data: uid }, secret, { expiresIn: '7d' });
            res.status(200).json({ status: true, authtoken: token, msg: "Signup success" });

        }).catch(error => {
            let errMsg;
            if (error.code == 11000) {
                errMsg = Object.keys(error.keyValue)[0] + " already exists.";
            } else {
                errMsg = error.message;
            }
            res.json({ status: false, msg: errMsg })
        })
    } catch (err) {
        res.status(500).json({ msg: err.message, status: false });
    }
};


const checkAuth = async (req, res) => {
    const token = req.headers[ACCESS_TOKEN];
    const { status, data} = await verifyToken(token);
    res.status(200).json({
        status,
        data: status ? { username:data.username, email:data.email, friends:data.friends } : null,
    });
};


module.exports = {
    loginPost, signupPost, checkAuth
}

