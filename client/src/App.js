// import axios from 'axios';
import './App.css';
import {Switch, Route, Link} from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Homepage from "./components/homepage";

function App() {
    // Example API GET Method
    // function apiTest() {
    //     axios.get('http://localhost:3001/api-test').then((response) => {
    //         console.log(response.data);
    //     });
    // }

    return (
        <body className="bg-gray-50">
        <div>
        <nav className="w-full relative flex flex-wrap items-center justify-between navbar-expand-lg">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between bg-white">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link to="/" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black">Home</Link>
                    <Link to="/login" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black">Login</Link>
                    <Link to="/register" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black">Register</Link>
                </div>
            </div>
        </nav>
            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route component={Error} />
            </Switch>
        </div>
        </body>
    );

}

export default App;
