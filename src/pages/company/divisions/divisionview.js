import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableCell,
  TableBody,
  Button,
  TableRow,
  Grid,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import BasePage01 from '../../base/base01';
import httpHelper from '../../../utils/httphelper';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '100%',
  },
  actionCell: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

function DivisionView() {
  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();

  const [rows, setRows] = useState([]);

  const successCallback = (response) => {
    console.log(response.data.data);
    let tmpRows = [];
    for (let key in response.data.data) {
      let tmpRow = { name: key, value: response.data.data[key] };
      if (key !== 'links') {
        tmpRows.push(tmpRow);
      }
    }
    setRows(tmpRows);
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
      crumb={['Company', 'Divisions', 'View', id]}
      title={`View Division ${id}`}
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
          <TableContainer>
            <Table className={classes.table}>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <strong>{row.name}</strong>
                    </TableCell>
                    <TableCell>{row.value === '' ? '-' : row.value}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.actionCell}
                  >
                    <strong>Actions</strong>
                  </TableCell>
                  <TableCell className={classes.actionCell}>
                    <Grid container direction="row" spacing={1}>
                      <Grid item xs="auto">
                        <Button
                          color="primary"
                          startIcon={<EditIcon />}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            history.push(`/divisions/edit/${id}`);
                          }}
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item xs="auto">
                        <Button
                          startIcon={<DeleteOutlinedIcon />}
                          color="secondary"
                          variant="outlined"
                          size="small"
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </BasePage01>
  );
}

export default DivisionView;
