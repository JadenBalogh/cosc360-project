import { getAllPosts } from './dao.js';

export async function getFeed(req, res) {
  const posts = getAllPosts();
  return res.json({ posts });
}
