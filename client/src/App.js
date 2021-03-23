import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  function apiTest() {
    const host = process.env.REACT_APP_HOST || '';
    console.log(host);
    axios.get(host + '/').then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={apiTest}>API Test</button>
      </header>
    </div>
  );
}

export default App;
