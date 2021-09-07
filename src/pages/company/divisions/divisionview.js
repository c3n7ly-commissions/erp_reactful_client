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
import ConfirmationModal from '../../../components/modals/confirmationmodal';

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

  const [snackBarState, setSnackBarState] = useState({
    open: false,
    value: '',
    type: 'success',
    redirect: false,
    duration: -1,
  });

  const [rows, setRows] = useState([]);

  const deletingSuccessCallback = (response) => {
    console.log(response);
    // TODO: redirect
    setSnackBarState({
      open: true,
      type: 'success',
      value: 'record deleted',
    });
  };

  const deletingErrorCallback = (error) => {
    console.log(error);
    httpHelper.handleCommonErrors(error, setSnackBarState);
  };

  const deleteRecordClosure = (id) => {
    return () => {
      console.log('Deleting', id);
      closeModal();
      httpHelper.deleteData(
        `/api/divisions/${id}`,
        deletingSuccessCallback,
        deletingErrorCallback
      );
    };
  };

  const [modalState, setModalState] = useState({
    open: false,
    content: '',
    proceedHandler: deleteRecordClosure(-1),
  });

  const closeModal = () => {
    setModalState({
      open: false,
      content: '',
    });
  };

  const deleteButtonClicked = () => {
    console.log('deleting');
    setModalState({
      open: true,
      content: `Division with the id ${id} will be deleted. Proceed?`,
      proceedHandler: deleteRecordClosure(id),
    });
  };

  const loadingSuccessCallback = (response) => {
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

  const loadingErrorCallback = (error) => {
    console.log(error);
  };

  useEffect(() => {
    const fetchData = () => {
      httpHelper.getData(
        `/api/divisions/${id}`,
        loadingSuccessCallback,
        loadingErrorCallback
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
                          onClick={deleteButtonClicked}
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

      <ConfirmationModal
        open={modalState.open}
        title={`Delete record?`}
        handleYesClicked={modalState.proceedHandler}
        handleNoClicked={closeModal}
      >
        {modalState.content}
      </ConfirmationModal>
    </BasePage01>
  );
}

export default DivisionView;
