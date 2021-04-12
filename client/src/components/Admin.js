import {useEffect, useState} from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import { authHeader } from "../_helpers";

function Admin({ searchText }) {
  const [users, setUsers] = useState([]);
  const feedURL = `${process.env.REACT_APP_HOST || ""}/accounts/users`;

  function loadUsers() {
    let searchParams =
      "?" + new URLSearchParams({
        searchText
      });
    axios
      .get(feedURL + searchParams, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data)
      })
      .catch((err) => console.log(err));
  }

  useEffect(loadUsers, [feedURL, searchText]);

  return (
    <>
      <div className="flex flex-col max-w-screen-md mx-auto my-4 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-row items-center justify-between rounded-xl border border-gray-300 h-16"
          >
            <div className="flex items-center">
              <p className="text-sm font-medium text-black m-3">
                <span className="ml-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400">
                  @{user.name}
                </span>
              </p>
              <img
                className="inline object-cover h-8 w-8 my-4 rounded-full border-2"
                src={user.image ? user.image : "no-profile-image.jpg"}
                alt="Profile"
              />
              <p className="text-base text-black overflow-hidden m-3">
                {user.email}
              </p>
              {user.isAdmin ? (
                <p className="text-base text-red-500 overflow-hidden m-3">
                  Admin
                </p>
              ) : (
                <p className="text-base text-green-500 overflow-hidden m-3">
                  User
                </p>
              )}
              {user.isActive ? (
                <p className="text-base text-green-500 overflow-hidden m-3">
                  Active
                </p>
              ) : (
                <p className="text-base text-red-500 overflow-hidden m-3">
                  Disabled
                </p>
              )}
            </div>
            <div className="m-3">
              <AdminMenu user={user} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Admin;
