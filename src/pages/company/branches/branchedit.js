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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SaveIcon from '@material-ui/icons/Save';
import { useParams } from 'react-router-dom';
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

function BranchEdit() {
  let { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [buttonState, setButtonState] = useState({
    loading: false,
    type: 'save_data', // page_load or save_data
  });

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

  const [snackBarState, setSnackBarState] = useState({
    open: false,
    value: '',
    type: 'success',
    redirect: false,
    duration: -1,
  });

  const loadingDataSuccess = (response) => {
    console.log(response);
    setButtonState({
      loading: false,
      type: 'save_data',
    });

    const data = response.data.data;
    setFormValues({
      branchName: data.name,
      divisionId: data.division_id,
      email: data.email,
      telephone: data.telephone,
      postalAddress: data.postal_address,
      physicalAddress: data.physical_address,
    });
  };
  const loadingDataError = (error) => {
    setButtonState({
      loading: false,
      type: 'save_data',
    });
    console.log(error);
    httpHelper.handleCommonErrors(error, setSnackBarState);
  };

  const [divisions, setDivisions] = useState([]);

  const loadingDivisionsError = (error) => {
    console.log(error);
    httpHelper.handleCommonErrors(error, setSnackBarState);
  };

  useEffect(() => {
    const loadingDivisionsSuccess = (response) => {
      // 1. update the select element
      console.log(response.data.data);
      setDivisions([...response.data.data]);

      // 2. now fetch the page data
      httpHelper.getData(
        `/api/branches/${id}`,
        loadingDataSuccess,
        loadingDataError
      );
    };

    const fetchData = () => {
      setButtonState({
        loading: true,
        type: 'page_load',
      });

      httpHelper.getData(
        `api/divisions`,
        loadingDivisionsSuccess,
        loadingDivisionsError
      );
    };

    fetchData();
  }, [id]);

  const fieldChangedClosure = (fieldName) => {
    return (event) => {
      let { ...tmpVals } = formValues;
      tmpVals[fieldName] = event.target.value;
      setFormValues({ ...tmpVals });
    };
  };

  const savingSuccessCallback = (response) => {
    console.log(response);
    setButtonState({
      loading: false,
      type: 'save_data',
    });

    setSnackBarState({
      open: true,
      type: 'success',
      value: 'record saved',
      redirect: `/branches/view/${response.data.data.id}`,
      duration: 1500,
    });
  };

  const savingErrorCallback = (error) => {
    console.log(error);
    setButtonState({
      loading: false,
      type: 'save_data',
    });
    httpHelper.handleCommonErrors(error, setSnackBarState);
  };

  const saveClicked = () => {
    // create a copy of current validation state
    let { ...validations } = formValidations;

    // validate the fields
    const dontLeaveEmpty = 'This field should not be left empty';
    validations['branchName'] =
      formValues['branchName'] === '' ? dontLeaveEmpty : '';
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

    setButtonState({
      loading: true,
      type: 'save_data',
    });

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
      `/api/divisions/${formValues['divisionId']}/branches`,
      formData,
      savingSuccessCallback,
      savingErrorCallback
    );
  };

  return (
    <BasePage01
      crumb={['Company', 'Branches', 'Edit', id]}
      title={`Edit Branch ${id}`}
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
      actions={
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<ChevronLeftIcon />}
          onClick={() => {
            history.push('/branches');
          }}
        >
          All Branches
        </Button>
      }
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle2" className={classes.cardHeader}>
            {`Edit Branch ${id}`}
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
                type="email"
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
                type="tel"
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
                      disabled={buttonState.loading}
                      startIcon={
                        buttonState.type === 'page_load' ? (
                          <AccessTimeIcon />
                        ) : (
                          <SaveIcon />
                        )
                      }
                    >
                      {buttonState.type === 'page_load' ? 'Loading' : 'Save'}
                    </Button>
                    {buttonState.loading && (
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

export default BranchEdit;
