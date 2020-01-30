import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Delete from './delete';
import axios from 'axios'
import { DialogTitle, Dialog, Snackbar, CircularProgress} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const[openDialog, setOpenDialog] = React.useState({
    open: false
  })
  const[openSnack, setOpenSnak] = React.useState({
    snack: false
  })
  const[openSnackErr, setOpenSnakErr] = React.useState({
    snack: false
  })
  const [showLoading, setShowLoading] = React.useState({
    value: false
  })
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setOpenSnakErr({snack: true})
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
 
  const handleDialogOpen = () => {
    if(openDialog.open)  {setOpenDialog({open:false});}
    else {setOpenDialog({open:true});}
  };

  const deletee = ()=> {
    setShowLoading({
      value: true
    })
    axios.delete(+props.data.code.phone, {id: props.data.phone})
      .then(res => {
        console.log('res',res)
        setOpenSnak({snack: true})
        setShowLoading({
          value: false
        })
        setOpenDialog({
          open: false
        })
      }
      )
      .catch(err =>{  
        console.error(err)
        setOpenSnakErr({snack: true})
        setShowLoading({
          value: false
        })
      })
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnak({snack: false})
    setOpenSnakErr({snack: false})
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Snackbar open={openSnack.snack} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert 
        style={{backgroundColor: 'green', color: 'white'}}
        onClose={handleCloseAlert} severity="success">
          Deleted Successfuly
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackErr.snack} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert 
        severity="error"
        style={{backgroundColor: 'red', color: 'white'}}
        onClose={handleCloseAlert}>
          Please Try Again
        </Alert>
      </Snackbar>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Edit/Delete
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener>
                  <MenuList style={{backgroundColor: 'black'}} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem style={{color: 'white'}} onClick={handleClose}>
                        <Link
                        style={{color: 'white', textDecoration: 'none'}}
                        to={{
                        pathname: props.path +props.data.code,
                             }}>
                        Edit
                        </Link>
                        </MenuItem>
                    <MenuItem style={{color: 'white'}}>
                      <Button style={{color: 'white'}} onClick={handleDialogOpen}>
                        Delete
                      </Button>
                        <Dialog
                      onEnter={console.log('Hey.')}
                      open={openDialog.open}
                    >
                      <DialogTitle>
                        {("are_you_sure_delete_country")}</DialogTitle>
                        <Button 
                         style={{backgroundColor:'red', color: 'white', marginBottom: 3}}
                         variant="contained"
                        onClick={deletee}>
                          {!showLoading.value&&('delete')} 
                            {showLoading.value && <CircularProgress
                              color="inherit"
                              size={23}
                            />}
                        </Button>
                        <Button
                         color="primary"
                         variant="contained"
                        onClick={handleDialogOpen}>cancel</Button>
                      </Dialog>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}