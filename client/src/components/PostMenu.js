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
          id: props.id,
        },
        headers: authHeader(),
      })
      .then((res) => {
        // TODO: display success through alert
        history.push('/')
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
              className='flex justify-end w-32 transition duration-50 ease-in-out focus:outline-none hover:text-gray-500 active:text-gray-800'>
              <div className='w-5 h-5 mx-1'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'/>
                </svg>
              </div>
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
                className='absolute w-32 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({active}) => (
                      <Link
                        to={`/view/${props.id}/edit`}
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
                      <Link
                        onClick={removePost}
                        to='/'
                        className={`${
                          active ? 'bg-gray-100' : 'bg-white'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Delete
                      </Link>
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
