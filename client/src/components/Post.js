import React, {useState} from 'react';
import PostMenu from "./PostMenu";

import noProfileImage from "../assets/images/no-profile-image.jpg";

function Post(props) {
  const [viewFull, setViewFull] = useState(false);

  return (
    <div className='container max-w-3xl'>
      {
        props.post.image &&
        <div className='relative mb-6'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               className={`text-black h-10 p-2 ${viewFull ? "opacity-20" : "bg-opacity-50" } rounded-full bg-gray-300 hover:bg-gray-400 hover:opacity-100 hover:bg-opacity-50 absolute bottom-2 right-2`}
               onClick={() => setViewFull(!viewFull)}>
            <path stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4l-4-4m4 4v-4m0 4h-4"/>
          </svg>
          <img className={`w-full ${viewFull ? "h-full" : "h-60 object-cover"} rounded-xl border border-gray-300`}
               src={props.post.image} alt='Attached to post'/>
        </div>
      }
      <div className='md:bg-white border-t border-b md:border border-gray-300 md:rounded-2xl p-6'>
        <div className='flex flex-col space-y-2'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-medium text-black'>{props.post.title}</h2>
            {props.user && props.post.userId === props.user.id &&
            <PostMenu postId={props.post.id}/>
            }
          </div>
          <p className='flex flex-row items-center text-sm font-medium text-black'>
            By
            <span
              className='font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400 ml-2'>
                @{props.post.User && props.post.User.name}
            </span>
            <img className='h-7 w-7 bg-gray-300 object-contain rounded-full ml-2'
                 src={props.post.User && props.post.User.image ? props.post.User.image : noProfileImage}
                 alt='User profile'/>
          </p>
          <p
            className='text-base text-black overflow-hidden'>{props.post.body}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;