const { Router } = require("express");

const { getContests } = require("../../controllers/contestController");

const router = Router();

router.get('/', getContests);

module.exports = router;
