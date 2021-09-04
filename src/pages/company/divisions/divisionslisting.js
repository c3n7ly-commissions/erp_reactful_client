import React from 'react';
import { Typography, Card, CardContent, Button } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@material-ui/icons/Add';
import BasePage01 from '../../base/base01';

function DivisionsListing() {
  const rows = [
    { id: 1, col1: 'Hello', col2: 'Grid' },
    { id: 2, col1: 'Data', col2: 'Good' },
  ];
  const cols = [
    { field: 'col1', headerName: 'Column 1', flex: 1 },
    { field: 'col2', headerName: 'Column 2', flex: 1 },
  ];

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
          <Typography paragraph>Content goes here</Typography>
          <div style={{ height: '70vh', width: '100%' }}>
            <DataGrid rows={rows} columns={cols} />
          </div>
        </CardContent>
      </Card>
    </BasePage01>
  );
}

export default DivisionsListing;
