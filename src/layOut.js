import React, {useState } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import SideBar from './sideBar';
import {TextAlignAction} from './auth/Actions/textAlignAction';
import { makeStyles } from '@material-ui/core/styles';
import { 
        AppBar,
        Toolbar,
        CssBaseline,
        Typography,
        IconButton, 
      } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

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
  group: {
    display: 'inline-block',
    marginLeft: 90,
  }
}));

 function LayOut(props) {
  const classes = useStyles();
  const [value, setValue] = useState({
    lang: "en"
  })
  const goRtl = () => {
    let newRtl = rtl.direction === "ltr" ? "rtl" : "ltr";
    setRtl({
      direction: newRtl
    });
    let newTheme = theme1.direction === "ltr" ? "rtl" : "ltr";
    setTheme({
      direction: newTheme
    });
    let newLogoutPos = logOutIconPos.right === 0 ? '93%' : 0;    
    setLogOutIconPos({
      right: newLogoutPos
    });
    let newlang = value.lang === 'ar' ? 'en' : 'ar';    
    setValue({
      lang: newlang
    });
    props.i18n.changeLanguage(newlang);
    props.TextAlignAction(props.data.reducer[0])
  };
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    if(open)  {setOpen(false);}
    else {setOpen(true);}
  };
  const [rtl, setRtl] = useState({
   direction: 'ltr'
  });
  const [logOutIconPos, setLogOutIconPos] = useState({
    right: 0
   });

  const [theme1, setTheme] = useState({
    direction: 'ltr',
  });
  const themee1 = createMuiTheme(theme1)
  return (
    <div dir={rtl.direction}>
    <ThemeProvider theme={themee1}>
        <div className={classes.root}>
      <CssBaseline />
      <AppBar
      style={{width: '100%'}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"            
            edge="start"
          >
            <MenuIcon
            onClick={handleDrawerOpen}
            />
          </IconButton>
          <IconButton
            style={{margin: 10}}
            color="inherit"
            aria-label="open drawer"
            onClick={goRtl}
            edge="start"
          >
            <LanguageIcon />
          </IconButton>
          <Typography stayle={{marginLeft: 10}} variant="h6" noWrap>
            {props.t("admin_dashboard")}
          </Typography>
          <IconButton
          style={{position: 'absolute', right: logOutIconPos.right}}
            color="inherit"
            aria-label="open drawer"            
            edge="start"
          >
            <Link style={{color: 'white'}} to="/login"><ExitToAppIcon/></Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideBar open={open}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          {props.children}
        </Typography>
      </main>
    </div>
    </ThemeProvider>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    data: state
  }
}
export default compose(
  withTranslation('translation'),
  connect(mapStateToProps, {TextAlignAction})
)(LayOut);














