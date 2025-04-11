const joi = require("joi");

const taskSchema = joi.object({
  title: joi.string().min(3).required(),
  description: joi.string().allow(null, ""),
  completed: joi.boolean().optional(),
});

const updateTaskSchema = joi.object({
  completed: joi.boolean().optional(),
});

module.exports = { taskSchema, updateTaskSchema };