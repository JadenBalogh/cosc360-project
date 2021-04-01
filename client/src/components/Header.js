import React from 'react';
import {Link} from "react-router-dom";
import ProfileHeaderDrop from "./ProfileHeaderDrop";

function Header() {
  return (
    <nav
      className='w-full flex flex-wrap items-center justify-between py-4 px-6 sticky top-0 left-0 z-50'>
      <Link
        to='/'
      >
        <img className='h-6' src={'logo.svg'} alt='Logo'/>
      </Link>
      <div>
        <ProfileHeaderDrop/>
        <Link
          to='/login'
          className='text-base leading-relaxed inline-block mr-4 whitespace-no-wrap text-black'
        >
          Login
        </Link>
        <Link
          to='/register'
          className='text-base font-normal leading-relaxed inline-block mr-4 whitespace-no-wrap text-black'
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Header;