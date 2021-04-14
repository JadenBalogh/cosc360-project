import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import ProfileHeaderDrop from "./ProfileHeaderDrop";
import {authenticationService} from "../_services";

import logoImage from "../assets/images/logo.svg";

function Header({setSearchText}) {
  const url = useLocation();
  const history = useHistory();
  const user = authenticationService.currentUserValue;
  let login = "";
  let register = "";
  if (!user) {
    login = (
      <Link
        to="/login"
        className="text-base leading-relaxed inline-block mr-4 whitespace-no-wrap text-black hover:text-gray-700"
      >
        Login
      </Link>
    );
    register = (
      <Link
        to="/register"
        className="text-base font-normal leading-relaxed inline-block mr-4 whitespace-no-wrap text-black hover:text-gray-700"
      >
        Register
      </Link>
    );
  }

  function handleSearch(event) {
    event.preventDefault();
    if (url.pathname === "/admin")
      history.push("/admin");
    else
      history.push("/");
  }

  return (
    <nav
      className={`${url.pathname === "/login" || url.pathname === "/register" || url.pathname === "/password-recovery" ? "hidden" : "block"} 
                  grid grid-rows-1 grid-cols-header gap-x-4 items-center w-full py-4 px-6 bg-white sticky top-0 left-0 z-50`}>
      <div className="justify-self-start flex space-x-4 items-center">
        <Link to="/">
          <img className="w-20" src={logoImage} alt="Logo"/>
        </Link>
        {user?.isAdmin && <Link to="/admin" className="text-lg">Admin</Link>}
      </div>
      <form
        className="justify-self-center flex flex-shrink-0 items-center justify-between w-full h-10 px-5 rounded-full border border-gray-300 bg-white shadow-lg"
        onSubmit={handleSearch}
      >
        <input
          className="w-full outline-none"
          placeholder={url.pathname === "/admin" ? "Search using 'user:user' or 'post:post'" : "Search"}
          type="text"
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type="submit">
          <svg
            className="w-5 h-5 text-gray-500 hover:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
      <div className="justify-self-end">
        {user && <ProfileHeaderDrop/>}
        {login}
        {register}
      </div>
    </nav>
  );
}

export default Header;
