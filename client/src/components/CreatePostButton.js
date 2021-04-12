import React from 'react';
import {Link} from "react-router-dom";

function CreatePostButton(props) {
  return (
    <Link to='/create' id='create-post'
          className='w-12 h-12 self-center rounded-full shadow-lg text-white flex justify-center items-center fixed bottom-5 bg-gradient-to-br from-purple-400 to-red-500 hover:from-purple-500 transition'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"/>
      </svg>
    </Link>
  );
}

export default CreatePostButton;