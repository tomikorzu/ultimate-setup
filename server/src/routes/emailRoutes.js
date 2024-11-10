import express from "express";

// Controllers
import { sendEmail } from "../controllers/emails/emailControllers.js";

// Tokens
import { verifyUserLogged } from "../middlewares/tokens/tokens.js";

import { validateEmail } from "../middlewares/validations/emails/emailValidations.js";

const router = express.Router();

router.post("/send", verifyUserLogged, validateEmail, sendEmail);

export default router;
