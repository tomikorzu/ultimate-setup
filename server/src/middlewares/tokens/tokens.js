import jwt from "jsonwebtoken";
import responses from "../../utils/responses.js";

const secretKey = process.env.SECRET_KEY;

export const verifyUserLogged = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return responses.badRequest(res, "You are not logged");
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (err) {
    return responses.unauthorized(res, "Invalid token");
  }
};

export const userPayload = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return responses.badRequest(res, "The access token is required");

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return responses.unauthorized(res, "Invalid Token");

    req.user = {
      id: decoded,
    };

    if (decoded.id.id != req.params.id) {
      return responses.forbidden(res, "User not authorized");
    }

    next();
  });
};
