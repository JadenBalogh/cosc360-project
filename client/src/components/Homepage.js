import { useState, useEffect } from 'react';
import axios from 'axios';

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
    // <div className='w-full flex flex-wrap mt-7'>
    //   <div className='w-full flex flex-col'>
    //     <div className='flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32'>
    //       <div className='bg-white p-6 rounded-lg shadow-lg'>HomePage</div>
    //     </div>
    //   </div>
    // </div>
    <form className='flex flex-col max-w-screen-md mx-auto space-y-8'>
      {feed.map((post) => (
        <div className='rounded-xl border border-gray-300 space-y-2 max-h-60 p-5 py-3.5'>
          <h2 className='text-xl font-medium text-black'>{post.title}</h2>
          <p className='text-sm font-medium text-black'>
            By <span className='font-bold'>{post.username}</span>
          </p>
          <p className='text-base text-black truncate'>{post.body}</p>
        </div>
      ))}
    </form>
  );
}

export default Homepage;
