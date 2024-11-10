import express from "express";

// Controllers
import { register, login } from "../controllers/users/authControllers.js";
import { changePassword } from "../controllers/users/accountControllers.js";

// Tokens

import { verifyUserLogged, userPayload } from "../middlewares/tokens/tokens.js";

// Validations
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validations/users/authValidations.js";
import { validateChangePassword } from "../middlewares/validations/users/userValidations.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.patch(
  "/change-password/:id",
  verifyUserLogged,
  userPayload,
  validateChangePassword,
  changePassword
);

export default router;
