import jwt from "jsonwebtoken";
import responses from "../../utils/responses.js";

const secretKey = process.env.SECRET_KEY;

export const verifyUserLogged = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return responses.badRequest(res, "You are not logged");
  }

  const onlyToken = token.split(" ")[1];

  try {
    jwt.verify(onlyToken, secretKey);
    next();
  } catch (err) {
    return responses.unauthorized(res, "Invalid token");
  }
};

export const userPayload = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];

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
