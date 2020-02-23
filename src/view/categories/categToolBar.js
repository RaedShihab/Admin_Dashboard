import React from 'react';
import {compose} from 'redux';
import { withTranslation } from "react-i18next";
import {Snackbar, Button, CircularProgress, IconButton, MenuItem, Menu, FormControlLabel, Checkbox, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MuiAlert from '@material-ui/lab/Alert';
import {Axios} from '../axiosConfig';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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
  search: {
    margin: '0px 15px'
  },
  btn: {
    margin: 10
  },
  filterBtn: {
    margin: '0px 10px'
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosse = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
  ];
  const arr = []
  const handleCheckChange = (e)=> {
    let index
    console.log(e.target.checked)
    if(e.target.checked) {
      arr.push(e.target.value)
    }
    else{
      index = arr.indexOf(e.target.value)
      arr.splice(index, 1)
    }
    console.log(arr)
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >

      <div className={classes.row}>
        <span className={classes.spacer} />


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

        <IconButton className={classes.search}>
           <SearchIcon/>
        </IconButton>

        <PopupState variant="popover" popupId="demo-popup-menu">
        {popupState => (
          <React.Fragment>
            <Tooltip title="filter">
            <IconButton
            className={classes.filterBtn}
            variant="contained" color="primary" {...bindTrigger(popupState)}>
              <FilterListIcon/>
            </IconButton>
            </Tooltip>
            <Menu {...bindMenu(popupState)}>
              <MenuItem 
              // onClick={popupState.close}
              >
              <FormControlLabel
                    control={
                      <Checkbox 
                      // checked={state.checkedA} 
                      onChange={handleCheckChange} 
                      value="is_real_estate" />
                    }
                    label="Real estate"
                  />
              </MenuItem>
              <MenuItem 
              // onClick={popupState.close}
              >
              <FormControlLabel
                    control={
                      <Checkbox 
                      // checked={state.checkedA} 
                      onChange={handleCheckChange} 
                      value="is_parent_category" />
                    }
                    label="Parant Categories"
                  />  
              </MenuItem>
              <Button variant="contained"
              className={classes.filterBtn}
               color="primary">Apply</Button>
            </Menu>
          </React.Fragment>
        )}
    </PopupState>

    <div>
    <Tooltip title="filter by Parent category">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
          <FilterListIcon />
      </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openn}
        onClose={handleClosse}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option} selected={option === 'Pyxis'} 
          onClick={handleClosse}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>

      </div>
      <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {t("the_category_has_deleted_successfuly")}
        </Alert>
      </Snackbar>
      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Plrease Select an item to delete
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
