import { useState, useEffect } from 'react';
import axios from 'axios';
import PostMenu from './PostMenu';

function Homepage() {
  const [feed, setFeed] = useState([]);
  const feedURL = `${process.env.REACT_APP_HOST || ''}/feed/get-feed`;

  function loadFeed() {
    axios
      .get(feedURL)
      .then((response) => {
        setFeed(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(loadFeed, [feedURL]);

  return (
    <form
      className='flex flex-col max-w-screen-md mx-auto my-4 space-y-8 cursor-pointer'
      onClick={() => console.log('TODO: Load this Post!')}
    >
      {feed.map((post) => (
        <div className='flex rounded-xl border border-gray-300 max-h-60 overflow-hidden'>
          {post.image ? <img className='h-full w-60' src={post.image} alt='Logo' /> : ''}
          <div className='flex flex-col space-y-2 p-5 py-3.5'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-medium text-black'>{post.title}</h2>
              <div>
                <PostMenu />
              </div>
            </div>
            <p className='text-sm font-medium text-black'>
              By{' '}
              <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400'>
                {post.username}
              </span>
            </p>
            <p className='text-base text-black overflow-hidden'>{post.body}</p>
          </div>
        </div>
      ))}
    </form>
  );
}

export default Homepage;
