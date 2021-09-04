import React from 'react';
import {
  CssBaseline,
  Card,
  CardContent,
  Breadcrumbs,
  Typography,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#f00',
    },
    secondary: {
      main: '#ff0',
    },
    warning: {
      main: '#f00',
    },
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#000',
    },
  },
});

function BasePage01(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <NavBar handleDrawerToggle={handleDrawerToggle} />
        <NavigationDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Breadcrumbs aria-label="breadcrumbs">
            <Typography color="textPrimary">Dashboard</Typography>
            <Typography color="textPrimary">Analytics</Typography>
          </Breadcrumbs>

          <main>
            <Card>
              <CardContent>{props.children}</CardContent>
            </Card>
          </main>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default BasePage01;
