import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {authenticationService, updateAuthenticatedUserData} from "../_services";
import {authHeader, history} from "../_helpers";
import {usePasswordValidation} from "../_hooks/passwordValidation";
import Alert from "./Alert";

import noProfileImage from "../assets/images/no-profile-image.jpg";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertVariant, setAlertVariant] = useState("error");
  const [profileError, setProfileError] = useState("");
  const profileURL = `${process.env.REACT_APP_HOST || ""}/accounts/profile`;
  const user = authenticationService.currentUserValue;
  const [match] = usePasswordValidation({
    password: password,
    password2: password2,
  });

  const loadData = useCallback(() => {
    axios
      .get(profileURL, {
        headers: authHeader(),
      })
      .then((user) => {
        setName(user.data.name);
        setPassword(user.data.password);
        setPassword2(user.data.password);
        setEmail(user.data.email);
        setImage(user.data.image);
      })
      .catch(() => {
        setProfileError("Could not get profile.");
        setIsAlertVisible(true);
      });
  }, [profileURL]);
  useEffect(() => {
    if (user === null) {
      history.push("/");
      window.location.reload(false);
    } else {
      loadData();
    }
  }, [profileURL, user, loadData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (match) {
      axios
        .put(
          profileURL,
          {email, password, name, image},
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          updateAuthenticatedUserData(user.id);
          setProfileError("Profile Changed!");
          setIsAlertVisible(true);
          setAlertVariant("success");
        })
        .catch((error) => {
          console.log(error);
          setProfileError(error);
          setIsAlertVisible(true);
          setAlertVariant("error");
        });
    } else {
      setProfileError("The passwords must match!");
      setIsAlertVisible(true);
    }
  };

  function closeAlert() {
    setIsAlertVisible(false);
  }

  return (
    <>
      <div className="container max-w-3xl mx-auto flex flex-col items-center space-y-4">
        <Alert visible={isAlertVisible} callback={closeAlert} variant={alertVariant}>
          {profileError}
        </Alert>
        <div className="w-full sm:bg-white sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-row space-x-4 items-center items-center">
              <label
                className={`flex flex-row flex-nowrap justify-center items-center rounded focus:outline-none cursor-pointer`}>
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
                  onChange={(event) => {
                    const file = event.target.files[0];
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                      setImage(reader.result);
                    };
                  }}
                  className='opacity-0 w-0'
                />
              </label>
              <label htmlFor='username' className='text-xs font-medium'>
                Username
                <input
                  type="username"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black text-base leading-tight focus:outline-none focus:ring mt-3"
                />
              </label>
            </div>
            <label htmlFor='email' className='text-xs font-medium mt-5'>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-3"
            />
            <label htmlFor='password' className='text-xs font-medium mt-5'>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-3"
            />
            <label htmlFor='password2' className='text-xs font-medium mt-5'>Repeat Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Repeat Password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-3"
            />
            <input
              type="submit"
              value="Save Changes"
              className="bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 p-2 mt-10 rounded"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
