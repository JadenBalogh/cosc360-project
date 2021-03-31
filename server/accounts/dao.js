import dotenv from "dotenv";
import { User } from "../db/models.js";

dotenv.config();

export async function findUser(email, password) {
  try {
    if (isFinite(email)) {
      return await User.findByPk(email);
    }
    if (password == null) {
      return await User.findOne({
        where: {
          email: email,
        },
      });
    }
    return await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  } catch (e) {
    return null;
  }
}

export async function createUser(email, password) {
  return User.create({
    email: email,
    password: password,
  });
}
