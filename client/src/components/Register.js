import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { usePasswordValidation } from "../hooks/passwordValidation";
import { history } from "../_helpers";
import { authenticationService } from "../_services";

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
        .post(registerURL, { email, password, name, image })
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

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center relative -mt-20">
        <img className="h-10 sm:mb-20" src={logoImage} alt="Logo" />
        <div className="container max-w-md sm:bg-white sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6">
          <h2 className="text-2xl font-medium text-black text-center py-5">
            Register
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center">
              <img
                className="inline object-cover w-24 h-24 mr-2 rounded-full border-2"
                src={noProfileImage}
                alt="Logo"
              />
              <div className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      let reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = function () {
                        setImage(reader.result);
                      };
                    }}
                />
              </div>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              required
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
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
