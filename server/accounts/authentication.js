import njwt from "njwt";

export function encodeToken(tokenData) {
  return njwt.create(tokenData, process.env.APP_SECRET).compact();
}

export function decodeToken(token) {
  return njwt.verify(token, process.env.APP_SECRET).body;
}
