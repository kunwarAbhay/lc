const { Router } = require("express");
const {
    loginPost,
    signupPost,
    checkAuth,
} = require("../../controllers/authController");
const validateBody = require("../../middlewares/validation");
const signupSchema = require("../../utils/validation/signupSchema");
const loginSchema = require("../../utils/validation/loginSchema");

const router = Router();

router.post("/login", validateBody(loginSchema),loginPost);
router.post("/signup", validateBody(signupSchema), signupPost);
router.get("/verify", checkAuth);

module.exports = router;
