import React, {useState, useEffect} from 'react';
import PostEntry from './PostEntry'
import axios from "axios";

function EditPost(props) {
  const [postId, setPostId] = useState(0);
  const [post, setPost] = useState(undefined)
  const editURL = `${process.env.REACT_APP_HOST || ''}/feed/edit-post`;
  const postURL = `${process.env.REACT_APP_HOST || ''}/feed/get-post`;

  useEffect(() => {
    // TODO: get id
    setPostId(1);
  }, []);

  useEffect(() => {
    // TODO: get values of post from server side
    axios
      .get(postURL, {
        params: {
          postId: postId
        }
      })
      .then((res) => {
        setPost(res.data.post);
      })
      .catch((err) => {
        // TODO: display error
        console.log('error');
      });
  }, [postId])

  const handleSubmit = (title, image, link, subject) => {
    // TODO: handle new post on server side
    axios
      .put(editURL, {title, image, link, subject})
      .then((res) => {
        console.log('success editing');
        return props.history.push('/');
      })
      .catch((err) => {
        // TODO: display error
        console.log('error');
      });
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center my-5'>
        <PostEntry submitAction={handleSubmit} title={post.title} imageLink={post.imageLink} link={post.link}
                   subject={post.subject} edit={true}>
          Edit Post
        </PostEntry>
      </div>
    </>
  );
}

export default EditPost;