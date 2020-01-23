import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer,
    List,
    ListItem, 
    ListItemIcon,
    ListItemText, 
  } from '@material-ui/core';
//   import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

 const SideBar = (props)=> {
        const classes = useStyles();
        // const theme = useTheme();
         return(
            <Drawer
        // style={{
        // position: 'fixed'}}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </div>
        {/* <Divider /> */}
        <List>
            <ListItem button>
              <ListItemIcon><a href="/dashboard"><DashboardIcon/></a></ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
        </List>
        {/* <Divider /> */}
        <List>
            <ListItem button>
              <ListItemIcon><a href="/users"><PeopleIcon/></a></ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><a href="/posts"><PostAddIcon/></a></ListItemIcon>
              <ListItemText primary={'Posts'} />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><a href="/posts"><PostAddIcon/></a></ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItem>
        </List>
      </Drawer>
         );
     }

     export default SideBar;
  