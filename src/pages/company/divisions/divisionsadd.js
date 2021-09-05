import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import BasePage01 from '../../base/base01';
const useStyles = makeStyles((theme) => ({
  cardHeader: {
    fontWeight: 300,
    marginBottom: theme.spacing(1.5),
  },
  textField: {
    minWidth: '100%',
  },
}));

function DivisionsAdd() {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    divisionName: '',
  });

  const [formValidations, setFormValidations] = useState({
    divisionName: '',
  });

  const [loading, setLoading] = useState(false);

  const fieldChangedClosure = (fieldName) => {
    return (event) => {
      let { ...tmpVals } = formValues;
      tmpVals[fieldName] = event.target.value;
      setFormValues({ ...tmpVals });
    };
  };

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
    console.log('submitting');
  };

  return (
    <BasePage01 crumb={['Company', 'Divisions', 'Add']} title="Add Division">
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </BasePage01>
  );
}

export default DivisionsAdd;
