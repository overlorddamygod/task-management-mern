const prisma = require("../lib/prisma");

const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        completed,
        creatorId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
        where: {
            creatorId: req.user.id,
        },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const task = await prisma.task.findUnique({
        where: {
          id
        },
        });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    if (task.creatorId !== req.user.id) {
        return res.status(403).json({ message: "You do not have permission to update this task" });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
        where: {
          id
        },
        });
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    if (task.creatorId !== req.user.id) {
        return res.status(403).json({ message: "You do not have permission to delete this task" });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
        message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
