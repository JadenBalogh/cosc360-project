import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {usePasswordValidation} from "../hooks/passwordValidation";
import {history, toBase64} from "../_helpers";
import {authenticationService} from "../_services";

import logoImage from "../assets/images/logo.svg";
import noProfileImage from "../assets/images/no-profile-image.jpg";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState("");
  const registerURL = `${process.env.REACT_APP_HOST || ""}/accounts/signup`;
  const [match] = usePasswordValidation({
    password: password,
    password2: password2,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (match) {
      axios
        .post(registerURL, {email, password, name, image})
        .then((response) => {
          console.log(response);
          authenticationService.login(email, password).then(() => {
            history.push("/");
            window.location.reload(false);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("The passwords must match!");
    }
  };

  const updatePreview = (input) => {
    const files = input.target.files;
    if (files.length === 0)
      return false;
    else {
      for (const image of files) {
        toBase64(image, setImage);
      }
      return true;
    }
  }

  return (
    <>
      <div
        className="h-screen w-screen sm:bg-gradient-to-t from-purple-400 via-red-500 to-red-500 absolute bottom-0"
        style={{clipPath: "polygon(0 75%, 100% 50%, 100% 100%, 0 100%"}}
      />
      <div
        className="h-screen w-screen bg-gradient-to-t from-purple-400 via-red-500 to-red-500 absolute bottom-0"
        style={{clipPath: "polygon(0 90%, 100% 80%, 100% 100%, 0 100%)"}}
      />
      <div className="min-h-screen flex flex-col justify-center items-center relative -mt-20">
        <img className="h-10 sm:mb-20" src={logoImage} alt="Logo"/>
        <div className="container max-w-md sm:bg-white sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6">
          <h2 className="text-2xl font-medium text-black text-center py-5">
            Register
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label
              className={`mx-auto focus:outline-none cursor-pointer mt-5`}>
              <div className='w-24 h-24 relative flex items-center justify-center text-gray-700'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 absolute" viewBox="0 0 20 20"
                     fill="currentColor">
                  <path fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"/>
                </svg>
                <img
                  className="inline object-cover w-24 h-24 rounded-full border-2 hover:opacity-50 absolute"
                  src={image || noProfileImage}
                  alt="Logo"
                />
              </div>
              <input
                type='file'
                id='img'
                name='img'
                accept='image/*'
                onChange={updatePreview}
                className='opacity-0 w-0'
              />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              required
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring"
            />
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Username"
              onChange={(event) => setName(event.target.value)}
              required
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            />
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Repeat Password"
              onChange={(event) => setPassword2(event.target.value)}
              required
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
            />
            <div className="flex flex-wrap justify-end mt-8">
              <Link
                to="/login"
                className="text-sm font-normal text-blue-500 hover:text-blue-700 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
            <input
              type="submit"
              value="Create Account"
              className="bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 p-2 mt-4 rounded"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
