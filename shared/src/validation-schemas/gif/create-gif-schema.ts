import Joi from "joi";

export const uploadGif = Joi.object<{ title: string }, true>({
  title: Joi.string().min(3).max(15).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title too small",
  }),
});
