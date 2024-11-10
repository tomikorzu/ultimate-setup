import { validateErrors } from "../../middlewares/validations/authValidations.js";
import { updatePassword } from "../../services/users/authServices.js";
import responses from "../../utils/responses.js";

export const changePassword = async (req, res) => {
  const { newPassword } = req.body;

  const id = req.params.id;
  

  if (validateErrors(req, res)) return;

  const result = await updatePassword({id, newPassword});

  if (result) {
    return responses.success(res, "Password changed successful", id);
  }
};
