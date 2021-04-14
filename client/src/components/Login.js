import React, { useState } from "react";
import { Link } from "react-router-dom";
import { history } from "../_helpers";
import { authenticationService } from "../_services";
import Alert from "./Alert";

import logoImage from "../assets/images/logo.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticationService
      .login(email, password)
      .then(() => {
          if(authenticationService.currentUserValue) {
              history.push("/");
              window.location.reload(false);
          } else {
              setLoginError("Login was unsuccessful.");
              setIsAlertVisible(true);
          }
      })
  };

  function closeAlert() {
    setIsAlertVisible(false);
  }

  return (
    <>
      <div className="min-h-screen container max-w-md mx-auto flex flex-col justify-center items-center relative">
        <Link to="/">
          <img className="h-10 w-full sm:mb-20" src={logoImage} alt="Logo" />
        </Link>
        <Alert visible={isAlertVisible} callback={closeAlert} variant="error">
          {loginError}
        </Alert>
        <div className="sm:bg-white w-full sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6 mt-6">
          <h2 className="text-2xl font-medium text-black text-center py-5">
            Login
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            />
            <div className="flex flex-wrap justify-between mt-8">
              <Link
                to="/password-recovery"
                className="text-sm font-normal text-blue-500 hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>
              <Link
                to="/register"
                className="text-sm font-normal text-blue-500 hover:text-blue-700 hover:underline"
              >
                Register
              </Link>
            </div>
            <input
              type="submit"
              value="Sign In"
              className="bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 p-2 mt-4 rounded"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
