import React from 'react';
import {
  CssBaseline,
  Divider,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import NavigationDrawer from '../../components/drawer';
import NavBar from '../../components/navbar';
import NavBreadcrumbs from '../../components/navcrumbs';

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
  divider: {
    marginBottom: theme.spacing(2),
  },
  headerText: {
    fontWeight: 600,
  },
  headerGrid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flexGrow: 1,
  },
}));

const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },

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
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
            className={classes.headerGrid}
          >
            <Grid item xs={12} md>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h5" className={classes.headerText}>
                    {props.title}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <NavBreadcrumbs crumb={props.crumb} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md="auto">
              <Typography variant="span" className={classes.headerText}>
                Action
              </Typography>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          <main>{props.children}</main>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default BasePage01;
