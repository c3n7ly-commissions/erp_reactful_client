import axios from 'axios';

class HttpHelper {
  putData(url, data, successCallback, errorCallback) {
    axios.defaults.withCredentials = true;
    const config = {
      xsrfHeaderName: 'X-XSRF-TOKEN', // change the name of the header to "X-XSRF-TOKEN"
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
      },
    };

    axios.get('/sanctum/csrf-cookie').then((_response) => {
      axios
        .put(url, data, config)
        .then(function (response) {
          successCallback(response);
        })
        .catch(function (error) {
          errorCallback(error);
        });
    });
  }

  postData(url, data, successCallback, errorCallback) {
    axios.defaults.withCredentials = true;
    const config = {
      xsrfHeaderName: 'X-XSRF-TOKEN', // change the name of the header to "X-XSRF-TOKEN"
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
      },
    };

    axios.get('/sanctum/csrf-cookie').then((_response) => {
      axios
        .post(url, data, config)
        .then(function (response) {
          successCallback(response);
        })
        .catch(function (error) {
          errorCallback(error);
        });
    });
  }

  getData(url, successCallback, errorCallback) {
    axios.defaults.withCredentials = true;
    const config = {
      xsrfHeaderName: 'X-XSRF-TOKEN', // change the name of the header to "X-XSRF-TOKEN"
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
      },
    };

    axios.get('/sanctum/csrf-cookie').then((_response) => {
      axios
        .get(url, config)
        .then((response) => {
          successCallback(response);
        })
        .catch((error) => {
          errorCallback(error);
        });
    });
  }
}

export default new HttpHelper();
