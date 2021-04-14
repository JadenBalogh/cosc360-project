import { useEffect, useState } from "react";
import axios from "axios";
import { authenticationService } from "../_services";
import { authHeader, history } from "../_helpers";
import { usePasswordValidation } from "../_hooks/passwordValidation";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState("");
  const profileURL = `${process.env.REACT_APP_HOST || ""}/accounts/profile`;
  const [match] = usePasswordValidation({
    password: password,
    password2: password2,
  });

  function loadData() {
    axios
      .get(profileURL, {
        headers: authHeader(),
      })
      .then((user) => {
        console.log(user);
        setName(user.data.name);
        setPassword(user.data.password);
        setPassword2(user.data.password);
        setEmail(user.data.email);
        setImage(user.data.image);
      })
      .catch((error) => {
        history.push("/");
        window.location.reload(false);
        console.log(error);
      });
  }
  useEffect(loadData, []);

  let imageHTML = "";
  if (image) {
    imageHTML = (
      <img
        className="inline object-cover w-24 h-24 mr-2 rounded-full border-2"
        src={image}
        alt="Logo"
      />
    );
  } else {
    imageHTML = (
      <img
        className="inline object-cover w-24 h-24 mr-2 rounded-full border-2"
        src={"no-profile-image.jpg"}
        alt="Logo"
      />
    );
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    if (match) {
      axios
        .put(
          profileURL,
          { email, password, name, image },
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          console.log(response);
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
      <div className="h-screen w-screen}}">
        <div className="min-h-screen flex flex-col justify-center items-center relative -mt-20">
          <div className="container max-w-4xl sm:bg-white sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-center">
                {imageHTML}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
              />
              <input
                type="username"
                id="username"
                name="username"
                placeholder="Username"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
              />
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Repeat Password"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
                className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5"
              />
              <input
                type="submit"
                value="Save Changes"
                className="bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 p-2 mt-4 rounded"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
