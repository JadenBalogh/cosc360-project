import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginURL = `${process.env.REACT_APP_HOST || ''}/accounts/login`;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(loginURL, {email, password})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className='h-screen w-screen sm:bg-gradient-to-t from-purple-400 via-red-500 to-red-500 absolute bottom-0'
           style={{clipPath: 'polygon(0 75%, 100% 50%, 100% 100%, 0 100%'}}/>
      <div className='h-screen w-screen bg-gradient-to-t from-purple-400 via-red-500 to-red-500 absolute bottom-0'
           style={{clipPath: 'polygon(0 90%, 100% 80%, 100% 100%, 0 100%)'}}/>
      <div className='min-h-screen flex flex-col justify-center items-center relative -mt-20'>
        <img className='h-10 sm:mb-20' src={'logo.svg'} alt='Logo'/>
        <div className='container max-w-md sm:bg-white sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6'>
          <h2 className='text-2xl font-medium text-black text-center py-5'>Login</h2>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              onChange={(event) => setEmail(event.target.value)}
              className='shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5'
            />
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={(event) => setPassword(event.target.value)}
              className='shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5'
            />
            <div className="flex flex-wrap justify-between mt-8">
              <Link to='/' className='text-sm font-normal text-blue-500 hover:text-blue-700 hover:underline'>
                Forget Password?
              </Link>
              <Link to='/register' className='text-sm font-normal text-blue-500 hover:text-blue-700 hover:underline'>
                Register
              </Link>
            </div>
            <input
              type='submit'
              value='Sign In'
              className='bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 p-2 mt-4 rounded'
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
