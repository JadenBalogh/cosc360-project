import {useState} from "react";
import axios from "axios";
import {authenticationService} from "../_services";
import {history} from "../_helpers";

function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const profileURL = `${process.env.REACT_APP_HOST || ''}/accounts/profile`;
    const user = authenticationService.currentUserValue;
    let profile = "";
    let profileInformation = "";
    axios.get(profileURL,{
        headers: {
            Authorization: user.accessToken
        }
    })
        .then((user) => {
           console.log(user);
        })
        .catch((error) => {
            // history.push("/");
            // window.location.reload(false);
            console.log(error);
        });

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO this will be a put instead of a post.
        axios
            .post(profileURL, {email, password, password2, username})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div className='h-screen w-screen}}'>
                <div className='min-h-screen flex flex-col justify-center items-center relative -mt-20'>
                    <div
                        className='container max-w-4xl sm:bg-white sm:border border-gray-300 sm:rounded-2xl sm:shadow-xl p-6'>
                        <div className='flex flex-wrap justify-start'>
                            <img className='inline object-cover w-32 h-32 mr-2 rounded-full' src={'sample_profile.png'} alt='Logo'/>
                        </div>
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
                                type='username'
                                id='username'
                                name='username'
                                placeholder='Username'
                                onChange={(event) => setUsername(event.target.value)}
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
                            <input
                                type='password'
                                id='password2'
                                name='password2'
                                placeholder='Repeat Password'
                                onChange={(event) => setPassword2(event.target.value)}
                                className='shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-5'
                            />
                            <input
                                type='submit'
                                value='Save Changes'
                                className='bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 p-2 mt-4 rounded'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
