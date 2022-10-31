import Joi from "joi";
import { UserCreateRequestDto } from "~/common/types/user/user-create-request-dto";

export const userSignUp = Joi.object<UserCreateRequestDto & { confirmPassword: string }, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .min(6)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .required()
    .messages({
      "string.email": "Email not valid",
      "string.empty": "Email is required",
      "string.min": "Email too small",
    }),
  username: Joi.string()
    .trim()
    .min(6)
    .required()
    .messages({
      "string.username": "Username no valid",
      "string.empty": "Username is required",
      "string.min": "Username too short",
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(16)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password is too short",
      "string.max": "Password is too long",
    }),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password not match",
    }),
});