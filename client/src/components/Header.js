import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileHeaderDrop from './ProfileHeaderDrop';

function Header({ setSearchText }) {
  const history = useHistory();

  function handleSearch(event) {
    event.preventDefault();
    history.push('/');
  }

  return (
    <nav className='grid grid-rows-1 grid-cols-header gap-x-4 items-center w-full py-4 px-6 sticky top-0 left-0 z-50'>
      <Link to='/' className='justify-self-start'>
        <img className='w-20' src={'logo.svg'} alt='Logo'/>
      </Link>
      <form
        className='justify-self-center flex flex-shrink-0 items-center justify-between w-full h-10 px-5 rounded-full border border-gray-300 bg-white shadow-lg'
        onSubmit={handleSearch}
      >
        <input
          className='w-full outline-none'
          placeholder='Search'
          type='text'
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type='submit'>
          <svg
            className='w-5 h-5 text-gray-500 hover:text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </form>
      <div className='justify-self-end'>
        <ProfileHeaderDrop />
        <Link to='/login' className='text-base leading-relaxed inline-block mr-4 whitespace-no-wrap text-black'>
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
