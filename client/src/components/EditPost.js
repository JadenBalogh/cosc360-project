import React, {useState, useEffect} from 'react';
import PostEntry from './PostEntry'
import axios from "axios";

function EditPost(props) {
  const postId = 1;
  const [post, setPost] = useState({
    title: '',
    link: '',
    image: null,
    subject: ''
  });
  const editURL = `${process.env.REACT_APP_HOST || ''}/feed/edit-post`;
  const postURL = `${process.env.REACT_APP_HOST || ''}/feed/get-post`;

  useEffect(() => {
    // TODO: get id
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
  }, []);

  const handleSubmit = (title, image, link, subject) => {
    // TODO: handle new post on server side
    axios
      .put(editURL, {
        postId: postId,
        data: {
          title, image, link, subject
        }
      })
      .then((res) => {
        // TODO: success message
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