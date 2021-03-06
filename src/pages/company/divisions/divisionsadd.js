import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import BasePage01 from '../../base/base01';
import httpHelper from '../../../utils/httphelper';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    fontWeight: 300,
    marginBottom: theme.spacing(1.5),
  },
  textField: {
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
    marginTop: '-10px',
    marginLeft: '-10px',
  },
}));

function DivisionsAdd() {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    divisionName: '',
  });

  const [formValidations, setFormValidations] = useState({
    divisionName: '',
  });

  const [loading, setLoading] = useState(false);

  const [snackBarState, setSnackBarState] = useState({
    open: false,
    value: '',
    type: 'success',
    redirect: false,
    duration: -1,
  });

  const fieldChangedClosure = (fieldName) => {
    return (event) => {
      let { ...tmpVals } = formValues;
      tmpVals[fieldName] = event.target.value;
      setFormValues({ ...tmpVals });
    };
  };

  function successCallback(response) {
    console.log(response);
    setLoading(false);
    setSnackBarState({
      open: true,
      type: 'success',
      value: 'record saved',
      redirect: `/divisions/view/${response.data.data.id}`,
      duration: 1500,
    });
  }

  function errorCallback(error) {
    console.log(error);
    setLoading(false);
    httpHelper.handleCommonErrors(error, setSnackBarState);
  }

  const saveClicked = () => {
    let { ...validations } = formValidations;

    validations['divisionName'] =
      formValues['divisionName'] === ''
        ? 'This field should not be left empty'
        : '';

    setFormValidations(validations);
    if (validations['divisionName'] !== '') {
      return;
    }

    setLoading(true);
    setSnackBarState({
      open: true,
      value: 'Saving',
      type: 'info',
    });

    console.log('submitting');
    const formData = new FormData();
    formData.append('name', formValues['divisionName']);
    httpHelper.postData(
      '/api/divisions',
      formData,
      successCallback,
      errorCallback
    );
  };

  return (
    <BasePage01
      crumb={['Company', 'Divisions', 'Add']}
      title="Add Division"
      snackbar={{
        closeHandler: () => {
          setSnackBarState({
            open: false,
            value: '',
            type: 'success',
          });
          if (snackBarState.redirect) {
            history.replace(snackBarState.redirect);
          }
        },
        autoHideDuration:
          snackBarState.duration && snackBarState.duration > 0
            ? snackBarState.duration
            : 6000,
        ...snackBarState,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle2" className={classes.cardHeader}>
            Add Division
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Division Name"
                value={formValues['divisionName']}
                error={formValidations['divisionName'] !== ''}
                helperText={formValidations['divisionName']}
                onChange={fieldChangedClosure('divisionName')}
                variant="outlined"
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={0}>
                <Grid item xs="auto">
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={saveClicked}
                      disabled={loading}
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={20}
                        className={classes.circularProgress}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </BasePage01>
  );
}

export default DivisionsAdd;
