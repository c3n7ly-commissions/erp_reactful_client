import axios from 'axios';

class Auth {
  constructor() {
    window.sessionStorage.setItem('token', '');
  }

  checkIfAuthenticated(successCallback, errorCallback) {
    axios.defaults.withCredentials = true;
    const response = axios.get('/sanctum/csrf-cookie').then((_response) => {
      axios
        .get('/api/auth/show', {
          xsrfHeaderName: 'X-XSRF-TOKEN', // change the name of the header to "X-XSRF-TOKEN"
          withCredentials: true,
        })
        .then((response) => {
          successCallback(response);
        })
        .catch((error) => {
          // do sth
          errorCallback(error);
        });
    });
    return response;
  }

  // Make a request for a user with a given ID
  login(data, successCallback, errorCallback) {
    axios.defaults.withCredentials = true;
    const response = axios.get('/sanctum/csrf-cookie').then((_response) => {
      axios
        .post('/api/auth/login', data, {
          xsrfHeaderName: 'X-XSRF-TOKEN', // change the name of the header to "X-XSRF-TOKEN"
          withCredentials: true,
        })
        .then(function (response) {
          // console.log(response.data.token);
          window.sessionStorage.setItem('token', response.data.token);
          successCallback(response);
        })
        .catch(function (error) {
          window.sessionStorage.setItem('token', '');
          errorCallback(error);
        });
    });
    return response;
  }
}

export default new Auth();
