import njwt from "njwt";
import dotenv from "dotenv";

dotenv.config();

export function encodeToken(tokenData) {
  return njwt.create(tokenData, process.env.APP_SECRET).compact();
}

export function decodeToken(token) {
  return njwt.verify(token, process.env.APP_SECRET).body;
}
