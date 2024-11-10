import responses from "../../../utils/responses.js";

export const validateEmail = (req, res, next) => {
  const { to, subject, content } = req.body;

  if (!to || !subject || !content) {
    return responses.badRequest(res, "Please provide all fields");
  }

  next();
};
