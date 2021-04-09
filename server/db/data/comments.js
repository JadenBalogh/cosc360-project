import { Comment } from "../models.js";

const comments = [
  {
    text: "Comment1",
    postId: 1,
    parentId: null,
    userId: 1,
  },
  {
    text: "Comment2",
    postId: 3,
    parentId: null,
    userId: 2,
  },
  {
    text: "Comment3",
    postId: 1,
    parentId: 1,
    userId: 2,
  },
  {
    text: "Comment4",
    postId: 1,
    parentId: 3,
    userId: 1,
  },
];

export async function createComments() {
  return Comment.bulkCreate(comments);
}
