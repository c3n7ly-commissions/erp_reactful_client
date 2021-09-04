import React from 'react';
import { Breadcrumbs, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    paddingBottom: theme.spacing(2),
    fontSize: '0.9rem',
  },
  text: {
    fontSize: '0.9rem',
    color: '#646464',
  },
}));

function NavBreadcrumbs() {
  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumbs" className={classes.breadcrumbs}>
      <Typography color="textPrimary" className={classes.text}>
        Dashboard
      </Typography>
      <Typography color="textPrimary" className={classes.text}>
        Analytics
      </Typography>
    </Breadcrumbs>
  );
}

export default NavBreadcrumbs;
