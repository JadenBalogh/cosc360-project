import {Switch, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Header from './components/Header';
import CreatePost from "./components/CreatePost";
import ViewPost from "./components/ViewPost";

function App() {
  return (
    <>
      <Header/>
      <div>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/create' component={CreatePost}/>
          <Route path='/view' component={ViewPost}/>
          <Route component={Error}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
