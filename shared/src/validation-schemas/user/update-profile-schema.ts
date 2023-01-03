import Joi from "joi";
import { UserUpdateRequestDto } from "~/common/types/user/user-update-request-dto";

export const userUpdate = Joi.object<UserUpdateRequestDto>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .min(6)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .messages({
      "string.email": "email not valid",
      "string.min": "email too small",
    }),
  username: Joi.string()
    .trim()
    .min(3)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .messages({
      "string.min": "email too small",
    }),
  privacy: Joi.boolean(),
});
