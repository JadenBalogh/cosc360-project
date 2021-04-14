import React, {useEffect, useState} from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import { authHeader } from "../_helpers";

import noProfileImage from "../assets/images/no-profile-image.jpg";
import Alert from "./Alert";

function Admin({ searchText }) {
  const [users, setUsers] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [profileError, setProfileError] = useState("Could not get users.");
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
        setUsers(response.data);
      })
      .catch(() => {
        setProfileError("Could not get users.");
        setIsAlertVisible(true);
      });
  }

  useEffect(loadUsers, [feedURL, searchText]);

  function closeAlert() {
    setIsAlertVisible(false);
  }

  return (
    <>
      <div className="flex flex-col max-w-screen-md mx-auto my-4 space-y-4">
        <Alert visible={isAlertVisible} callback={closeAlert} variant={"error"}>
          {profileError}
        </Alert>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-row items-center justify-between rounded-xl border border-gray-300 h-16 bg-white"
          >
            <div className="flex items-center">
              <p className="text-sm font-medium text-black m-3">
                <span className="ml-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400">
                  @{user.name}
                </span>
              </p>
              <img
                className="inline object-cover h-8 w-8 my-4 rounded-full border-2"
                src={user.image || noProfileImage}
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
