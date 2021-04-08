import {Post, Comment} from "../db/models.js";

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

export async function newComment(postId, attributes, commentId) {
  let newComment = Comment.create({
    text: attributes.text,
    postId: postId,
    // comments: []
  });
  // , {
  //   include: Comment
  // });
  // console.log(newComment);
  // if (commentId !== -1) {
  //   await Comment.update({
  //     comments: [...this.comments, {id: newComment.id}]
  //   }, {
  //     where: {
  //       id: commentId
  //     }
  //   });
  // }
  return newComment;
}

export async function destroyComment(id) {
  return Comment.destroy({
    where: {
      id: id
    }
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