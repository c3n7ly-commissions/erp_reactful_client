import { useEffect } from 'react';
import axios from 'axios';

const getAuthDetails = () => {
  axios.defaults.withCredentials = true;
  const response = axios
    .get('https://laravel-erp-server.herokuapp.com/sanctum/csrf-cookie')
    .then((_response) => {
      return axios.get(
        'https://laravel-erp-server.herokuapp.com/api/auth/show',
        {
          xsrfHeaderName: 'X-XSRF-TOKEN', // change the name of the header to "X-XSRF-TOKEN" and it should works
          withCredentials: true,
        }
      );
    });

  return response;
};

export function DashboardScreen1() {
  useEffect(() => {
    console.log('updated component');
    // getAuthDetails().then((response) => {
    // console.log(response);
    // });
  });

  return (
    <div>
      <h1>Dashboard Screen 1</h1>
    </div>
  );
}
