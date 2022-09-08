import Joi from "joi";

export const valRegisStudent = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repassword: Joi.string().min(6).required(),
  gender: Joi.string().valid("Male", "Female").required(),
});

export const valLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const valCreateOrmawa = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});
