import { Post, Comment } from "../db/models.js";

export async function getAllPosts() {
  return Post.findAll();
}

export async function getAllComments() {
  return Comment.findAll();
}

export async function getPostByID(id) {
  return {
    post: {
      title: 'Test',
      link: '',
      image: null,
      subject: 'Testing 123 Testing 123'
    }
  }
  // return Post.findAll({
  //   where: {
  //     postId: id
  //   }
  // });
}

export async function newPost(attributes) {
  console.log("new Post", attributes);
  return {
    post: {
      title: 'Test',
      link: '',
      image: null,
      subject: 'Testing 123 Testing 123'
    }
  }
}

export async function updatePost(id, attributes) {
  console.log("update Post", id, attributes);
  return {
    post: {
      title: 'Test',
      link: '',
      image: null,
      subject: 'Testing 123 Testing 123'
    }
  }
}