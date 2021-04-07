import {Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Header from './components/Header';
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import ViewPost from "./components/ViewPost";

function App() {
  return (
    <>
      <Header/>
      <div>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/create' component={CreatePost}/>
          <Route path='/view/:id/edit/' component={EditPost}/>
          <Route path='/view/:id' component={ViewPost}/>
          <Route exact path='/' component={Homepage}/>
          <Route component={Error}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
