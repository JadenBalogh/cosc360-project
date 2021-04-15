import sequelize_pkg from 'sequelize';
import { Comment, Post, User } from '../db/models.js';

const { Op } = sequelize_pkg;

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

export async function getAllPostComments(postId) {
  return Comment.findAll({
    include: User,
    where: {
      postId: postId
    },
    order: [['createdAt', 'ASC']],
  });
}

export async function nestAllPostComments(postId) {
  // TODO: Make this more efficient. Currently checking through all comments until
  // TODO: the correct comment is found and then inserting, not very efficient.
  let commentsData = [];
  let comments = await getAllPostComments(postId);

  const findCommentArrayInsert = (commentData, parentId, comment) => {
    commentData.forEach(data => {
      if (data.comment.id === parentId) {
        data.comments.push({
          comment: comment,
          comments: []
        });
      } else {
        findCommentArrayInsert(data.comments, parentId, comment);
      }
    });
  }

  let count = comments.length;
  while (count > 0) {
    comments.map(async comment => {
      count--;
      if (comment.User.image) comment.User.image = comment.User.image.toString();
      if (!comment.parentId) {
        await commentsData.push({
          comment: comment,
          comments: []
        });
      } else {
        findCommentArrayInsert(commentsData, comment.parentId, comment);
      }
    });
  }
  return commentsData;
}

export async function newComment(attributes) {
  return Comment.create(attributes);
}

export async function updateComment(id, attributes) {
  return Comment.update(attributes, {
    where: {
      id: id,
    },
  });
}

export async function destroyComment(id) {
  return Comment.destroy({
    where: {
      id: id,
    },
  });
}

export async function getCommentByID(id) {
  return Comment.findOne({
    include: User,
    where: {
      id: id,
    },
  });
}

export async function getPostByID(id) {
  return Post.findOne({
    include: User,
    where: {
      id: id,
    },
  });
}

export async function newPost(attributes) {
  return Post.create(attributes);
}

export async function updatePost(id, attributes) {
  return Post.update(attributes, {
    where: {
      id: id,
    },
  });
}

export async function destroyPost(id) {
  return Post.destroy({
    where: {
      id: id,
    },
  });
}