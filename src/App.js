import { Button, Grid } from '@material-ui/core';

const axios = require('axios');

// Make a request for a user with a given ID

export const sendLogin = (data) => {
  axios.defaults.withCredentials = true;
  const response = axios.get('https://laravel-erp-server.herokuapp.com/sanctum/csrf-cookie',
    // {
    //   withCredentials: false
    // }
  ).then(response => {
    return axios.post('https://laravel-erp-server.herokuapp.com/api/auth/login', data, {
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </Grid>

    </Grid>
  );
}

export default App;
