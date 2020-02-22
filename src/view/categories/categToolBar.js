import React from 'react';
import {compose} from 'redux';
import { withTranslation } from "react-i18next";
import {Snackbar, Button, CircularProgress, IconButton, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
  const checkedCategoriesNumber = props.data.deleteCategories.length
  const {t} = props
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
        {/* {checkedCategoriesNumber>0 &&<div> */}
        {loading&&<div >
      <CircularProgress />
    </div>}
    {!loading&&
    <Tooltip title={t("soft_delete")}>
      <IconButton onClick={deleteCategories}>
      <DeleteIcon
          color="primary"
          variant="contained"
        >
          delete
        </DeleteIcon>
    </IconButton>
    </Tooltip>
    }
        {/* </div>} */}

       {/* {checkedCategoriesNumber>0 && <div> */}
        {waiting&&<div >
      <CircularProgress/>
    </div>}
    {!waiting&&
    <Tooltip title={t("force_delete")}>
      <IconButton onClick={forceDeleteCategories}>
      <DeleteForeverIcon
          color="secondary"
          variant="contained"
        >
          force delete
        </DeleteForeverIcon>
    </IconButton>
    </Tooltip>
    }
        {/* </div>} */}
        {/* </React.Fragment>} */}
        <Button
        className={classes.btn}
        href={props.path.add}
          color="primary"
          variant="contained"
        >
          {t("add_category")}
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
          {t("the_category_has_deleted_successfuly")}
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

export default compose(withTranslation(["categories/addUpdate", "countries/validations"]) , connect(mapStateToProps))(ProductsToolbar);
