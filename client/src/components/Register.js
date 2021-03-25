import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const registerURL = `${process.env.REACT_APP_HOST || ''}/accounts/signup`;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(registerURL, { email, password, username })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='flex flex-wrap justify-center mt-12 -mx-3 overflow-hidden'>
      <div className='my-3 px-3 w-1/3 overflow-hidden' />
      <div className='my-3 px-3 w-1/3 overflow-hidden'>
        <img className='h-16 object-contain' src={'logo.svg'} alt='Logo' />
        <div className='bg-white p-6 rounded-lg shadow-lg my-auto mt-6'>
          <h2 className='text-2xl font-medium text-black text-center'>Register</h2>
          <form className='flex flex-col pt-3 md:pt-8' onSubmit={handleSubmit}>
            <div className='flex flex-col pt-4'>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                onChange={(event) => setEmail(event.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='flex flex-col pt-4'>
              <input
                type='username'
                id='username'
                name='username'
                placeholder='Username'
                onChange={(event) => setUsername(event.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='flex flex-col pt-4'>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                onChange={(event) => setPassword(event.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='flex flex-col pt-4'>
              <input
                type='password'
                id='password2'
                name='password2'
                placeholder='Repeat Password'
                onChange={(event) => setPassword2(event.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='flex flex-wrap overflow-hidden sm:-mx-16'>
              <div className='w-1/2 overflow-hidden mt-8 sm:px-16 text-sm' />
              <div className='w-1/2 overflow-hidden mt-8 sm:px-16 text-sm'>
                <Link to='/login' className='underline font-semibold float-right'>
                  Already have an account?
                </Link>
              </div>
            </div>
            <input
              type='submit'
              value='Register'
              className='bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-6'
            />
          </form>
        </div>
      </div>
      <div className='my-3 px-3 w-1/3 overflow-hidden' />
    </div>
  );
}

export default Register;
