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
// import { deleteUserAccount } from "../controllers/users/accountControllers.js";
import express from "express";
import { getUserProfile } from "../controllers/users/accountControllers.js";
// import { updateUserProfile } from "../controllers/users/profileControllers.js";
import { validateChangePassword } from "../middlewares/validations/users/userValidations.js";

// import { validateUpdateProfile } from "../middlewares/validations/users/profileValidations.js";

// Tokens

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

// Account

router.patch(
  "/change-password/:id",
  verifyUserLogged,
  userPayload,
  validateChangePassword,
  changePassword
);

router.get("/profile/:id", verifyUserLogged, userPayload, getUserProfile);

// router.patch(
//   "/profile/:id",
//   verifyUserLogged,
//   userPayload,
//   validateUpdateEmail,
//   updateEmail
// );

// router.delete("/account/:id", verifyUserLogged, userPayload, deleteUserAccount);

export default router;
