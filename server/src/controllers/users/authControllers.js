import { addUser, getIdByEmail } from "../../services/users/authServices.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import responses from "../../utils/responses.js";
import { validateErrors } from "../../middlewares/validations/users/authValidations.js";

const secretKey = process.env.SECRET_KEY;

export const register = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  if (validateErrors(req, res)) return;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await addUser({
      res,
      username,
      email,
      hashedPassword,
      fullname,
    });
    const userId = await getIdByEmail({ res, email });

    const token = jwt.sign({ id: userId }, secretKey);

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      message: "User registered successfully",
      data: { token, id: userId.id, username },
    });
  } catch (e) {
    responses.serverError(res);
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  if (validateErrors(req, res)) return;

  try {
    const userId = await getIdByEmail({ res, email });

    const token = jwt.sign({ id: userId }, secretKey);

    res.cookie("token", token, { httpOnly: true });
    responses.success(res, "Login successful", { token });
  } catch (e) {
    responses.serverError(res);
  }
};

export const logout = (req, res) => {
  if (!req.cookies.token)
    return responses.badRequest(res, "You are not logged");

  res.cookie("token", "", {
    expires: new Date(0),
  });

  return responses.success(res, "User logout");
};
