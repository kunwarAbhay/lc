const auth = require("../models/auth");

const friendsList = async (req, res) => {
    try {
        const { uid } = req.user
        const ret = await auth.findOne({ uid })
        res.json({ status: true, data: { friends: ret.friends } })
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
}

const updateFriends = async (req, res) => {
    try {
        const cmd = req.method === "PUT" ? "$addToSet" :"$pull"
        const { username } = req.body
        const { uid } = req.user
        await auth.findOneAndUpdate({ uid }, { [cmd]: { friends: username }})
        res.json({ status: true, msg:"success" })
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
}
module.exports = {
    friendsList,
    updateFriends
}
