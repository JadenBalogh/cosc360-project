import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { authenticationService } from "../_services";

function ProfileHeaderDrop() {
  const user = authenticationService.currentUserValue;
  let dropdown = "";
  if (user) {
    dropdown = (
      <div className="realtive inline-block text-left py-0.5">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="inline-flex justify-center items-center space-x-2 text-base text-black transition duration-50 ease-in-out focus:outline-none hover:text-gray-500 active:text-gray-800">
                <span>{user.name}</span>
                <img
                  src={user.image}
                  className="w-10 h-10 mr-2 rounded-full border-2"
                />
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
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl outline-none">
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">Signed in as</p>
                    <p className="text-sm font-medium leading-5 text-black truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${
                            active ? "bg-gray-100" : "bg-white"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          View profile
                        </Link>
                      )}
                    </Menu.Item>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to=""
                          className={`${
                            active ? "bg-gray-100" : "bg-white"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                          onClick={logout}
                        >
                          Log out
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
  return (
    <>
      <div className="relative inline-block text-left py-0.5">{dropdown}</div>
    </>
  );
}

function logout() {
  authenticationService.logout();
  window.location.reload(false);
}

export default ProfileHeaderDrop;
