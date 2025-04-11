const router = require("express").Router();
const authController = require("../controllers/authController");
const validateBody = require("../middlewares/validate");
const {
  registerUserSchema,
  loginUserSchema,
} = require("../validations/userSchema");
const { isAuthenticated } = require("../middlewares/authMiddlewares");

router.post(
  "/register",
  validateBody(registerUserSchema),
  authController.register
);
router.post("/login", validateBody(loginUserSchema), authController.login);
router.get("/me", isAuthenticated, authController.getMe);

module.exports = router;
