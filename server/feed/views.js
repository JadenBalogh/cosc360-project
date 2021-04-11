import {
  getAllPosts,
  getPostByID,
  newPost,
  updatePost,
  newComment,
  destroyComment,
  updateComment,
  getCommentByID,
  nestAllPostComments,
  destroyPost
} from "./dao.js";

export async function getFeed(req, res) {
  getAllPosts({})
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
}

export async function getPostComments(req, res) {
  const { postId=null, parentId=null } = req.query;
  nestAllPostComments(postId)
    .then((comments) => res.json(comments))
    .catch((err) => console.log(err));
}

export async function addComment(req, res) {
  const { text, postId, parentId } = req.body;
  const userId = req.user.id;

  newComment({ text, postId, parentId, userId })
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((err) => {
      res.send(err);
    });
}

export async function editComment(req, res) {
  const { id, text } = req.body;

  const comment = await getCommentByID(id);

  if (comment.userId !== req.user.id) {
    res.status(403);
    res.json({
      error: "Permission Denied",
    });
  }
  updateComment(id, { text })
    .then((comment) => {
      res.status(200);
      res.json(comment);
    })
    .catch((err) => {
      res.send(err);
    });
}

export async function deleteComment(req, res) {
  const { id } = req.body;

  const comment = await getCommentByID(id);

  if (!req.user.isAdmin && comment.userId !== req.user.id) {
    res.status(403);
    res.json({
      error: "Permission Denied",
    });
    return;
  }
  destroyComment(id)
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
  const {
    title = null,
    link = null,
    image = null,
    body = null
  } = req.body;

  newPost({
    userId: req.user.id,
    title,
    link,
    image,
    body,
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
  const {
    title = null,
    link = null,
    image = null,
    body = null,
    id = null,
  } = req.body;

  const post = await getPostByID(id);

  if (post.userId !== req.user.id) {
    res.status(403);
    res.json({
      error: "Permission Denied",
    });
    return;
  }

  updatePost(id, {
    title,
    link,
    image,
    body,
  })
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((err) => {
      res.send(err);
    });
}

export async function deletePost(req, res) {
  const { id } = req.body;

  const post = await getPostByID(id);

  if (!req.user.isAdmin && post.userId !== req.user.id) {
    res.status(403);
    res.json({
      error: "Permission Denied",
    });
    return;
  }
  destroyPost(id)
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((err) => {
      res.send(err);
    });
}
