const Joi = require("@hapi/joi");
const customJoi = Joi.extend(require("joi-age"));

// register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(100).required().email(),
    password: Joi.string().min(5).required(),
    categoryId: Joi.required(),
  });
  return schema.validate(data);
};

// login validation
const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(6).max(100).required().email(),
      password: Joi.required(),
    });
    return schema.validate(data);
  };

module.exports = { registerValidation, loginValidation };
