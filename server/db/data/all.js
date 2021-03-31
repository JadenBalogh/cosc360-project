import { createUsers } from "./users.js";
import { sequelize } from "../sequelize.js";

export async function reCreateDB() {
  return sequelize.sync({ force: true }).catch((err) => console.log(err));
}

export async function populateDB() {
  await reCreateDB();
  const usersPromise = createUsers();
  return Promise.all([usersPromise]);
}
