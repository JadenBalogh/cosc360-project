import sequelize_pkg from 'sequelize';
const { Op } = sequelize_pkg;
import { Post, Comment, User } from '../db/models.js';

export async function getAllPosts(searchText, sortByDate) {
  return Post.findAll({
    include: User,
    ...(searchText && {
      where: {
        title: {
          [Op.iLike]: `%${searchText}%`,
        },
      },
    }),
    ...(sortByDate && {
      order: [['createdAt', 'DESC']],
    }),
  });
}

export async function getAllComments() {
  return Comment.findAll();
}
