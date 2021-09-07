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

function DivisionsListing() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [menuAnchors, setMenuAnchors] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = React.useState(10);

  const history = useHistory();

  const handleMenuClose = (id) => {
    return () => {
      let { ...tmpMenuAnchors } = menuAnchors;
      tmpMenuAnchors[id] = null;
      setMenuAnchors(tmpMenuAnchors);
    };
  };

  const deleteItemClosure = (id) => {
    return () => {
      let { ...tmpMenuAnchors } = menuAnchors;
      tmpMenuAnchors[id] = null;
      setMenuAnchors(tmpMenuAnchors);
    };
  };

  const cols = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
    { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 200 },
    { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 200 },
    {
      field: 'action',
      headerName: 'Action',
      disableClickEventBubling: true,
      width: 120,
      renderCell: (params) => {
        const onClick = (event) => {
          console.log(params.row);

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
                  history.push(`/divisions/view/${params.row.id}`);
                }}
              >
                View
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push(`/divisions/edit/${params.row.id}`);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={deleteItemClosure(params.row.id)}
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

  const successCallback = (response) => {
    console.log(response.data.data);
    setLoading(false);
    setRows([...response.data.data]);
  };
  const errorCallback = (error) => {
    setLoading(false);
    console.log(error);
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      httpHelper.getData('/api/divisions', successCallback, errorCallback);
    };

    fetchData();
  }, []);

  return (
    <BasePage01
      crumb={['Company', 'Divisions']}
      title="Divisions"
      actions={
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => {
            history.push('/divisions/add');
          }}
        >
          Add Division
        </Button>
      }
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle2" className={classes.cardHeader}>
            Divisions
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
        open={true}
        title={`Delete record 1?`}
        yesButtonText="Delete"
        handleYesClicked={() => {
          console.log('deleting');
        }}
        handleNoClicked={() => {
          console.log('not deleting');
        }}
      >
        Dolor modi autem perferendis dignissimos neque. Eos labore ratione
        corrupti vitae omnis. At inventore ab tempora ab quisquam, consequuntur
        vero Quibusdam facere eum perferendis animi possimus fuga? Odit nam et.
      </ConfirmationModal>
    </BasePage01>
  );
}

export default DivisionsListing;
