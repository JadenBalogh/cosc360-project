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

export async function createUser(email, password, name, image) {
  return User.create({
    email: email,
    password: password,
    name: name,
    image: image,
  });
}

export async function updateUser(id, attributes) {
  return User.update(attributes, {
    where: {
      id: id,
    },
  });
}
