import {
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  makeStyles,
  Typography,
  createTheme,
  ThemeProvider,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { grey } from '@material-ui/core/colors';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import auth from '../../utils/auth/auth.js';

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

const useStyles = makeStyles((_theme) => ({
  textField: {
    minWidth: '100%',
  },
  header: {
    textAlign: 'center',
    fontSize: '1.9rem',
    fontWeight: 500,
  },
  headerHelper: {
    textAlign: 'center',
    color: grey[700],
    fontSize: '0.9rem',
  },
  signInButton: {
    minWidth: '100%',
    padding: '0.5rem',
  },
  forgotButton: {
    minWidth: '100%',
  },
  fullWidth: {
    minWidth: '100%',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
  },
}));

function SignInScreen() {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [formValidations, setFormValidations] = useState({
    email: '',
    password: '',
  });

  const [snackBarState, setSnackBarState] = useState({
    open: false,
    type: 'success',
  });

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const closeSnackBar = (event, reason) => {
    setSnackBarState({
      open: false,
      type: snackBarState['type'],
      value: '',
    });
  };

  const fieldChangedClosure = (fieldName) => {
    return function fieldChanged(event) {
      let { ...tmpVals } = formValues;
      tmpVals[fieldName] = event.target.value;
      setFormValues({ ...tmpVals });
    };
  };

  const signInClicked = () => {
    let { ...validations } = formValidations;

    validations['email'] =
      formValues['email'] === '' ? 'This field should not be left empty' : '';
    validations['password'] =
      formValues['password'] === ''
        ? 'This field should not be left empty'
        : '';
    setFormValidations(validations);

    if (validations['email'] !== '' || validations['password'] !== '') {
      return;
    }

    setSnackBarState({
      open: true,
      type: 'info',
      value: 'Signing In',
    });

    setLoading(true);
    const params = new FormData();
    params.append('email', formValues['email']);
    params.append('password', formValues['password']);

    const signedIn = (response) => {
      // if we are here the response is 2xx
      setLoading(false);
      history.push('/dashboard_screen_1');
      console.log(response);
    };

    const errorSigningIn = (error) => {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 401) {
          setSnackBarState({
            open: true,
            type: 'error',
            value: error.response.data.message,
          });
        } else if (error.response.status === 423) {
          setSnackBarState({
            open: true,
            type: 'warning',
            value: error.response.data.message,
          });
        } else {
          setSnackBarState({
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
    };

    auth.login(params, signedIn, errorSigningIn);
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
        <Grid item xs={12} md={5} lg={3}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h2" className={classes.header}>
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
                  <form className={classes.fullWidth}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          label="Email Address"
                          autoComplete="username"
                          variant="outlined"
                          value={formValues['email']}
                          onChange={fieldChangedClosure('email')}
                          className={classes.textField}
                          error={formValidations['email'] !== ''}
                          helperText={formValidations['email']}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                          variant="outlined"
                          value={formValues['password']}
                          onChange={fieldChangedClosure('password')}
                          className={classes.textField}
                          error={formValidations['password'] !== ''}
                          helperText={formValidations['password']}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <div className={classes.wrapper}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.signInButton}
                            onClick={signInClicked}
                            disabled={loading}
                          >
                            Sign In
                          </Button>
                          {loading && (
                            <CircularProgress
                              size={24}
                              className={classes.circularProgress}
                            />
                          )}
                        </div>

                        <Button
                          color="primary"
                          className={classes.forgotButton}
                        >
                          Forgot Password
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Snackbar
          open={snackBarState['open']}
          onClose={closeSnackBar}
          autoHideDuration={6000}
        >
          <Alert severity={snackBarState['type']}>
            {snackBarState['value']}
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInScreen;
