import React, { useState } from 'react';
import {
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
  ThemeProvider,
  makeStyles,
  createTheme,
} from '@material-ui/core';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import logo from '../assets/images/c3n7_erp-logo/vector/default-monochrome-white.svg';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  navIcon: {
    color: '#57616F',
    marginLeft: '12px',
    marginRight: '-15px',
  },
  listText: {
    fontSize: '0.9rem',
  },
  listHeader: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#ADB0B7',
    marginLeft: '10px',
    marginBottom: '-12px',
  },
  listExpandIcon: {
    color: '#57616F',
  },
  listItemNested: {
    paddingLeft: '78px',
    color: '#C4C4C4',
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
      main: '#11cb5f',
    },
    background: {
      paper: '#233044',
    },
    text: {
      primary: '#E4E4D4',
    },
  },
});

function NavigationDrawer(props) {
  const { window } = props;
  const classes = useStyles(theme);
  const [navItemOpen, setNavItemOpen] = useState({
    dashboard: false,
    company: false,
  });

  const handleNavItemClick = (itemName) => {
    return () => {
      let { ...tmpNavItems } = navItemOpen;

      tmpNavItems[itemName] = !tmpNavItems[itemName];
      setNavItemOpen(tmpNavItems);
    };
  };

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <img src={logo} alt="logo" height={40} />
      </div>
      <List
        subheader={
          <ListSubheader component="div" className={classes.listHeader}>
            General
          </ListSubheader>
        }
      >
        <ListItem button onClick={handleNavItemClick('dashboard')}>
          <ListItemIcon className={classes.navIcon}>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            classes={{ primary: classes.listText }}
          />
          {navItemOpen['dashboard'] ? (
            <ExpandLess className={classes.listExpandIcon} />
          ) : (
            <ExpandMore className={classes.listExpandIcon} />
          )}
        </ListItem>
        <Collapse in={navItemOpen['dashboard']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.listItemNested}>
              <ListItemText
                primary="Analytics"
                classes={{ primary: classes.listText }}
              />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleNavItemClick('company')}>
          <ListItemIcon className={classes.navIcon}>
            <BusinessOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Company"
            classes={{ primary: classes.listText }}
          />
          {navItemOpen['company'] ? (
            <ExpandLess className={classes.listExpandIcon} />
          ) : (
            <ExpandMore className={classes.listExpandIcon} />
          )}
        </ListItem>
        <Collapse in={navItemOpen['company']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.listItemNested}>
              <ListItemText
                primary="Divisions"
                classes={{ primary: classes.listText }}
              />
            </ListItem>
            <ListItem button className={classes.listItemNested}>
              <ListItemText
                primary="Branches"
                classes={{ primary: classes.listText }}
              />
            </ListItem>
          </List>
        </Collapse>
      </List>

      <List
        subheader={
          <ListSubheader component="div" className={classes.listHeader}>
            General
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon className={classes.navIcon}>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            classes={{ primary: classes.listText }}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon className={classes.navIcon}>
            <BusinessOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Company"
            classes={{ primary: classes.listText }}
          />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="drawer nav">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <ThemeProvider theme={theme}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </ThemeProvider>
    </nav>
  );
}

export default NavigationDrawer;
