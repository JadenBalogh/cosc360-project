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

export async function newComment(postId, attributes, commentId) {
  let newComment = Comment.create({
    text: attributes.text,
    postId: postId,
    // comments: []
  });
  // , {
  //   include: Comment
  // });
  // console.log(newComment);
  // if (commentId !== -1) {
  //   await Comment.update({
  //     comments: [...this.comments, {id: newComment.id}]
  //   }, {
  //     where: {
  //       id: commentId
  //     }
  //   });
  // }
  return newComment;
}

export async function destroyComment(id) {
  return Comment.destroy({
    where: {
      id: id
    }
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