import React, {useState} from 'react';
import CommentDrop from "./CommentDrop";

import noProfileImage from "../assets/images/no-profile-image.jpg";

function Comment(props) {
  const [hideChildren, setHideChildren] = useState(false);

  const setReferenceComment = () => {
    props.setComment(props.comment);
  }

  return (
    <div className='container max-w-3xl'>
      <div className='md:bg-white border-t border-b md:border border-gray-300 md:rounded-2xl p-6 mt-4'>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-row space-x-3 items-center'>
              <div className='hover:text-gray-500 cursor-pointer'
                   onClick={() => setHideChildren(!hideChildren)}>
                {hideChildren ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"/>
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                          clipRule="evenodd"/>
                  </svg>
                }
              </div>
              {!hideChildren ?
                <span className='flex items-center cursor-pointer hover:text-gray-500 text-base'
                      onClick={setReferenceComment}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20"
                       fill="currentColor">
                    <path fillRule="evenodd"
                          d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"/>
                  </svg>
                  Reply
                </span>
                :
                <span
                  className='font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400'>
                  @{props.comment.User && props.comment.User.name}
                </span>
              }
            </div>
            {props.user && props.comment.userId === props.user.id &&
            <CommentDrop id={props.comment.id} refresh={props.refreshComments} setProfileError={props.setProfileError}
                         setAlertVariant={props.setAlertVariant} setIsAlertVisible={props.setIsAlertVisible}/>
            }
          </div>
          <div>
            {hideChildren ||
            <>
              <h2 className='flex flex-row items-center text-sm font-medium text-black mt-4'>
              <span
                className='font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400'>
                @{props.comment.User && props.comment.User.name}
              </span>
                <img className='h-7 w-7 bg-gray-300 object-contain rounded-full ml-2' src={props.comment.User && props.comment.User.image ? props.comment.User.image : noProfileImage}
                     alt='User profile'/>
              </h2>
              <p className='text-base text-black overflow-hidden mt-2'>{props.comment.text}</p>
            </>
            }
          </div>
        </div>
      </div>
      {props.comments.length > 0 &&
      <div className={`pl-12 md:pl-24 mt-4 ${!hideChildren ? 'block' : 'hidden'}`}>
        {props.comments.map(data => (
          <Comment key={data.comment.id} comment={data.comment} comments={data.comments} setComment={props.setComment}
                   refreshComments={props.refreshComments} user={props.user}/>
        ))}
      </div>
      }
    </div>
  );
}

export default Comment;