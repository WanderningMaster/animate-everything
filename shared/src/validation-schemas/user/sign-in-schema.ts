import Joi from "joi";
import { UserCreateRequestDto } from "~/common/types/user/user-create-request-dto";

export const userSignIn = Joi.object<Omit<UserCreateRequestDto, "username">, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .min(6)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .required()
    .messages({
      "string.email": "Email no valid",
      "string.empty": "Email is required",
      "string.min": "Email too small",
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(16)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password should have 8-16 characters",
      "string.max": "Password should have 8-16 characters",
    }),
});