import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withTranslation } from "react-i18next";

import { Drawer,
    List,
    ListItem, 
    ListItemIcon,
    ListItemText,
    Tooltip
  } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';
import ExtensionIcon from '@material-ui/icons/Extension';
import FlagIcon from '@material-ui/icons/Flag';
import PlaceIcon from '@material-ui/icons/Place';
import PublicIcon from '@material-ui/icons/Public';
import SpeedIcon from '@material-ui/icons/Speed';

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
    link:{
      textDecoration: 'none', color: 'black'
    }
  }));
 const SideBar = (props)=> {

  const [open, setOpen] = React.useState(false);
  const [openCountries, setOpenCountries] = React.useState(false);
  const [openAdsList, setOpenAdsList] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickCountries = () => {
    setOpenCountries(!openCountries);
  };
  const handleClickAds = () => {
    setOpenAdsList(!openAdsList);
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
      <List component="div" disablePadding>
        <a className={classes.link} href="/">
            <ListItem button>
              <ListItemIcon>
                <Tooltip title={t("dashboard")}>
                <DashboardIcon color="primary"/>
                </Tooltip>
                </ListItemIcon>
              <ListItemText primary={t('dashboard')} />
            </ListItem>
        </a>
        </List>

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
        <Tooltip title={t("categories")}>
          {open ? <ExpandMore /> : <CategoryIcon color="primary"/>}
        </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <a className={classes.link} href='/categories'>
        <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Tooltip title={t("categories")}>
              <CategoryIcon color="action"/>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Main cagtegoris" />
          </ListItem>
        </a> 
        <a className={classes.link} href='/brands'>
        <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Tooltip title={t("brands")}>
              <EmojiTransportationIcon color="action"/>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Brands"/>
          </ListItem>
        </a>
        <a className={classes.link} href='/models'>
        <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Tooltip title={t("models")}>
              <ExtensionIcon color="action"/>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Models"/>
          </ListItem>
        </a>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickCountries}>
        <ListItemIcon>
          <Tooltip title={t("locations")}>
          {openCountries ? <ExpandMore /> : <PublicIcon color="primary"/>}
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Countries" />
      </ListItem>
      <Collapse in={openCountries} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <a className={classes.link} href='/countries'>
        <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Tooltip title={t("countries")}>
              <FlagIcon color="action"/>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Main Countries" />
          </ListItem>
        </a>
          <a className={classes.link} href='/cities'>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
            <Tooltip title={t("cities")}>
             <EmojiTransportationIcon color="action"/>
            </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Cities"/>
          </ListItem>
          </a>
          <a className={classes.link} href='/districts'>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
            <Tooltip title={t("districts")}>
            <PlaceIcon color="action"/>
            </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Districts"/>
          </ListItem>
          </a>
        </List>
      </Collapse>

    </List>
        {/* <Divider /> */}
        {/* <List component="div" disablePadding>
        <a className={classes.link} href='/users'>
        <ListItem button>
              <ListItemIcon>
                <Tooltip title={t("users")}>
                <PeopleIcon color="primary"/>
                </Tooltip>
                </ListItemIcon>
              <ListItemText primary={t('users')} />
            </ListItem>
        </a>
        </List> */}
        <ListItem button onClick={handleClickAds}>
        <ListItemIcon>
        <Tooltip title={t("Ads")}>
          {openAdsList ? <ExpandMore /> : <PostAddIcon color="primary"/>}
        </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      <Collapse in={openAdsList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <a className={classes.link} href='/ads'>
        <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Tooltip title={t("Ads")}>
              <PostAddIcon color="action"/>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Main cagtegoris" />
          </ListItem>
        </a> 
        <a className={classes.link} href='/packages'>
        <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Tooltip title={t("Packages")}>
              <SpeedIcon color="action"/>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Brands"/>
          </ListItem>
        </a>
        </List>
      </Collapse>
        
      </Drawer>
         );
     }

     export default (withTranslation("sideBar/sideBar")(SideBar));