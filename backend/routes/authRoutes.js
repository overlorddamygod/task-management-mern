const router = require("express").Router();
const authController = require("../controllers/authController");
const validateBody = require("../middlewares/validate");
const {registerUserSchema, loginUserSchema} = require("../validations/userSchema");

router.post("/register", validateBody(registerUserSchema), authController.register);
router.post("/login", validateBody(loginUserSchema), authController.login);

module.exports = router;