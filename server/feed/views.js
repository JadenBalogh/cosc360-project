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
  const { title, link, image, subject } = req.body.data;

  newPost({
    title, link, image, subject
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
  const { title, link, image, subject } = req.body.data;
  const id = req.body.postId;

  updatePost(id, {
    title, link, image, subject
  })
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((err) => {
      res.send(err);
    })
}