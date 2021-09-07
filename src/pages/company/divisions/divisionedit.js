import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SaveIcon from '@material-ui/icons/Save';
import BasePage01 from '../../base/base01';
import httpHelper from '../../../utils/httphelper';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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

function DivisionEdit() {
  let { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [buttonState, setButtonState] = useState({
    loading: false,
    type: 'save_data', // page_load or save_data
  });

  const [formValues, setFormValues] = useState({
    divisionName: '',
  });

  const successCallback = (response) => {
    console.log(response.data.data);

    setButtonState({
      loading: false,
      type: 'save_data',
    });

    setFormValues({
      divisionName: response.data.data.name,
    });
  };

  const errorCallback = (error) => {
    setButtonState({
      loading: false,
      type: 'save_data',
    });
    console.log(error);
  };

  useEffect(() => {
    const fetchData = () => {
      setButtonState({
        loading: true,
        type: 'page_load',
      });
      httpHelper.getData(
        `/api/divisions/${id}`,
        successCallback,
        errorCallback
      );
    };

    fetchData();
  }, [id]);

  return (
    <BasePage01
      crumb={['Company', 'Divisions', 'Edit', id]}
      title={`Edit Division ${id}`}
      actions={
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<ChevronLeftIcon />}
          onClick={() => {
            history.push('/divisions');
          }}
        >
          All Divisions
        </Button>
      }
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle2" className={classes.cardHeader}>
            Edit Division {id}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Division Name"
                variant="outlined"
                className={classes.textField}
                value={formValues['divisionName']}
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

export default DivisionEdit;
