import axios from 'axios';

class Auth {
  constructor() {
    this.token = '';
  }

  // Make a request for a user with a given ID
  login = (data, successCallback, errorCallback) => {
    axios.defaults.withCredentials = true;
    const response = axios
      .get('https://laravel-erp-server.herokuapp.com/sanctum/csrf-cookie')
      .then((_response) => {
        axios
          .post(
            'https://laravel-erp-server.herokuapp.com/api/auth/login',
            data,
            {
              xsrfHeaderName: 'X-XSRF-TOKEN', // change the name of the header to "X-XSRF-TOKEN"
              withCredentials: true,
            }
          )
          .then(function (response) {
            successCallback(response);
          })
          .catch(function (error) {
            errorCallback(error);
          });
      });
    return response;
  };
}

export default new Auth();
