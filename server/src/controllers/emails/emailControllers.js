import { emailConfig } from "../../config/emails.js";

import responses from "../../utils/responses.js";

export const sendEmail = async (req, res ) => {
  const { to, subject, content } = req.body;

  try {
    await emailConfig(to, subject, content);
    responses.success(res, "Email sent successfully");
  } catch (err) {
    if (err.message === "The email address not exist") {
      return responses.badRequest(res, "The email address does not exist");
    }

    return responses.serverError(res);
  }
};
