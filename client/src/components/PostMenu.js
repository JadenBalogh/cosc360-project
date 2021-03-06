import {Menu, Transition} from '@headlessui/react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {authHeader, history} from "../_helpers";

function PostMenu(props) {
  const deleteURL = `${process.env.REACT_APP_HOST || ''}/feed/delete-post`;

  const removePost = () => {
    axios
      .delete(deleteURL, {
        data: {
          id: props.postId
        },
        headers: authHeader()
      })
      .then((res) => {
        history.push('/');
        window.location.reload(false);
      })
      .catch((err) => {
        // TODO: display error through alert
        console.log(err);
      });
  }
  return (
    <div className="relative inline-block text-left py-0.5">
      <Menu>
        {({open}) => (
          <>
            <Menu.Button
              className="inline-flex justify-center items-center space-x-2 text-base text-black transition duration-50 ease-in-out focus:outline-none hover:text-gray-500 active:text-gray-800">
              {open
                ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='h-5'>
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='h-5'>
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              }
            </Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className='absolute right-0 w-32 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({active}) => (
                      <Link
                        to={`/view/${props.postId}/edit`}
                        className={`${
                          active ? 'bg-gray-100' : 'bg-white'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Edit
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className='py-1'>
                  <Menu.Item>
                    {({active}) => (
                      <button
                        onClick={removePost}
                        className={`${
                          active ? 'bg-gray-100' : 'bg-white'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}

export default PostMenu;
