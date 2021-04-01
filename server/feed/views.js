import { getAllPosts, getAllComments, getPostByID, newPost, updatePost } from "./dao.js";

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

export async function getPost(req, res) {
  getPostByID(req.postId)
    .then((post) => res.json(post))
    .catch((err) => res.send(err));
}

export async function publishPost(req, res) {
  const { title, link, image, body } = req.body;

  newPost({
    title, link, image, body
  })
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((err) => {
      res.send(err);
    });
}

export async function editPost(req, res) {
  const { title, body } = req.body;
  const id = req.postId;

  updatePost(id, {
    title, body
  })
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((err) => {
      res.send(err);
    })
}