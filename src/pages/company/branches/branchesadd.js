import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
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

function BranchesAdd() {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    branchName: '',
    divisionId: '',
    email: '',
    telephone: '',
    postalAddress: '',
    physicalAddress: '',
  });

  const [formValidations, setFormValidations] = useState({
    branchName: '',
    divisionId: '',
    email: '',
    telephone: '',
    postalAddress: '',
    physicalAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    value: '',
    type: 'success',
    redirect: false,
    duration: -1,
  });

  const [divisions, setDivisions] = useState([]);
  const loadingDivisionsSuccess = (response) => {
    console.log(response.data.data);
    setDivisions([...response.data.data]);
  };

  const loadingDivisionsError = (error) => {
    console.log(error);
    httpHelper.handleCommonErrors(error, setSnackBarState);
  };

  useEffect(() => {
    const fetchData = () => {
      httpHelper.getData(
        `api/divisions`,
        loadingDivisionsSuccess,
        loadingDivisionsError
      );
    };

    fetchData();
  }, []);

  const fieldChangedClosure = (fieldName) => {
    return (event) => {
      let { ...tmpVals } = formValues;
      tmpVals[fieldName] = event.target.value;
      setFormValues({ ...tmpVals });
    };
  };

  const savingSuccessCallback = (response) => {
    console.log(response);
    setLoading(false);
    setSnackBarState({
      open: true,
      type: 'success',
      value: 'record saved',
      redirect: '/branches',
      duration: 1500,
    });
  };

  const savingErrorCallback = (error) => {
    console.log(error);
    setLoading(false);
    httpHelper.handleCommonErrors(error, setSnackBarState);
  };

  const saveClicked = () => {
    // create a copy of current validation state
    let { ...validations } = formValidations;

    // validate the fields
    const dontLeaveEmpty = 'This field should not be left empty';
    validations['branchName'] =
      formValues['branchName'] === '' ? dontLeaveEmpty : '';
    validations['divisionName'] =
      formValues['divisionName'] === '' ? dontLeaveEmpty : '';
    validations['divisionId'] =
      formValues['divisionId'] === '' ? dontLeaveEmpty : '';
    validations['email'] = formValues['email'] === '' ? dontLeaveEmpty : '';
    validations['telephone'] =
      formValues['telephone'] === '' ? dontLeaveEmpty : '';
    validations['postalAddress'] =
      formValues['postalAddress'] === '' ? dontLeaveEmpty : '';
    validations['physicalAddress'] =
      formValues['physicalAddress'] === '' ? dontLeaveEmpty : '';

    // update the validations and return if there is any validation error
    setFormValidations(validations);
    for (let key in validations) {
      if (validations[key] !== '') {
        return;
      }
    }

    setLoading(true);
    setSnackBarState({
      open: true,
      value: 'Saving',
      type: 'info',
    });

    console.log('submitting');
    const formData = new FormData();
    formData.append('name', formValues['branchName']);
    formData.append('email', formValues['email']);
    formData.append('telephone', formValues['telephone']);
    formData.append('postal_address', formValues['postalAddress']);
    formData.append('physical_address', formValues['physicalAddress']);
    httpHelper.postData(
      `/api/divisions/${formValues['divisionId']}/`,
      formData,
      savingSuccessCallback,
      savingErrorCallback
    );
  };

  return (
    <BasePage01
      crumb={['Company', 'Branches', 'Add']}
      title="Add Branch"
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
            Add Branch
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Branch Name"
                value={formValues['branchName']}
                error={formValidations['branchName'] !== ''}
                helperText={formValidations['branchName']}
                onChange={fieldChangedClosure('branchName')}
                variant="outlined"
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                className={classes.textField}
                error={formValidations['divisionId'] !== ''}
              >
                <InputLabel id="division-label">Division*</InputLabel>
                <Select
                  labelId="division-label"
                  labelWidth={70}
                  id="division-control"
                  value={formValues['divisionId']}
                  onChange={fieldChangedClosure('divisionId')}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {divisions.map((division) => (
                    <MenuItem key={division.id} value={division.id}>
                      {division.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formValidations['divisionId']}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Email"
                value={formValues['email']}
                error={formValidations['email'] !== ''}
                helperText={formValidations['email']}
                onChange={fieldChangedClosure('email')}
                variant="outlined"
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Telephone"
                value={formValues['telephone']}
                error={formValidations['telephone'] !== ''}
                helperText={formValidations['telephone']}
                onChange={fieldChangedClosure('telephone')}
                variant="outlined"
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Postal Address"
                value={formValues['postalAddress']}
                error={formValidations['postalAddress'] !== ''}
                helperText={formValidations['postalAddress']}
                onChange={fieldChangedClosure('postalAddress')}
                variant="outlined"
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Physical Address"
                value={formValues['physicalAddress']}
                error={formValidations['physicalAddress'] !== ''}
                helperText={formValidations['physicalAddress']}
                onChange={fieldChangedClosure('physicalAddress')}
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

export default BranchesAdd;
