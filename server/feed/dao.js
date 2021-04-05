import sequelize_pkg from 'sequelize';
const { Op } = sequelize_pkg;
import { Post, Comment, User } from '../db/models.js';

export async function getAllPosts(searchText, sortOrder) {
  return Post.findAll({
    include: User,
    ...(searchText && {
      where: {
        title: {
          [Op.iLike]: `%${searchText}%`,
        },
      },
    }),
    ...(sortOrder && {
      order: [['createdAt', sortOrder]],
    }),
  });
}

export async function getAllComments() {
  return Comment.findAll();
}
