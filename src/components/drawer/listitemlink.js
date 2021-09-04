import React from 'react';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((_theme) => ({
  listText: {
    fontSize: '0.9rem',
  },
  listItemNested: {
    paddingLeft: '62px',
    color: '#C4C4C4',
  },
}));

function ListItemLink(props) {
  const classes = useStyles();
  return (
    <ListItem button onClick={props.clickHandler}>
      <ListItemText
        className={classes.listItemNested}
        primary={props.itemText}
        classes={{ primary: classes.listText }}
      />
    </ListItem>
  );
}
export default ListItemLink;
