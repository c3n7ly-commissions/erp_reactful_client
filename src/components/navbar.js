import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Badge,
  Box,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#11cb5f',
    },
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#000',
    },
  },
});

function NavBar(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <div>
            <IconButton color="inherit" aria-label="show notifications">
              <Badge badgeContent={3} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" aria-label="my account">
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" aria-label="log out">
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
