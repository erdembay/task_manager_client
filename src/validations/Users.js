import Joi from "joi";
export const loginControl = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Kullanıcı Adı Boş Olamaz.",
    "string.empty": "Kullanıcı Adı Boş Olamaz.",
    "base.required": "Kullanıcı Adı Girilmelidir",
  }),
  password: Joi.string().required().messages({
    "string.base": "Şifre Boş Olamaz.",
    "string.empty": "Şifre Boş Olamaz.",
    "base.required": "Şifre Girilmelidir",
  }),
});
export const forgotMyPasswordControl = Joi.object({
  email: Joi.string().required().messages({
    "string.base": "E-Posta Adresi Boş Olamaz.",
    "string.empty": "E-Posta Adresi Boş Olamaz.",
    "base.required": "E-Posta Adresi Girilmelidir",
  }),
});
