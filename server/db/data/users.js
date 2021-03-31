import { User } from "../models.js";

const users = [
  {
    email: "first@gmail.com",
    password: "password",
  },
  {
    email: "second@gmail.com",
    password: "password",
  },
];

export async function createUsers() {
  return User.bulkCreate(users);
}
