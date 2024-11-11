// Controllers
import {
  login,
  logout,
  register,
} from "../controllers/users/authControllers.js";
import { userPayload, verifyUserLogged } from "../middlewares/tokens/tokens.js";
// Validations
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validations/users/authValidations.js";

import { changePassword } from "../controllers/users/accountControllers.js";
import express from "express";
import { validateChangePassword } from "../middlewares/validations/users/userValidations.js";

// Tokens

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.patch(
  "/change-password/:id",
  verifyUserLogged,
  userPayload,
  validateChangePassword,
  changePassword
);

export default router;
