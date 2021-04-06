import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Profile from "./components/Profile";
import PasswordRecovery from "./components/PasswordRecovery";

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
          <Route component={Error} />
        </Switch>
      </div>
    </>
  );
}

export default App;
