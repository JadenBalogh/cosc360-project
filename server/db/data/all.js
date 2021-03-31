import { createUsers } from "./users.js";
import { sequelize } from "../sequelize.js";
import { createPosts } from "./posts.js";
import { createComments } from "./comments.js";

export async function reCreateDB() {
  return sequelize.sync({ force: true }).catch((err) => console.log(err));
}

export async function populateDB() {
  await reCreateDB();
  const usersPromise = createUsers();
  const postsPromise = createPosts();
  const commentsPromise = createComments();
  return Promise.all([usersPromise, postsPromise, commentsPromise]);
}
