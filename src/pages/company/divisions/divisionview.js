import React from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

function DivisionView() {
  const classes = useStyles();
  let { id } = useParams();

  const rows = [
    { name: 'jane', age: '20', gender: 'male' },
    { name: 'jean', age: '25', gender: 'female' },
  ];

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
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell>Gender</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell>{row.gender}</TableCell>
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
