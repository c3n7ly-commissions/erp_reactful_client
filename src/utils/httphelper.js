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

  deleteData(url, successCallback, errorCallback) {
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
        .delete(url, config)
        .then((response) => {
          successCallback(response);
        })
        .catch((error) => {
          errorCallback(error);
        });
    });
  }

  handleCommonErrors(error, snackbarStateHandler) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 401) {
        // unauthenticated
        snackbarStateHandler({
          open: true,
          type: 'error',
          value: error.response.data.message,
          redirect: '/',
          duration: 1500,
        });
      } else if (error.response.status === 409) {
        // conflict
        snackbarStateHandler({
          open: true,
          type: 'warning',
          value: error.response.data.message,
        });
      } else if (error.response.status === 422) {
        // unprocessable entity
        snackbarStateHandler({
          open: true,
          type: 'warning',
          value: error.response.data.message,
        });
      } else {
        snackbarStateHandler({
          open: true,
          type: 'error',
          value: `error code ${error.response.status}`,
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
}

export default new HttpHelper();
