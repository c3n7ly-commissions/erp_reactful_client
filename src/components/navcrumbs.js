import React from 'react';
import { Breadcrumbs, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((_theme) => ({
  breadcrumbs: {
    fontSize: '0.9rem',
  },
  text: {
    fontSize: '0.9rem',
    color: '#646464',
  },
}));

function NavBreadcrumbs(props) {
  const classes = useStyles();
  const crumbs = props.crumb.map((item, index) => (
    <Typography
      color="textPrimary"
      className={classes.text}
      key={index.toString()}
    >
      {item}
    </Typography>
  ));
  return (
    <Breadcrumbs aria-label="breadcrumbs" className={classes.breadcrumbs}>
      {crumbs}
    </Breadcrumbs>
  );
}

export default NavBreadcrumbs;
