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
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
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
  iconButton: {
    color: '#9E9E9E',
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#4782DA',
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

function NavBar(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="primary"
        elevation={0}
      >
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
            <IconButton
              color="inherit"
              aria-label="show notifications"
              className={classes.iconButton}
            >
              <Badge badgeContent={3} color="secondary">
                <MailOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="my account"
              className={classes.iconButton}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="log out"
              className={classes.iconButton}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
