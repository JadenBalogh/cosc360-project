import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  function apiTest() {
    axios.get('http://localhost:3001/api-test').then((response) => {
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
