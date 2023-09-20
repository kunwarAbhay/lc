const { Router } = require("express");

const { getMyRank, getStanding, getFriendsStanding, updateStanding } = require("../../controllers/standingController");

const router = Router();

router.get('/my-rank', getMyRank);
router.get('/page/:page', getStanding);
router.get('/friends', getFriendsStanding);
// router.get('/update', updateStanding);

module.exports = router;
