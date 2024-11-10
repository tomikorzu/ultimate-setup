import { body } from "express-validator";

import { getPassword } from "../../../services/users/validationServices.js";

export const validateChangePassword = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required")
    .matches(/^[a-zA-Z0-9!@#\$%\^&\*]+$/)
    .withMessage("Password contains invalid characters")
    .custom(async (value, { req }) => {
      await getPassword({
        id: req.params.id,
        oldPassword: value,
        newPassword: req.body.newPassword,
      });
    }),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long")
    .matches(/^[a-zA-Z0-9!@#\$%\^&\*]+$/)
    .withMessage("New password contains invalid characters"),
];
