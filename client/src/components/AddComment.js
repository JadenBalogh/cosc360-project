import React, {useState} from 'react';

function AddComment(props) {
  const [comment, setComment] = useState('');
  const addCommentURL = `${process.env.REACT_APP_HOST || ''}/REPLACEMENT`;

  const handleSubmit = (event) => {
    // TODO: Add comment to post in database
    event.preventDefault();
    props.refreshComments();
  }

  return (
    <form className='container max-w-3xl h-24 md:h-12 fixed p-6 md:p-0 bottom-0 md:bottom-9 flex flex-row items-center shadow-lg' autoComplete='off'
    onSubmit={handleSubmit}>
      <input
        type='comment'
        id='comment'
        name='comment'
        placeholder='Say something...'
        value={comment}
        onChange={event => setComment(event.target.value)}
        className='shadow-inner appearance-none border border-r-0 rounded-r-none border-gray-300 rounded w-full h-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring'
        required={true}
        aria-label='Comment'
      />
      <label
        className='flex flex-row flex-nowrap justify-center items-center space-x-2 rounded rounded-l-none bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 h-full px-4'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='h-5'>
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
          <path fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"/>
        </svg>
        <button type='submit' className='text-base font-medium focus:outline-none'>Comment</button>
      </label>
    </form>
  );
}

export default AddComment;