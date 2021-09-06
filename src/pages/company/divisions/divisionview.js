import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import BasePage01 from '../../base/base01';
import { useParams } from 'react-router-dom';
import httpHelper from '../../../utils/httphelper';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

function DivisionView() {
  const classes = useStyles();
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
      actions={<Typography variant="body1">Actions</Typography>}
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
