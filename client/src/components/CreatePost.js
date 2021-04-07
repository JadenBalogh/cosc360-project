import React from 'react';
import PostData from './PostData'

function CreatePost(props) {
  return (
    <>
      <div className='flex flex-col justify-center items-center my-5'>
        <PostData {...props} edit={false}>
          Create Post
        </PostData>
      </div>
    </>
  );
}

export default CreatePost;