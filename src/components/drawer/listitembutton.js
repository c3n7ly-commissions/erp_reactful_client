import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
  navIcon: {
    color: '#57616F',
    marginLeft: '12px',
    marginRight: '-15px',
  },

  listExpandIcon: {
    color: '#57616F',
  },
  listText: {
    fontSize: '0.9rem',
  },
}));

function ListItemButton(props) {
  const classes = useStyles();
  return (
    <ListItem button onClick={props.clickHandler}>
      <ListItemIcon className={classes.navIcon}>{props.icon}</ListItemIcon>
      <ListItemText
        primary={props.itemText}
        classes={{ primary: classes.listText }}
      />
      {props.open ? (
        <ExpandLess className={classes.listExpandIcon} />
      ) : (
        <ExpandMore className={classes.listExpandIcon} />
      )}
    </ListItem>
  );
}
export default ListItemButton;
