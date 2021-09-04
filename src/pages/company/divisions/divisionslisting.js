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
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    fontWeight: 300,
    marginBottom: theme.spacing(1.5),
  },
}));

function DivisionsListing() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [menuAnchors, setMenuAnchors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleMenuClose = (id) => {
    return () => {
      let { ...tmpMenuAnchors } = menuAnchors;
      tmpMenuAnchors[id] = null;
      setMenuAnchors(tmpMenuAnchors);
    };
  };
  const cols = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'created_at', headerName: 'Created At', flex: 1 },
    { field: 'updated_at', headerName: 'Updated At', flex: 1 },
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
              <MenuItem onClick={handleMenuClose(params.row.id)}>
                {params.row.id}
              </MenuItem>
              <MenuItem onClick={handleMenuClose(params.row.id)}>View</MenuItem>
              <MenuItem onClick={handleMenuClose(params.row.id)}>
                Update
              </MenuItem>
              <MenuItem onClick={handleMenuClose(params.row.id)}>
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const fetchData = () => {
    axios.defaults.withCredentials = true;
    setLoading(true);
    const config = {
      xsrfHeaderName: 'X-XSRF-TOKEN', // change the name of the header to "X-XSRF-TOKEN"
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
      },
    };
    const response = axios.get('/sanctum/csrf-cookie').then((_response) => {
      axios
        .get('/api/divisions', config)
        .then((response) => {
          console.log(response.data.data);
          setLoading(false);
          setRows([...response.data.data]);
        })
        .catch((error) => {
          // do sth
          setLoading(false);
          console.log(error);
        });
    });
    return response;
  };

  useEffect(() => {
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
            <DataGrid rows={rows} columns={cols} loading={loading} />
          </div>
        </CardContent>
      </Card>
    </BasePage01>
  );
}

export default DivisionsListing;
