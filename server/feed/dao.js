import { Post, Comment } from "../db/models.js";

export async function getAllPosts() {
  return Post.findAll();
}

export async function getAllPostComments(postId, parentId) {
  return Comment.findAll({
    where: {
      postId: postId,
      parentId: parentId,
    },
  });
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
    where: {
      id: id,
    },
  });
}

export async function getPostByID(id) {
  return Post.findOne({
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
