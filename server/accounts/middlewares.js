import { findUser } from "./dao.js";
import { decodeToken } from "./authentication.js";

export const jwtAuthenticationMiddleware = async (req, res, next) => {
  const token = req.header("Access-Token");
  if (!token) {
    return next();
  }

  try {
    const decoded = decodeToken(token);
    const { userId } = decoded;
    if (await findUser(userId)) {
      req.userId = userId;
    }
  } catch (e) {
    return next();
  }
  next();
};

export async function isAuthenticatedMiddleware(req, res, next) {
  if (req.userId) {
    return next();
  }

  res.status(401);
  return res.json({ error: "User not authenticated" });
}
