import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = 'https://laravel-erp-server.herokuapp.com';
// axios.defaults.baseURL = 'http://localhost:8100';

ReactDOM.render(
  // For snackbars to work
  // https://stackoverflow.com/a/67981050/7450617
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
