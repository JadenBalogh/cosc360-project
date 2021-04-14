import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { authHeader, history } from "../_helpers";
import React from "react";

function AdminMenu({ user }) {
  const deactivateURL = `${
    process.env.REACT_APP_HOST || ""
  }/accounts/deactivate`;
  const activateURL = `${process.env.REACT_APP_HOST || ""}/accounts/activate`;

  const deactivateUser = () => {
    axios
      .post(
        deactivateURL,
        {
          data: {
            id: user.id,
          },
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        history.push("/admin");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const activateUser = () => {
        axios
            .post(
                activateURL,
                {
                    data: {
                        id: user.id,
                    },
                },
                {
                    headers: authHeader(),
                }
            )
            .then((res) => {
                history.push("/admin");
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

  return (
    <div className="relative inline-block text-left py-0.5">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className="inline-flex justify-center items-center space-x-2 text-base text-black transition duration-50 ease-in-out focus:outline-none hover:text-gray-500 active:text-gray-800">
              <div className="w-5 h-5 mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
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
                className="absolute z-20 right-0 w-32 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl outline-none"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={user.isActive? deactivateUser : activateUser}
                        className={`${
                          active ? "bg-gray-100" : "bg-white"
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                          {user.isActive? "Deactivate" : "Activate"}
                      </div>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={`${
                          active ? "bg-gray-100" : "bg-white"
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

export default AdminMenu;
