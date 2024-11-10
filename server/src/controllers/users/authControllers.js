import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { validateErrors } from "../../middlewares/validations/users/authValidations.js";
import responses from "../../utils/responses.js";

import { addUser, getIdByEmail } from "../../services/users/authServices.js";

const secretKey = process.env.SECRET_KEY;

export const register = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  if (validateErrors(req, res)) return;

  const hashedPassword = await bcrypt.hash(password, 10);

  await addUser({
    res,
    username,
    email,
    hashedPassword,
    fullname,
  });
  const result = await getIdByEmail({ res, email });

  const token = jwt.sign({ email, id: result }, secretKey);

  res.cookie("token", token, { httpOnly: true });

  responses.created(res, "User registered successfully", { token });
};

export const login = async (req, res) => {
  const { email } = req.body;

  if (validateErrors(req, res)) return;

  const result = await getIdByEmail({ res, email });

  const token = jwt.sign({ id: result }, secretKey);

  res.cookie("token", token, { httpOnly: true });
  responses.success(res, "Login successful", { token });
};
