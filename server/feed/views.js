import { getAllPosts, getAllComments } from "./dao.js";

export async function getFeed(req, res) {
  getAllPosts()
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
}

export async function getComments(req, res) {
  getAllComments()
    .then((comments) => res.json(comments))
    .catch((err) => console.log(err));
}