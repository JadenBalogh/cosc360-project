import React from "react";
import { Link } from "react-router-dom";
import ProfileHeaderDrop from "./ProfileHeaderDrop";
import { authenticationService } from "../_services";

function Header() {
  const user = authenticationService.currentUserValue;
  let login = "";
  let register = "";
  if (!user) {
    login = (
      <Link
        to="/login"
        className="text-base leading-relaxed inline-block mr-4 whitespace-no-wrap text-black"
      >
        Login
      </Link>
    );
    register = (
      <Link
        to="/register"
        className="text-base font-normal leading-relaxed inline-block mr-4 whitespace-no-wrap text-black"
      >
        Register
      </Link>
    );
  }
  return (
    <nav className="w-full flex flex-wrap items-center justify-between py-4 px-6 sticky top-0 left-0 z-50">
      <Link to="/">
        <img className="h-6" src={"logo.svg"} alt="Logo" />
      </Link>
      <div>
        <ProfileHeaderDrop />
        {login}
        {register}
      </div>
    </nav>
  );
}

export default Header;
