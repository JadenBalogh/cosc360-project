import { Post, Comment } from "../db/models.js";

export async function getAllPosts() {
  return Post.findAll();
}

export async function getAllComments() {
  return Comment.findAll();
}
