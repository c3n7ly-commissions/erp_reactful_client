import React, { useEffect } from 'react';
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

  const successCallback = (response) => {
    console.log(response.data.data);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  useEffect(() => {
    const fetchData = () => {
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
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={0}>
                <Grid item xs="auto">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
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
