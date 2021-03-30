import React from 'react';
import PostEntry from './PostEntry'

function CreatePost(props) {

  const handleSubmit = (title, image, link, subject) => {
    // TODO: handle new post on server side
    return props.history.push('/');
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center my-5'>
        <PostEntry submitAction={handleSubmit} title={null} imageLink={null} link={null} subject={null}>
          <h1 className='text-2xl font-medium w-full text-center text-black'>Create Post</h1>
        </PostEntry>
      </div>
    </>
  );
}

export default CreatePost;