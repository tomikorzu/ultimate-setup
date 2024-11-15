import {
  getProfileData,
  updatePassword,
} from "../../services/users/authServices.js";

import responses from "../../utils/responses.js";
import { validateErrors } from "../../middlewares/validations/users/authValidations.js";

export const changePassword = async (req, res) => {
  const { newPassword } = req.body;

  const id = req.params.id;

  if (validateErrors(req, res)) return;

  const result = await updatePassword({ id, newPassword });

  if (result) {
    return responses.success(res, "Password changed successful", id);
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  const data = await getProfileData(res, id);

  if (data) return res.status(200).json({ data });
};
