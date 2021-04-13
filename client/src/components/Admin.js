import {useEffect, useState} from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import { authHeader } from "../_helpers";

function Admin() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPost, setSearchPost] = useState("");
  const feedURL = `${process.env.REACT_APP_HOST || ""}/accounts/users`;

  function loadUsers() {
    let searchParams =
      "?" + new URLSearchParams({ searchName, searchEmail, searchPost });
    axios
      .get(feedURL + searchParams, {
        headers: authHeader(),
      })
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }

  useEffect(loadUsers, [searchName, searchEmail, searchPost]);

  return (
    <>
      <div className="grid grid-cols-3 max-w-screen-md mx-auto my-4 space-y-4">
        <div className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
          <label htmlFor="searchName">Search&nbsp;Name:</label>
          <input
            type="text"
            name="searchName"
            id="searchName"
            value={searchName}
            className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            onChange={event => {setSearchName(event.target.value)}}
          />
        </div>
        <div className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
          <label htmlFor="searchEmail">Search&nbsp;Email:</label>
          <input
            type="text"
            name="searchEmail"
            id="searchEmail"
            value={searchEmail}
            className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            onChange={event => {setSearchEmail(event.target.value)}}
          />
        </div>
        <div className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
          <label htmlFor="searchPost">Search&nbsp;Post:</label>
          <input
            type="text"
            name="searchPost"
            id="searchPost"
            value={searchPost}
            className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            onChange={event => {setSearchPost(event.target.value)}}
          />
        </div>
      </div>
      <div className="flex flex-col max-w-screen-md mx-auto my-4 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-row rounded-xl border border-gray-300 max-h-60 overflow-hidden cursor-pointer"
          >
            <p className="text-sm font-medium text-black m-3">
              <span className="ml-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-purple-400">
                @{user.name}
              </span>
            </p>
            {user.image ? (
              <img
                className="h-full w-12 m-3"
                src={user.image}
                alt="Profile Picture"
              />
            ) : (
              <img
                className="inline object-cover w-12 h-12 mr-2 rounded-full border-2 m-3"
                src={"no-profile-image.jpg"}
                alt="Logo"
              />
            )}
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
            <AdminMenu user={user} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Admin;
