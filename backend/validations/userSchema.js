const joi = require("joi");

const emailRule = joi.string().email().required().messages({
  "string.email": "Email must be a valid email address.",
  "string.empty": "Email is required.",
})

const passwordRule = joi.string().min(8).pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_+=-]{7,}$/, 'starts with uppercase')
.required().messages({
  "string.min": "Password must be at least 8 characters long.",
  "string.pattern.name": "Password must start with an uppercase letter.",
  "string.empty": "Password is required.",
})

const registerUserSchema = joi.object({
  name: joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters long.",
    "string.empty": "Name is required.",
  }),
  email: emailRule,
  password: passwordRule,
});

const loginUserSchema = joi.object({
  email: emailRule,
  password: passwordRule,
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
};
