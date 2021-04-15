import axios from "axios";
import { useState } from "react";
import {history} from "../_helpers";

import logoImage from "../assets/images/logo.svg";
import {Link} from "react-router-dom";

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const passwordURL = `${process.env.REACT_APP_HOST || ""}/accounts/password-recovery`;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(passwordURL, {
        userEmail: email,
      })
      .then((response) => {
        history.push("/login");
        window.location.reload(false);
      });
  };
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center relative">
        <Link to="/">
          <img className="h-10 w-full sm:mb-20" src={logoImage} alt="Logo" />
        </Link>
        <div className="container max-w-md sm:bg-white sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6">
          <h2 className="text-2xl font-medium text-black text-center py-5">
            Enter Email
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              required
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            />
            <div className="flex flex-wrap justify-end mt-8">
              <Link
                to="/login"
                className="text-sm font-normal text-blue-500 hover:text-blue-700 hover:underline"
              >
                Log In
              </Link>
            </div>
              <input
                  type="submit"
                  value="Send Recovery Email"
                  className="bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 p-2 mt-4 rounded"
              />
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordRecovery;
