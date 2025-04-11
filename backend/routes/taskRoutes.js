const router = require("express").Router();
const taskController = require("../controllers/taskController");
const { isAuthenticated } = require("../middlewares/authMiddlewares");
const { taskSchema, updateTaskSchema } = require("../validations/taskSchema");
const validateBody = require("../middlewares/validate");

router.post("/", isAuthenticated, validateBody(taskSchema), taskController.createTask);
router.get("/", isAuthenticated, taskController.getTasks);
router.patch("/:id", isAuthenticated, validateBody(updateTaskSchema), taskController.updateTask);
router.delete("/:id", isAuthenticated, taskController.deleteTask);

module.exports = router;