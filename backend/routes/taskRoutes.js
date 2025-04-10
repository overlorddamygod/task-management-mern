const router = require("express").Router();
const taskController = require("../controllers/taskController");
const { isAuthenticated } = require("../middlewares/authMiddlewares");
const taskSchema = require("../validations/taskSchema");
const validateBody = require("../middlewares/validate");

router.post("/", isAuthenticated, validateBody(taskSchema), taskController.createTask);
router.get("/", isAuthenticated, taskController.getTasks);
router.delete("/:id", isAuthenticated, taskController.deleteTask);

module.exports = router;