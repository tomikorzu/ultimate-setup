import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { validateErrors } from "../../middlewares/validations/authValidations.js";
import responses from "../../utils/responses.js";

import { addUser, getIdByEmail } from "../../services/users/authServices.js";

export const register = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  try {
    if (validateErrors(req, res)) return;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await addUser({
      res,
      username,
      email,
      hashedPassword,
      fullname,
    });

    console.log(result);

    responses.created(res, "User registered successfully", {});
  } catch (err) {
    responses.serverError(res);
  }
};

const secretKey = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { email } = req.body;

  if (validateErrors(req, res)) return;

  const result = await getIdByEmail({ res, email });
  console.log(result);

  const token = jwt.sign({ id: result }, secretKey);

  res.cookie("token", token);
  responses.success(res, "Login successful");
};
