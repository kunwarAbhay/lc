const { Router } = require("express");

const { fetchUsers, searchUsers } = require("../../controllers/usersController");

const router = Router()


router.get('/', fetchUsers)

router.get('/search', searchUsers )


module.exports = router
