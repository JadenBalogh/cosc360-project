import { Link } from "react-router-dom";
import axios from "axios";

function PasswordRecovery() {
    const passwordURL = `${process.env.REACT_APP_HOST || ""}/accounts/password-recovery`;
    axios.post(passwordURL, {user: 'carsonricca28@gmail.com', password: 'password'}).then((response) => {
       console.log(response);
    });
  return (
    <>
      <div
        className="h-screen w-screen sm:bg-gradient-to-t from-purple-400 via-red-500 to-red-500 absolute bottom-0"
        style={{ clipPath: "polygon(0 75%, 100% 50%, 100% 100%, 0 100%" }}
      />
      <div
        className="h-screen w-screen bg-gradient-to-t from-purple-400 via-red-500 to-red-500 absolute bottom-0"
        style={{ clipPath: "polygon(0 90%, 100% 80%, 100% 100%, 0 100%)" }}
      />
      <div className="min-h-screen flex flex-col justify-center items-center relative -mt-20">
        <div className="container max-w-md sm:bg-white sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6">
          <h2 className="text-2xl font-medium text-black text-center py-5">
            Password Recovery Email Sent
          </h2>
          <div className="text-black text-center py-5">
            An email with your login details has been sent to the email that was
            provided.
          </div>
          <div className="text-center font-normal text-blue-500 hover:text-blue-700 hover:underline">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordRecovery;
