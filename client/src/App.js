import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Header from './components/Header';
import Profile from "./components/Profile";
import PasswordRecovery from "./components/PasswordRecovery";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import ViewPost from "./components/ViewPost";
import Admin from "./components/Admin";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Header setSearchText={setSearchText} />
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage searchText={searchText} />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/password-recovery" component={PasswordRecovery} />
          <Route path='/create' component={CreatePost}/>
          <Route path='/view/:id/edit/' component={EditPost}/>
          <Route path='/view/:id' component={ViewPost}/>
          <Route path='/admin'>
            <Admin searchText={searchText} />
          </Route>
          <Route exact path='/' component={Homepage}/>
          <Route component={Error}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
