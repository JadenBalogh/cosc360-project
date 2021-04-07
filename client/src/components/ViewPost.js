import React, {useState, useEffect} from 'react';
import Post from "./Post";
import Comment from "./Comment";
import AddComment from "./AddComment";
import axios from "axios";

function ViewPost(props) {
  const postId = props.match.params.id || -1;

  const [post, setPost] = useState({
    title: '',
    image: null,
    link: '',
    subject: ''
  });
  const [comments, setComments] = useState([]);
  const commentsURL = `${process.env.REACT_APP_HOST || ''}/feed/comments`;
  const postURL = `${process.env.REACT_APP_HOST || ''}/feed/get-post`;

  const getPost = () => {
    axios
      .get(postURL, {
        params: {
          id: postId
        }
      })
      .then((res) => {
        setPost({
          title: res.data[0].title || '',
          image: res.data[0].image || null,
          link: res.data[0].link || '',
          body: res.data[0].body || ''
        });
        // TODO: get user to display user info
      })
      .catch((err) => {
        // TODO: display error through banner and redirect
        console.log(err);
      });
  }

  const refreshComments = () => {
    // TODO: Get and update comments based on id
    console.log("refresh");
    axios
      .get(commentsURL, {
        params: {
          id: postId
        }
      })
      .then((res) => {
        setComments(res.data);
        // TODO: get users to display user info
      })
      .catch((err) => {
        // TODO: display error through banner and redirect
        console.log(err);
      });
  }

  useEffect(() => {
    getPost();
    refreshComments();
    setInterval(() => {
      refreshComments();
    }, 10000);
  }, []);

  return (
    <main className='w-full flex flex-col items-center space-y-4 mb-28'>
      <Post post={post}/>
      {/* TODO: Replace this block of comments with the array 'comments' */}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment}/>
      ))}
      <AddComment refresh={refreshComments} postId={postId}/>
    </main>
  );
}

export default ViewPost;