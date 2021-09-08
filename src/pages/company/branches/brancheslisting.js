import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@material-ui/icons/Add';
import BasePage01 from '../../base/base01';
import httpHelper from '../../../utils/httphelper';
import ConfirmationModal from '../../../components/modals/confirmationmodal';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    fontWeight: 300,
    marginBottom: theme.spacing(1.5),
  },
  deleteMenuItem: {
    color: theme.palette.secondary.main,
  },
}));

function BranchesListing() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [menuAnchors, setMenuAnchors] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    value: '',
    type: 'success',
    redirect: false,
    duration: -1,
  });

  const history = useHistory();
  const handleMenuClose = (id) => {
    return () => {
      let { ...tmpMenuAnchors } = menuAnchors;
      tmpMenuAnchors[id] = null;
      setMenuAnchors(tmpMenuAnchors);
    };
  };

  const loadingSuccessCallback = (response) => {
    console.log(response.data.data);
    setLoading(false);
    setRows([...response.data.data]);
  };
  const loadingErrorCallback = (error) => {
    setLoading(false);
    console.log(error);
    httpHelper.handleCommonErrors(error, setSnackBarState);
  };

  const fetchData = () => {
    setLoading(true);
    httpHelper.getData(
      '/api/branches',
      loadingSuccessCallback,
      loadingErrorCallback
    );
  };

  const deletingSuccessCallback = (response) => {
    console.log(response);
    fetchData();
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

  const deleteRecordClosure = (id, divisionId) => {
    return () => {
      console.log('Deleting', id);
      closeModal();
      httpHelper.deleteData(
        `/api/divisions/${divisionId}/branches/${id}`,
        deletingSuccessCallback,
        deletingErrorCallback
      );
    };
  };

  const [modalState, setModalState] = useState({
    open: false,
    content: '',
    proceedHandler: deleteRecordClosure(-1, -1),
  });

  const deleteItemModalClosure = (id, divisionId) => {
    return () => {
      // first close the menu
      let { ...tmpMenuAnchors } = menuAnchors;
      tmpMenuAnchors[id] = null;
      setMenuAnchors(tmpMenuAnchors);

      // the show the confirmation dialog
      setModalState({
        open: true,
        content: `Branch with the id ${id} will be deleted. Proceed?`,
        proceedHandler: deleteRecordClosure(id, divisionId),
      });
    };
  };

  const closeModal = () => {
    setModalState({
      open: false,
      content: '',
    });
  };

  const cols = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Name', minWidth: 200, flex: 1 },
    { field: 'telephone', headerName: 'Telephone', minWidth: 170 },
    { field: 'postal_address', headerName: 'Postal Address', minWidth: 200 },
    {
      field: 'physical_address',
      headerName: 'Physical Address',
      minWidth: 300,
    },
    { field: 'division_name', headerName: 'Division', minWidth: 200 },
    {
      field: 'action',
      headerName: 'Action',
      disableClickEventBubling: true,
      minWidth: 120,
      renderCell: (params) => {
        const onClick = (event) => {
          console.log(params.row.id);

          let { ...tmpMenuAnchors } = menuAnchors;
          tmpMenuAnchors[params.row.id] = event.currentTarget;
          setMenuAnchors(tmpMenuAnchors);
        };
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onClick}
            >
              Actions
            </Button>
            <Menu
              anchorEl={menuAnchors[params.row.id]}
              keepMounted
              open={Boolean(menuAnchors[params.row.id])}
              onClose={handleMenuClose(params.row.id)}
            >
              <MenuItem
                onClick={handleMenuClose(params.row.id)}
                disabled={true}
              >
                {params.row.id}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push(`/branches/view/${params.row.id}`);
                }}
              >
                View
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push(`/branches/edit/${params.row.id}`);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={deleteItemModalClosure(
                  params.row.id,
                  params.row.division_id
                )}
                className={classes.deleteMenuItem}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchDataOnMount = () => {
      setLoading(true);
      httpHelper.getData(
        '/api/branches',
        loadingSuccessCallback,
        loadingErrorCallback
      );
    };

    fetchDataOnMount();
  }, []);

  return (
    <BasePage01
      crumb={['Company', 'Branches']}
      title="Branches"
      actions={
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => {
            history.push('/branches/add');
          }}
        >
          Add Branch
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
          <Typography variant="subtitle2" className={classes.cardHeader}>
            Branches
          </Typography>
          <div style={{ height: '70vh', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={cols}
              loading={loading}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
            />
          </div>
        </CardContent>
      </Card>

      <ConfirmationModal
        open={modalState.open}
        title="Delete record?"
        handleYesClicked={modalState.proceedHandler}
        handleNoClicked={closeModal}
      >
        {modalState.content}
      </ConfirmationModal>
    </BasePage01>
  );
}

export default BranchesListing;
