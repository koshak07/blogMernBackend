import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid format email").isEmail(),
  body("password", "Password mast be min 5 simbols").isLength({ min: 5 }),
  body("fullName", "Name is wrong").isLength({ min: 3 }),
  body("avatarUrl", "Invalid link on avatar").optional().isURL(),
];
export const loginValidation = [
  body("email", "Invalid format email").isEmail(),
  body("password", "Password mast be min 5 simbols").isLength({ min: 5 }),
];
export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isArray(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
