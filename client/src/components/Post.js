import React from 'react';
import PostMenu from "./PostMenu";

function Post(props) {
  return (
    <div className='container max-w-3xl'>
      {
        props.image &&
        <div className='w-full h-60 object-cover rounded-xl border border-gray-300 relative'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               className='text-black h-12 p-3 rounded-full bg-gray-300 hover:bg-gray-400 absolute bottom-0 right-0'>
            <path stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4l-4-4m4 4v-4m0 4h-4"/>
          </svg>
          <img className='w-full h-full' src={props.image} alt='Attached to post'/>
        </div>
      }
      <div className='md:bg-white border-t border-b md:border border-gray-300 md:rounded-2xl p-6'>
        <div className='flex flex-col space-y-2'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-medium text-black'>{props.title}</h2>
            <div>
              <PostMenu/>
            </div>
          </div>
          <p className='flex flex-row items-center text-sm font-medium text-black'>
            By
            <span
              className='font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400 ml-2'>
                @{props.username}
            </span>
            <img className='h-7 w-7 bg-gray-300 object-contain rounded-full ml-2' src={props.profilePic}
                 alt='User profile'/>
          </p>
          <p
            className='text-base text-black overflow-hidden'>{props.body}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;