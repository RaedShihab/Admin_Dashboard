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
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
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
    marginTop: theme.spacing(1),
    width: 700
  },
  row2: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
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
    // margin: '0px 10px'
  },
  grid: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const ProductsToolbar = props => {
  console.log(props.data.deleteCategories[1])
  const checkedCategoriesNumber = props.data.deleteCategories.length
  const {t} = props
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

  const [spacing, setSpacing] = React.useState(2);


  const deleteCategories = ()=> {
    const ids = props.data.deleteCategories[0]
    console.log('/categories/'+ids+'/soft')
    // Axios.delete('/categories')
    setloading(true)
    Axios.delete('/categories/'+ids+'/soft')
    .then(res=> {
      // setOpen(true);
      setloading(false)
      setOpenSuccess(true)
       console.log(res)
       window.location.reload(false)
      })
      .catch(err => {
        console.log(err.response)
        setOpenErr(true)
        setloading(false) 
      })
  }
  const forceDeleteCategories = ()=> {
    const ids = props.data.deleteCategories[0]
    console.log('/categories/'+ids+'/force')
    // Axios.delete('/categories')
    setWaiting(true)
    Axios.delete('/categories/'+ids+'/force')
    .then(res=> {
      // setOpen(true);
      setWaiting(false)
      setOpenSuccess(true)
       console.log(res)
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
      
      <Grid container className={classes.root} spacing={2}>
      {/* <Grid item xs={12}> */}
        <Grid container spacing={4}>
          <Grid item>
          <div className={classes.row2}>
        {/* <span className={classes.spacer} /> */}
        <Button
        className={classes.btn}
        href={props.path.add}
          color="primary"
          variant="contained"
        >
          {t("add_category")}
        </Button>
        {loading&&
      <CircularProgress />}

          {props.data.deleteCategories[1]>0 && <div>
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
    {waiting&&
      <CircularProgress/>}
          </div>}

    {props.data.deleteCategories[1]>0 &&<div>
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
    </div>}
    
      </div>
          </Grid>

          <Grid item>
          <div className={classes.row}>
<SearchInput
  className={classes.searchInput}
  placeholder="Search product"
/>

<Button variant="contained" color="primary">
    search
</Button>

<PopupState variant="popover" popupId="demo-popup-menu">
{popupState => (
  <React.Fragment>
    <Tooltip title="filter">
    <IconButton
    variant="contained" color="primary" {...bindTrigger(popupState)}>
      <FilterListIcon fontSize="large"/>
    </IconButton>
    </Tooltip>
    <Menu {...bindMenu(popupState)}>
      <MenuItem 
      >
      <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <Typography variant="h7">filter</Typography>
          <Tooltip title="filter">
          <IconButton
          variant="contained" color="primary" {...bindTrigger(popupState)}>
      <FilterListIcon/>
    </IconButton>
    </Tooltip>
    <Menu {...bindMenu(popupState)}>
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
    </Menu>
  </React.Fragment>
)}
</PopupState>
      </MenuItem>
      <MenuItem 
      >
    <React.Fragment>
      <Typography variant="h7">filter</Typography>
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
        open={openMenueList}
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
    </React.Fragment>
      </MenuItem>
    </Menu>
  </React.Fragment>
)}
</PopupState>
</div>
          </Grid>
        </Grid>

      </Grid>
    {/* </Grid> */}

      <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {t("the_category_has_deleted_successfuly")}
        </Alert>
      </Snackbar>
      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {("please_select_item_to_delete")}
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
