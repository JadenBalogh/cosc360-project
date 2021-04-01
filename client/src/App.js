import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Header from './components/Header';

function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Header setSearchText={setSearchText} />
      <div>
        <Switch>
          <Route exact path='/'>
            <Homepage searchText={searchText} />
          </Route>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route component={Error} />
        </Switch>
      </div>
    </>
  );
}

export default App;
