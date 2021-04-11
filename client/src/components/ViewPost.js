import React, {useEffect, useState} from 'react';
import Post from "./Post";
import Comment from "./Comment";
import AddComment from "./AddComment";
import axios from "axios";
import {Link} from "react-router-dom";
import {authenticationService} from "../_services";
import {bufferToImage} from "../_helpers";

function ViewPost(props) {
  const postId = props.match.params.id || null;
  const URL = (props.match.url).split("/");
  const [post, setPost] = useState({
    id: -1,
    title: '',
    image: null,
    link: '',
    subject: ''
  });
  const [comments, setComments] = useState([]);
  const [referenceComment, setReferenceComment] = useState(null);
  const commentsURL = `${process.env.REACT_APP_HOST || ''}/feed/comments`;
  const postURL = `${process.env.REACT_APP_HOST || ''}/feed/get-post`;
  const user = authenticationService.currentUserValue;

  const setComment = (values) => {
    setReferenceComment(values);
  }

  const getPost = () => {
    axios
      .get(postURL, {
        params: {
          id: postId
        }
      })
      .then((res) => {
        if (res.data) {
          setPost({
            id: res.data.id || -1,
            title: res.data.title || '',
            image: res.data.image || null,
            link: res.data.link || '',
            body: res.data.body || ''
          });
          console.log(res.data.image)
          console.log(res);
        } else {
          props.history.push('/');
        }
        // TODO: get user to display user info
      })
      .catch((err) => {
        // TODO: display error through banner and redirect
        console.log(err);
      });
  }

  const refreshComments = () => {
    axios
      .get(commentsURL, {
        params: {
          postId: postId,
          parentId: null
        }
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        // TODO: display error through banner and redirect
        console.log(err);
        return null;
      });
  }

  const getUser = (userId) => {
    return null;
  }

  useEffect(() => {
    getPost();
    refreshComments();
    let refreshTimer = setInterval(() => {
      refreshComments();
    }, 10000);
    return () => clearInterval(refreshTimer)
  }, []);

  return (
    <>
      <div className='flex flex-row items-center container max-w-3xl mx-auto mb-4 text-gray-400 pl-6'>
        <Link to='/' className='hover:text-gray-700 h-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"/>
        </svg>
        {post.title}
      </div>
      <main className={`w-full flex flex-col items-center space-y-4 ${user ? 'mb-28' : 'mb-4'}`}>
        <Post post={post} user={user}/>
        {comments.map((data, index) => (
          <Comment key={data.comment.id} comment={data.comment} comments={data.comments} setComment={setComment}
                   refreshComments={refreshComments} user={user}/>
        ))}
        <AddComment refreshComments={refreshComments} postId={postId} referenceComment={referenceComment}
                    setReferenceComment={setComment} user={user}/>
      </main>
    </>
  );
}

export default ViewPost;