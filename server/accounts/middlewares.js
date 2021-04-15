import { findUser } from "./dao.js";
import { decodeToken } from "./authentication.js";

export const jwtAuthenticationMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return next();
  }

  try {
    const decoded = decodeToken(token);
    const { userId } = decoded;
    const user = await findUser(userId);
    if (user) {
      req.userId = userId;
      req.user = user;
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

export async function isAdminMiddleware(req, res, next) {
  if (req.user?.isAdmin) {
    return next();
  }
  res.status(403);
  return res.json({ error: "Permission Denied" });
}
