import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withTranslation } from "react-i18next";

import { Drawer,
    List,
    ListItem, 
    ListItemIcon,
    ListItemText, 
  } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';

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
    roott: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
 const SideBar = (props)=> {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

        const classes = useStyles();
        const {t} = props;
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
        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
      className={classes.roott}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="categories list" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
            <ListItemIcon>
              <a href='/categories'>
              <CategoryIcon />
              </a>
            </ListItemIcon>
            <ListItemText primary="Main cagtegoris" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <a href='/brands'>
              <EmojiTransportationIcon />
              </a>
            </ListItemIcon>
            <ListItemText primary="Brands"/>
          </ListItem>
        </List>
      </Collapse>
    </List>
        <List>
            <ListItem button>
              <ListItemIcon><a href="/"><DashboardIcon/></a></ListItemIcon>
              <ListItemText primary={t('dashboard')} />
            </ListItem>
        </List>
        {/* <Divider /> */}
        <List>
            <ListItem button>
              <ListItemIcon><a href="/users"><PeopleIcon/></a></ListItemIcon>
              <ListItemText primary={t('users')} />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><a href="/posts"><PostAddIcon/></a></ListItemIcon>
              <ListItemText primary={t('posts')} />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><a href="/posts"><PostAddIcon/></a></ListItemIcon>
              <ListItemText primary={t('users')} />
            </ListItem>
        </List>
      </Drawer>
         );
     }

     export default (withTranslation("sideBar/sideBar")(SideBar));