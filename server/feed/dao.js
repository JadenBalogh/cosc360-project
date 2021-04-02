import { Post, Comment, User } from '../db/models.js';

export async function getAllPosts() {
  return Post.findAll({ include: User });
}

export async function getAllComments() {
  return Comment.findAll();
}
