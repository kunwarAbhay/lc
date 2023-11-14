const { Router } = require("express");

const { fetchUsers, searchUsers, regSearchUsers, fetchUser, fetchUserRating } = require("../../controllers/usersController");

const router = Router()

router.get('/', fetchUsers)
router.get('/search', searchUsers )
router.get('/profile/:username', fetchUser)
router.get('/profile/rating/:username', fetchUserRating)
router.get("/autocomplete", regSearchUsers)

module.exports = router
