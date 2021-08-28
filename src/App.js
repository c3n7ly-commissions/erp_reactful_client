import logo from './logo.svg';
import './App.css';

const axios = require('axios');

// Make a request for a user with a given ID

export const sendLogin = (data) => {
  axios.defaults.withCredentials = true;
  const response = axios.get('http://localhost:8100/sanctum/csrf-cookie',
    // {
    //   withCredentials: false
    // }
  ).then(response => {
    return axios.post('http://localhost:8100/api/auth/login', data, {
      xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
      withCredentials: true
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  return response;
}

function App() {
  console.log("Jean");

  const params = new URLSearchParams();
  params.append('email', 'johndoe@gmail.com');
  params.append('password', 'rastaman');

  sendLogin(params);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
