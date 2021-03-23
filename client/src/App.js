import './App.css';
import {Switch, Route, Link} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Homepage from "./components/Homepage";

function App() {

    return (
        <div className="w-full h-full absolute bg-gradient-to-t from-purple-400 to-red-500" id="background">
        <nav className="w-full flex flex-wrap items-center justify-between navbar-expand-lg">
            <div className=" w-full px-4 flex flex-wrap items-center justify-between bg-white">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link to="/" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black">Home</Link>
                    <Link to="/login" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black">Login</Link>
                    <Link to="/register" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black">Register</Link>
                </div>
            </div>
        </nav>
            <div className="justify-center">
            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route component={Error} />
            </Switch>
            </div>
        </div>
    );

}

export default App;
