import { Post, Comment } from "../db/models.js";

export async function getAllPosts() {
  return Post.findAll();
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