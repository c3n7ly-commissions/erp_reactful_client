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

function BranchView() {
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
    setSnackBarState({
      open: true,
      type: 'success',
      value: 'record deleted',
      redirect: '/branches',
      duration: 1500,
    });
  };
  const deletingErrorCallback = (error) => {
    console.log(error);
    setSnackBarState({
      open: true,
      type: 'success',
      value: 'record deleted',
      redirect: '/branches',
      duration: 1500,
    });
  };

  const deleteRecordClosure = (id) => {
    return () => {
      console.log('Deleting', id);
      closeModal();
      httpHelper.deleteData(
        `api/branches/${id}`,
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
      content: `Branch with the id ${id} will be deleted. Proceed?`,
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
    httpHelper.handleCommonErrors(error, setSnackBarState);
  };

  useEffect(() => {
    const fetchData = () => {
      httpHelper.getData(
        `api/branches/${id}`,
        loadingSuccessCallback,
        loadingErrorCallback
      );
    };

    fetchData();
  }, [id]);

  return (
    <BasePage01
      crumb={['Company', 'Branches', 'View', id]}
      title={`View Branch ${id}`}
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
                  <TableCell component="th" scope="row">
                    <strong>Actions</strong>
                  </TableCell>
                  <TableCell className={classes.actionCell}>
                    <Grid container spacing={1} direction="row">
                      <Grid item xs="auto">
                        <Button
                          color="primary"
                          startIcon={<EditIcon />}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            history.push(`/branches/edit/${id}`);
                          }}
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item xs="auto">
                        <Button
                          color="secondary"
                          startIcon={<DeleteOutlinedIcon />}
                          variant="outlined"
                          size="small"
                          onClick={deleteButtonClicked}
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

export default BranchView;
