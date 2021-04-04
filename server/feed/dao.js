import sequelize_pkg from 'sequelize';
const { Op } = sequelize_pkg;
import { Post, Comment, User } from '../db/models.js';

export async function getAllPosts(searchText) {
  if (searchText) {
    return Post.findAll({
      include: User,
      where: {
        title: {
          [Op.iLike]: `%${searchText}%`,
        },
      },
    });
  } else {
    return Post.findAll({ include: User });
  }
}

export async function getAllComments() {
  return Comment.findAll();
}
