import jwt from "jsonwebtoken";
import responses from "../../utils/responses.js";

const secretKey = process.env.SECRET_KEY;

export const verifyUserLogged = () => {
  const token = req.headers.cookie;

  if (!token) {
    return responses.badRequest(res, "You are not logged");
  }

  const onlyToken = token.split("token=")[1];
  console.log(onlyToken);

  jwt.verify(onlyToken, secretKey);
  next();
};

export const userPayload = () => {
  const authHeader = req.headers.cookie;

  if (!authHeader)
    return responses.badRequest(res, "The access token is required");

  jwt.verify(authHeader, secretKey, (err, decoded) => {
    if (err) return responses.unauthorized(res, "Invalid Token");

    req.user = {
      id: decoded.id,
    };

    if (Object.values(decoded.id) != req.params.id) {
      return responses.forbidden(res, "User not authorized");
    }

    next();
  });
};
