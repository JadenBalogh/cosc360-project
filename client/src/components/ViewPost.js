import React, {useState, useEffect} from 'react';
import Post from "./Post";
import Comment from "./Comment";
import AddComment from "./AddComment";

function ViewPost(props) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const getCommentsURL = `${process.env.REACT_APP_HOST || ''}/REPLACEMENT`;
  const getPostURL = `${process.env.REACT_APP_HOST || ''}/REPLACEMENT`;

  const getPost = () => {
    // TODO: Get post based on id passed in url
  }

  const refreshComments = () => {
    // TODO: Get and update comments based on id
    alert('refresh!');
  }

  useEffect(() => {
    getPost();
    refreshComments();
  }, []);

  return (
    <main className='w-full flex flex-col items-center space-y-4 mb-28'>
      {/* TODO: Give info to post component based on 'post' */}
      <Post/>
      {/* TODO: Replace this block of comments with the array 'comments' */}
      <Comment>
        <Comment/>
      </Comment>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <AddComment refreshComments={refreshComments}/>
    </main>
  );
}

export default ViewPost;