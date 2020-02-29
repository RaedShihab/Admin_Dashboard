import React from 'react';
import {compose} from 'redux';
import { withTranslation } from "react-i18next";
import {Snackbar, Button, CircularProgress, IconButton, MenuItem, Menu, FormControlLabel, Checkbox, Tooltip, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MuiAlert from '@material-ui/lab/Alert';
import {Axios} from '../axiosConfig';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
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
  },
  option: {
    cursor: 'pointer', textAlign: 'center', margin: '10px 0px'
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
  const [categories, setCategories] = React.useState([]);

  const categoriesAxios = (page, itemsPerPage)=> 
  Axios.get(`/categories`)
  // Axios.get(`/categories/?page=${page}&per_page=${itemsPerPage}`)
  .then(res=>{
    console.log(res.data.data)
    setCategories(res.data.data)
    // setOpen(false)  
  })
  .catch(err=> {
    console.log(err.response)
    // setOpen(false)
    // setOpenAlrt(true)
  })

  React.useEffect(() => {
    // setOpen(true)
    categoriesAxios()
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErr(false);
    setOpenSuccess(false)
  };

  const softDelete = ()=> {
    const ids = props.data.deleteCategories
    console.log('/brands/'+ids+'/force')
    // Axios.delete('/categories')
    setloading(true)
    Axios.delete('/brands/'+ids+'/force')
    .then(res=> {
      // setOpen(true);
      console.log(res)
      setloading(false)
      setOpenSuccess(true)
      window.location.reload(false)
      })
      .catch(err => {
        console.log(err.response)
        setOpenErr(true)
        setloading(false) 
      })
  }
  const forceDelete = ()=> {
    const ids = props.data.deleteCategories
    console.log('/brands/'+ids+'/force')
    // Axios.delete('/categories')
    setWaiting(true)
    Axios.delete('/brands/'+ids+'/force')
    .then(res=> {
      // setOpen(true);
      console.log(res)
      setWaiting(false)
      setOpenSuccess(true)
      window.location.reload(false)
      })
      .catch(err => {
        console.log(err.response)
        setOpenErr(true)
        setWaiting(false)
      })
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenueList = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosse = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  const options = [
    'Category',
    'Category',
    'Category',
    'Category',
    'Category',
    'Category',
    'Category',
    'Category',
  ];
  const filteredData = []
  const handleCheckChange = (e)=> {
    let index
    console.log(e.target.checked)
    if(e.target.checked) {
      filteredData.push(e.target.value)
    }
    else{
      index = filteredData.indexOf(e.target.value)
      filteredData.splice(index, 1)
    }
    console.log(filteredData)
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
    <Tooltip title={t("categories/addUpdate:soft_delete")}>
      <IconButton onClick={softDelete}>
      <DeleteIcon
          color="primary"
          variant="contained"
        />
    </IconButton>
    </Tooltip>
    }

        {waiting&&<div >
      <CircularProgress/>
    </div>}
    {!waiting&&
    <Tooltip title={t("categories/addUpdate:force_delete")}>
      <IconButton onClick={forceDelete}>
      <DeleteForeverIcon
          color="secondary"
          variant="contained"
        />
    </IconButton>
    </Tooltip>
    }

        <Button
        className={classes.btn}
        href={props.path.add}
          color="primary"
          variant="contained"
        >
          {t("add_brand")}
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
            variant="contained" color="primary" {...bindTrigger(popupState)}>
              <FilterListIcon/>
            </IconButton>
            </Tooltip>
            <Menu {...bindMenu(popupState)}>
              <MenuItem 
              >
              <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <React.Fragment>
                  {/* <Typography variant="h7">filter</Typography>
                  <Tooltip title="filter">
                  <IconButton
                  variant="contained" color="primary" {...bindTrigger(popupState)}>
              <FilterListIcon/>
            </IconButton>
            </Tooltip> */}
            {/* <Menu {...bindMenu(popupState)}>
              <MenuItem 
              >
              <FormControlLabel
                    control={
                      <Checkbox 
                      onChange={handleCheckChange} 
                      value="is_real_estate" />
                    }
                    label="Real estate"
                  />
              </MenuItem>
              <MenuItem 
              >
              <FormControlLabel
                    control={
                      <Checkbox 
                      onChange={handleCheckChange} 
                      value="is_parent_category" />
                    }
                    label="Parant Categories"
                  />  
              </MenuItem>
              <Button variant="contained"
              className={classes.filterBtn}
               color="primary">Apply</Button>
            </Menu> */}
          </React.Fragment>
        )}
    </PopupState>
              </MenuItem>
              <MenuItem 
              >
            <React.Fragment>
              <Typography variant="h7">filter</Typography>
            <Tooltip title="filter by category">
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
              onClick={props.handelChoose}
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openMenueList}
                onClose={handleClosse}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                {categories.map(option => (
                  <option 
                  className={classes.option}
                  value={option.id}
                  // key={option} selected={option === 'Pyxis'} 
                  onClick={handleClosse}
                  >
                    {option.name.en}
                  </option>
                ))}
              </Menu>
            </React.Fragment>
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
    </PopupState>
      </div>
      <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {t("the_category_has_deleted_successfuly")}
        </Alert>
      </Snackbar>
      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {t("please_select_item_to_delete")}
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
      {t("the_items_has_deleted_successfuly")}
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

export default compose(withTranslation(["brand/brand", "categories/addUpdate"]) , connect(mapStateToProps))(ProductsToolbar);
