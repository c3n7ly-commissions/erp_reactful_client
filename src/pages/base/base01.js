import React from 'react';
import { CssBaseline, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import NavigationDrawer from '../../components/drawer';
import NavBar from '../../components/navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // needed for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function BasePage01(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar handleDrawerToggle={handleDrawerToggle} />
      <NavigationDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card>
          <CardContent>{props.children}</CardContent>
        </Card>
      </main>
    </div>
  );
}

export default BasePage01;
