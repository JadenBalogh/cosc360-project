import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';

function PostMenu() {
  return (
    <Menu>
      <Menu.Button className='flex justify-end w-32 transition duration-50 ease-in-out focus:outline-none hover:text-gray-500 active:text-gray-800'>
        <div className='w-5 h-5 mx-1'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
            <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
          </svg>
        </div>
      </Menu.Button>
      <Menu.Items className='absolute w-32 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl outline-none'>
        <div className='py-1'>
          <Menu.Item>
            {({ active }) => (
              <Link
                to='/'
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
            {({ active }) => (
              <Link
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
    </Menu>
  );
}

export default PostMenu;
