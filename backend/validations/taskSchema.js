const joi = require("joi");

const taskSchema = joi.object({
  title: joi.string().min(3).required(),
  description: joi.string().optional(),
  completed: joi.boolean().optional(),
});

module.exports = taskSchema;