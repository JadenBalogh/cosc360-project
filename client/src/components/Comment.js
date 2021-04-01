import React from 'react';
import CommentDrop from "./CommentDrop";

function Comment(props) {
  return (
    <div className='container max-w-3xl'>
      <div className='md:bg-white border-t border-b md:border border-gray-300 md:rounded-2xl p-6'>
        <div className='flex flex-col space-y-2'>
          <div className='flex justify-between items-center'>
            <h2 className='flex flex-row items-center text-sm font-medium text-black'>
              <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400'>
                @{props.username}
              </span>
              <img className='h-7 w-7 bg-gray-300 object-contain rounded-full ml-2' src={props.profilePic}
                   alt='User profile'/>
            </h2>
            <CommentDrop/>
          </div>
          <p className='text-base text-black overflow-hidden'>{props.body}</p>
        </div>
      </div>
      {props.children &&
        <div className='pl-16 md:pl-32 mt-4'>
          {props.children}
        </div>
      }
    </div>
  );
}

export default Comment;