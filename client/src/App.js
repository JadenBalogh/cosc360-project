import {Switch, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <nav
        className='w-full flex flex-wrap items-center justify-between sm:justify-start py-4 px-6 sticky top-0 left-0 z-50'>
        <Link
          to='/'
          className='text-sm font-bold leading-relaxed inline-block mr-4 whitespace-no-wrap uppercase text-black'
        >
          Home
        </Link>
        <Link
          to='/login'
          className='text-sm font-bold leading-relaxed inline-block mr-4 whitespace-no-wrap uppercase text-black'
        >
          Login
        </Link>
        <Link
          to='/register'
          className='text-sm font-bold leading-relaxed inline-block mr-4 whitespace-no-wrap uppercase text-black'
        >
          Register
        </Link>
      </nav>
      <div>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/profile' component={Profile}/>
          <Route component={Error}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
