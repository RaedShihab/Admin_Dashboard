import React from 'react';
import {Snackbar, Button, CircularProgress} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {Axios} from '../axiosConfig';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import SearchInput from './searchInput';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
  },
},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  btn: {
    margin: 10
  }
}));

const ProductsToolbar = props => {
  console.log(props)
  const Alert = (props)=> {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const { className, ...rest } = props;
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const [openSnackSucc, setOpenSuccess] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErr(false);
    setOpenSuccess(false)
  };

  const deleteCategories = ()=> {
    const ids = props.data.deleteCategories
    console.log('/categories/'+ids+'/force')
    // Axios.delete('/categories')
    setloading(true)
    Axios.delete('/categories/'+ids+'/force')
    .then(res=> {
      // setOpen(true);
      setloading(false)
      setOpenSuccess(true)
       console.log(res)
      })
      .catch(err => {
        setOpenErr(true)
        setloading(false) 
      })
  }
  const forceDeleteCategories = ()=> {
    const ids = props.data.deleteCategories
    console.log('/categories/'+ids+'/force')
    // Axios.delete('/categories')
    setWaiting(true)
    Axios.delete('/categories/'+ids+'/force')
    .then(res=> {
      // setOpen(true);
      setWaiting(false)
      setOpenSuccess(true)
       console.log(res)
      })
      .catch(err => {
        setOpenErr(true)
        setWaiting(false) 
      })
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >

      <div className={classes.row}>
        <span className={classes.spacer} />

        {/* {props.data.deleteCategories.length>0&&<React.Fragment> */}
        {loading&&<div >
      <CircularProgress />
    </div>}
    {!loading&&<Button
        onClick={deleteCategories}
          color="primary"
          variant="contained"
        >
          delete
        </Button>}

        {waiting&&<div >
      <CircularProgress style={{margin: '0px 45px'}}/>
    </div>}
    {!waiting&&<Button
        onClick={forceDeleteCategories}
          color="secondary"
          variant="contained"
        >
          force delete
        </Button>}
        {/* </React.Fragment>} */}
        
        


        <Button
        className={classes.btn}
        href={props.path.add}
          color="primary"
          variant="contained"
        >
          Add category
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
        />
      </div>
      <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          This is an error message!
        </Alert>
      </Snackbar>
      <Snackbar
      autoHideDuration={3000}
      onClose={handleClose}
      open={openSnackSucc}
  >
      <Alert
      onClose={handleClose}
      severity="success"
      style={{backgroundColor: 'green', color: 'white'}}
      >
      The items has deleted successfuly
      </Alert>
  </Snackbar>
    </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};
function mapStateToProps(state) {
  return {
    data: state
  }
}
export default connect(mapStateToProps)(ProductsToolbar);