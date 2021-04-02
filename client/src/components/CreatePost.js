import React from 'react';
import PostEntry from './PostEntry'
import axios from "axios";

function CreatePost(props) {
  const publishURL = `${process.env.REACT_APP_HOST || ''}/feed/publish-post`;

  const handleSubmit = (title, image, link, subject) => {
    console.log('sub')
    axios
      .put(publishURL, {
        data: {
          title, image, link, subject
        }
      })
      .then((res) => {
        console.log('success creating');
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
        <PostEntry submitAction={handleSubmit} title={''} imageLink={''} link={''}
                   subject={''} edit={false}>
          Create Post
        </PostEntry>
      </div>
    </>
  );
}

export default CreatePost;