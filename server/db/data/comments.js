import { Comment } from "../models.js";

const comments = [
  {
    text: "Comment1",
    postId: 1,
  },
  {
    text: "Comment2",
    postId: 1,
  },
  {
    text: "Comment3",
    postId: 3,
  },
  {
    text: "Comment4",
    postId: 3,
  },
];

export async function createComments() {
  return Comment.bulkCreate(comments);
}
