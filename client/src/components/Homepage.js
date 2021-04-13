import { useState, useEffect } from 'react';
import axios from 'axios';
import PostMenu from './PostMenu';
import Alert from './Alert';

function Homepage({ searchText }) {
  const [feed, setFeed] = useState([]);
  const [sortOrder, setSortOrder] = useState('ASC');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const feedURL = `${process.env.REACT_APP_HOST || ''}/feed/get-feed`;

  function loadFeed() {
    let searchParams = '?' + new URLSearchParams({ searchText, sortOrder });
    axios
      .get(feedURL + searchParams)
      .then((response) => {
        setFeed(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleSortOrder() {
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
  }

  function closeAlert() {
    loadFeed();
    setIsAlertVisible(false);
  }

  useEffect(loadFeed, [feedURL, searchText, sortOrder]);

  useEffect(() => {
    let id = setInterval(() => {
      let searchParams = '?' + new URLSearchParams({ searchText, sortOrder });
      axios
        .get(feedURL + searchParams)
        .then((response) => {
          let result = response.data;
          if (JSON.stringify(result) !== JSON.stringify(feed)) {
            setIsAlertVisible(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 10000);
    return () => clearInterval(id);
  }, [feed, feedURL, searchText, sortOrder, setIsAlertVisible]);

  return (
    <div className='flex flex-col max-w-screen-md mx-auto mb-4 space-y-4'>
      <Alert visible={isAlertVisible} callback={closeAlert}>
        New posts have arrived! Click here to refresh.
      </Alert>
      <div className='flex justify-end mt-2'>
        <button className='flex items-center text-md font-medium text-black outline-none' onClick={toggleSortOrder}>
          Sort by Date
          {sortOrder === 'ASC' ? (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </button>
      </div>
      <div className='space-y-8'>
        {feed.map((post) => (
          <div
            key={post.id}
            className='flex rounded-xl border border-gray-300 max-h-60 overflow-hidden cursor-pointer'
            onClick={() => console.log('TODO: Load this Post!')}
          >
            {post.image && <img className='h-full w-60' src={post.image} alt='Logo' />}
            <div className='flex flex-col space-y-2 p-5 py-3.5'>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-medium text-black'>{post.title}</h2>
                <div>
                  <PostMenu id={post.id} />
                </div>
              </div>
              <p className='text-sm font-medium text-black'>
                By
                <span className='ml-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400'>
                  @{post.User && post.User.name}
                </span>
              </p>
              <p className='text-base text-black overflow-hidden'>{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
