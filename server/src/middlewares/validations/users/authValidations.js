import { body, validationResult } from "express-validator";

import {
  searchEmail,
  searchPassword,
  searchUsername,
} from "../../../services/users/validationServices.js";

export const validateRegister = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 characters")
    .custom(async (value) => await searchUsername(value)),
  body("email")
    .normalizeEmail()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const result = await searchEmail(value);
      if (result) {
        throw new Error("Email is already in use");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 40 })
    .withMessage("Password must be between 8 and 30 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#\$%\^&\*]/)
    .withMessage(
      "Password must contain at least one special character (!@#$%^&*)"
    ),
  body("fullname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Fullname cannot be empty")
    .isLength({ min: 4, max: 50 })
    .withMessage("Fullname must be between 4 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Fullname must only contain letters and spaces"),
];

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const result = await searchEmail(value);

      if (!result) {
        throw new Error("Email not found");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^[a-zA-Z0-9!@#\$%\^&\*]+$/)
    .withMessage("Password contains invalid characters")
    .custom((value, { req }) => searchPassword(value, req)),
];

export const validateErrors = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validations = errors.array().map((value) => {
      return value.msg;
    });

    const messages = validations.map((msg) => {
      return msg.message || msg;
    });
    const statusCode = validations.map((msg) => {
      return msg.code || 400;
    });

    if (validations.length > 0) {
      return res.status(statusCode[0]).json({
        message: messages[0],
      });
      // return responses.badRequest(res, validations)
    }
  }
};
