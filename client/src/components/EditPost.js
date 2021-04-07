import React from 'react';
import PostData from './PostData'

function EditPost(props) {
  return (
    <>
      <div className='flex flex-col justify-center items-center my-5'>
        <PostData {...props} edit={true}>
          Edit Post
        </PostData>
      </div>
    </>
  );
}

export default EditPost;