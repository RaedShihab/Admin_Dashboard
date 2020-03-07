import React from 'react';
import {compose} from 'redux';
import { withTranslation } from "react-i18next";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Snackbar, Button, CircularProgress,TextField, 
  Avatar,IconButton, MenuItem, Menu, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MuiAlert from '@material-ui/lab/Alert';
import {Axios} from '../axiosConfig';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FilterListIcon from '@material-ui/icons/FilterList';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
  //   width: '100%',
  //   '& > * + *': {
  //     marginTop: theme.spacing(2),
  // },
  flexGrow: 1,
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
    margin: '0 10px',
    padding: 15
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
  option: {
    cursor: 'pointer', textAlign: 'center', margin: '10px 0px'
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 80,
    width: 200
  },
}));

const ProductsToolbar = props => {
  const {t, handelSearchField, submitSearchTerms, searchTerms} = props
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
  const {categories} = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
    setOpenSuccess(false)
  };

  // const [spacing, setSpacing] = React.useState(2);
  const deleteCategories = ()=> {
    const ids = props.data.deleteCategories[0]
    console.log('/categories/'+ids+'/soft')
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
      // className={clsx(classes.root, className)}
    >
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container 
        justify="center"
         spacing={6}
         >
            <Grid  item>
              <TextField
              onChange={handelSearchField}
              variant='filled'
              placeholder={'search by category'}/>
              <Button
              onClick={()=>submitSearchTerms(searchTerms)}
              className={classes.btn}
              color="primary"
              variant="contained">search</Button>
            </Grid>
            <Grid item>
            
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={""}
          onChange={props.handleParentCategorySelect}
        >
          {
            categories.map(category => {
            return <MenuItem value={category.id}>{category.name.en}</MenuItem>
            })
          }
        </Select>
      </FormControl>
            </Grid>
            <Grid item>
            <div className={classes.row2}>
  {/* <span className={classes.spacer} /> */}
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
            <Grid className={classes.paper4}  item>
            {/* <div className={classes.paper3} > */}
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
      <React.Fragment>
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
              onClick={props.handelChoose}
                id="long-menu"
                anchorEl={anchorEl}
                // keepMounted
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
                  // key={option} 
                  // selected={option === 'Pyxis'} 
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
        
            <IconButton href={'/brands/create'}>
            <Avatar>
                <AddIcon/>
                </Avatar>
              </IconButton>
              </Grid>
        </Grid>
      </Grid>
    </Grid>

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
