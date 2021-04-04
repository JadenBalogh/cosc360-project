import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import PasswordRecovery from "./components/PasswordRecovery";

function App() {
  return (
    <>
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password-recovery" component={PasswordRecovery} />
          <Route component={Error} />
        </Switch>
      </div>
    </>
  );
}

export default App;
