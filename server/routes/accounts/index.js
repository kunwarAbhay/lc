const { Router } = require('express')
const { friendsList, updateFriends } = require('../../controllers/accountsController')

const router = Router()

router.get('/', (req, res) => {
    const { username, email, friends } = req.user._doc
    res.json({
        status: true, data: {
            profile: { username, email, friends }
        }
    })
})

router.get("/friends", friendsList)
router.put("/friends", updateFriends)
router.delete("/friends", updateFriends)


module.exports = router
