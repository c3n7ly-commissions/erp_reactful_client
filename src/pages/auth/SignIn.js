import {
  Button, Grid, Card, CardContent, TextField, makeStyles,
  Typography,
  createTheme,
  ThemeProvider,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { grey } from '@material-ui/core/colors';
import axios from 'axios';
import { useState } from 'react';

// Make a request for a user with a given ID
export const sendLogin = (data) => {
  axios.defaults.withCredentials = true;
  const response = axios.get('https://laravel-erp-server.herokuapp.com/sanctum/csrf-cookie'
  ).then(response => {
    return axios.post('https://laravel-erp-server.herokuapp.com/api/auth/login', data, {
      xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
      withCredentials: true
    });
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  })
  return response;
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: "100%"
  },
  header: {
    textAlign: "center",
    fontSize: "2.7rem",
    fontWeight: 200
  },
  headerHelper: {
    textAlign: "center",
    color: grey[700],
    fontSize: "0.9rem"
  },
  signInButton: {
    minWidth: "100%",
    padding: "0.5rem"
  },
  forgotButton: {
    minWidth: "100%",
  }
}));

function SignInScreen() {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const [formValidations, setFormValidations] = useState({
    email: "",
    password: ""
  });

  const [snackBarState, setSnackBarState] = useState({
    open: false,
    type: "success"
  });

  const closeSnackBar = (event, reason) => {
    setSnackBarState({
      open: false,
      type: snackBarState["type"],
      value: ""
    });
  };

  const fieldChangedClosure = fieldName => {
    return function fieldChanged(event) {
      let tmpVals = formValues;
      tmpVals[fieldName] = event.target.value;
      setFormValues({ ...tmpVals });
    }
  }

  const signInClicked = () => {
    let { ...validations } = formValidations;

    validations["email"] = formValues['email'] === "" ?
      "This field should not be left empty" : "";
    validations["password"] = formValues['password'] === "" ?
      "This field should not be left empty" : "";
    setFormValidations(validations);

    if (validations["email"] !== "" || validations["password"] !== "") {
      return;
    }

    setSnackBarState({
      open: true,
      type: "info",
      value: "Signing In"
    });

    const params = new URLSearchParams();
    params.append('email', formValues["email"]);
    params.append('password', formValues["password"]);

    sendLogin(params)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === 401) {
            setSnackBarState({
              open: true,
              type: "error",
              value: error.response.data.message
            });
          }
          else if (error.response.status === 423) {
            setSnackBarState({
              open: true,
              type: "warning",
              value: error.response.data.message
            });
          } else {
            setSnackBarState({
              open: true,
              type: "error",
              value: `error code ${error.response.status}`
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
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={3}>
          <Card>
            <CardContent>

              <Grid container spacing={2}>

                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h2"
                      className={classes.header}
                    >
                      Sign In
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      className={classes.headerHelper}
                      gutterBottom
                    >
                      Enter your credentials to proceed
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    label="Email Address"
                    variant="outlined"
                    value={formValues["email"]}
                    onChange={fieldChangedClosure("email")}
                    className={classes.textField}
                    error={formValidations["email"] !== ""}
                    helperText={formValidations["email"]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formValues["password"]}
                    onChange={fieldChangedClosure("password")}
                    className={classes.textField}
                    error={formValidations["password"] !== ""}
                    helperText={formValidations["password"]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.signInButton}
                    onClick={signInClicked}
                  >
                    Sign In
                  </Button>

                  <Button
                    color="primary"
                    className={classes.forgotButton}
                  >
                    Forgot Password
                  </Button>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>


        <Snackbar
          open={snackBarState["open"]}
          onClose={closeSnackBar}
          autoHideDuration={6000}
        >
          <Alert severity={snackBarState["type"]}>{snackBarState["value"]}</Alert>
        </Snackbar>

      </Grid>
    </ThemeProvider>
  );
}

export default SignInScreen;
