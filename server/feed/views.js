import {getAllPosts, getAllComments, getPostByID, newPost, updatePost, newComment} from "./dao.js";

export async function getFeed(req, res) {
  getAllPosts()
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
}

export async function getComments(req, res) {
  getAllComments(req.query.id)
    .then((comments) => res.json(comments))
    .catch((err) => console.log(err));
}

export async function addComment(req, res) {
  const text = req.body.data.comment;
  const id = req.body.postId;

  newComment(id, { text })
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((err) => {
      res.send(err);
    });
}

export async function getPost(req, res) {
  getPostByID(req.query.id)
    .then((post) => res.json(post))
    .catch((err) => res.send(err));
}

export async function publishPost(req, res) {
  const { title, link, image, body } = req.body.data;

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
  const { title, link, image, body } = req.body.data;
  const id = req.body.id;

  updatePost(id, {
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