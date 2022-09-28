import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid format email").isEmail(),
  body("password", "Password mast be min 5 simbols").isLength({ min: 5 }),
  body("fullName", "Name is wrong").isLength({ min: 3 }),
  body("avatarUrl", "Invalid link on avatar").optional().isURL(),
];
