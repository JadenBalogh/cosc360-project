import sequelize_pkg from 'sequelize';
const { Op } = sequelize_pkg;
import { Post, Comment, User } from '../db/models.js';

export async function getAllPosts(options) {
  return Post.findAll({
    include: User,
    ...(options.searchText && {
      where: {
        title: {
          [Op.iLike]: `%${options.searchText}%`,
        },
      },
    }),
    ...(options.sortOrder && {
      order: [['createdAt', options.sortOrder]],
    }),
  });
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