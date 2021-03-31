import { User } from "../models.js";

const users = [
  {
    email: "first@gmail.com",
    password: "password",
    name: "first",
    isAdmin: true,
  },
  {
    email: "second@gmail.com",
    password: "password",
    name: "second",
    isAdmin: false,
  },
];

export async function createUsers() {
  return User.bulkCreate(users);
}
