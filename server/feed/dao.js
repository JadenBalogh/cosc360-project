import sequelize_pkg from 'sequelize';
const { Op } = sequelize_pkg;
import { Post, Comment, User } from '../db/models.js';

export async function getAllPosts(options) {
  return Post.findAll({
    include: User,
    ...(options.searchText && {
      where: {
        title: {
          [Op.iLike]: `%${options.searchText}%`,
        },
      },
    }),
    ...(options.sortOrder && {
      order: [['createdAt', options.sortOrder]],
    }),
  });
}

export async function getAllComments(id) {
  return Comment.findAll({
    where: {
      postId: id
    }
  });
}

export async function newComment(postId, attributes) {
  return Comment.create({
    text: attributes.text,
    postId: postId
  });
}

export async function getPostByID(id) {
  return Post.findAll({
    where: {
      id: id
    }
  });
}

export async function newPost(attributes) {
  return Post.create({
    title: attributes.title,
    body: attributes.body
  });
}

export async function updatePost(id, attributes) {
  return Post.update({
    title: attributes.title,
    body: attributes.body
  }, {
    where: {
      id: id
    }
  });
}