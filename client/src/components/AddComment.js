import React, {useState, useEffect} from 'react';
import axios from "axios";

function AddComment(props) {
  const [comment, setComment] = useState('');
  const [postComment, setPostComment] = useState(false);
  const addCommentURL = `${process.env.REACT_APP_HOST || ''}/feed/add-comment`;

  useEffect(() => {
    setPostComment(comment !== '');
  }, [comment]);

  const resetReferenceComment = () => {
    props.setReferenceComment(null);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postComment) {
      axios
        .post(addCommentURL, {
          text: comment,
          postId: props.postId,
          parentId: props.referenceComment ? props.referenceComment.id : null
        })
        .then((res) => {
          props.refreshComments();
          setComment('');
          // TODO: display success banner
        })
        .catch((err) => {
          // TODO: display error through banner
          console.log(err);
        });
    }
  }

  return (
    <div className='container max-w-3xl fixed bottom-0 md:bottom-9 space-y-0 md:space-y-5'>
      {props.referenceComment &&
      <div
        className='h-full flex flex-row justify-between items-center p-3 mx-6 md:m-0 bg-white border border-gray-300 md:rounded shadow-lg'>
        <div>
          <span
            className='font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400 float-left'>
            @{props.username}
          </span>
          <p className='text-base text-black overflow-hidden pl-2'>{props.referenceComment.text}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-gray-500"
             viewBox="0 0 20 20" fill="currentColor"
             onClick={resetReferenceComment}>
          <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"/>
        </svg>
      </div>
      }
      <form className='h-24 md:h-12 p-6 md:p-0 flex flex-row items-center shadow-lg' autoComplete='off'
            onSubmit={handleSubmit}>
        <input
          type='comment'
          id='comment'
          name='comment'
          placeholder='Say something...'
          value={comment}
          onChange={event => setComment(event.target.value)}
          className='shadow-inner appearance-none border border-r-0 rounded-r-none border-gray-300 rounded w-full h-full py-2 px-3 text-black leading-tight focus:outline-none'
          aria-label='Comment'
        />
        <label
          className={`flex flex-row flex-nowrap justify-center items-center space-x-2 rounded rounded-l-none focus:bg-gray-600 focus:outline-none text-white shadow-md text-lg ${postComment ? 'bg-gray-600 hover:bg-gray-700 cursor-pointer' : 'bg-gray-400'} h-full px-4`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='h-5'>
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
            <path fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"/>
          </svg>
          <button type='submit'
                  className={`text-base font-medium focus:outline-none ${postComment || 'cursor-default'}`}
                  disabled={!postComment}>Comment
          </button>
        </label>
      </form>
    </div>
  );
}

export default AddComment;