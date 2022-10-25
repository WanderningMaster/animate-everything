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
      "string.email": "email not valid",
      "string.empty": "email is required",
      "string.min": "email too small",
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(16)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.min": "password too small",
      "string.max": "Password too big",
    }),
});