import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableCell,
  TableBody,
  Button,
  TableRow,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import BasePage01 from '../../base/base01';
import httpHelper from '../../../utils/httphelper';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

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
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </BasePage01>
  );
}

export default DivisionView;
