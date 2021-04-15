import React, {useCallback, useEffect, useState} from 'react';
import Post from "./Post";
import Comment from "./Comment";
import AddComment from "./AddComment";
import axios from "axios";
import {Link} from "react-router-dom";
import {authenticationService} from "../_services";
import Alert from "./Alert";

function ViewPost(props) {
  const postId = props.match.params.id || null;
  const [post, setPost] = useState({
    id: -1,
    title: '',
    image: null,
    link: '',
    subject: ''
  });
  const [comments, setComments] = useState([]);
  const [referenceComment, setReferenceComment] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertVariant, setAlertVariant] = useState("error");
  const [profileError, setProfileError] = useState("");
  const commentsURL = `${process.env.REACT_APP_HOST || ''}/feed/comments`;
  const postURL = `${process.env.REACT_APP_HOST || ''}/feed/get-post`;
  const user = authenticationService.currentUserValue;

  const setComment = (values) => {
    setReferenceComment(values);
  }

  function closeAlert() {
    setIsAlertVisible(false);
  }

  const getPost = useCallback(() => {
    axios
      .get(postURL, {
        params: {
          id: postId
        }
      })
      .then((res) => {
        if (res.data) {
          setPost(res.data);
        } else {
          props.history.push('/');
        }
      })
      .catch(() => {
        setProfileError("Unable to get post!");
        setIsAlertVisible(true);
        setAlertVariant("error");
      });
  }, [postId, postURL, props.history])

  const refreshComments = useCallback(() => {
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
      .catch(() => {
        setProfileError("Unable to get comments!");
        setIsAlertVisible(true);
        setAlertVariant("error");
      });
  }, [commentsURL, postId])

  useEffect(() => {
    getPost();
    refreshComments();
    let refreshTimer = setInterval(() => {
      refreshComments();
    }, 10000);
    return () => clearInterval(refreshTimer)
  }, [getPost, refreshComments]);

  return (
    <>
      <main className={`w-full flex flex-col items-center ${user ? 'mb-28' : 'mb-4'}`}>
        <div className='container max-w-3xl mx-auto pb-4 sticky top-20'>
          <Alert visible={isAlertVisible} callback={closeAlert} variant={alertVariant}>
            {profileError}
          </Alert>
        </div>
        <div className='flex flex-row items-center container max-w-3xl mx-auto mb-4 text-gray-400 pl-10'>
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
        <Post post={post} user={user}/>
        <div className='w-full px-4 md:mx-0'>
        {comments.map((data, index) => (
          <Comment key={data.comment.id} comment={data.comment} comments={data.comments} setComment={setComment}
                   refreshComments={refreshComments} user={user} setProfileError={setProfileError}
                   setAlertVariant={setAlertVariant} setIsAlertVisible={setIsAlertVisible}/>
        ))}
        </div>
        <AddComment refreshComments={refreshComments} postId={postId} referenceComment={referenceComment}
                    setReferenceComment={setComment} user={user} setProfileError={setProfileError}
                    setAlertVariant={setAlertVariant} setIsAlertVisible={setIsAlertVisible}/>
      </main>
    </>
  );
}

export default ViewPost;