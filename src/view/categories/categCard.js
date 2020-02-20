import React from 'react';
import ReactHtmlParser from "react-html-parser";
import {connect} from 'react-redux';
import {deleteCategoriesAction} from '../../auth/Actions/deleteCategoriesAction'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  IconButton,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Tooltip
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Axios} from '../axiosConfig';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 100,
    width: 100,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));
const idsArray = [];

function unescapeHTML(html) {
  var escapeEl = document.createElement("textarea");
  escapeEl.innerHTML = html;
  return escapeEl.textContent;
}

const ProductCard = props => {
  // console.log('render')
  const { className, product, ...rest } = props;

  const [openSnackSucc, setOpenSuccess] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const [open404, setOpen404] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
    setOpenSuccess(false)
  };

  const classes = useStyles();
  const handleCheckBox = (e)=> {

    // const options = idsArray
    let index

    if(e.target.checked) {
      idsArray.push(e.target.value)
    }
    else {
      index = idsArray.indexOf(e.target.value)
      idsArray.splice(index, 1)
    }
    console.log(idsArray)
    props.deleteCategoriesAction(idsArray)
    // setIdsArray(options)
    
  }
  
  const deleteCategory = (id)=> {
    console.log('/categories/'+id+'/soft')
    Axios.delete('/categories/'+id+'/soft')
    .then(res=> {
      if(res.status === 200) {
        console.log(res)
        setOpenSuccess(true)
      setTimeout(()=>window.location.reload(false), 1500);
      }
    })
    .catch(err=> {
      setOpen404(true)
      console.log(err.response)
    })
  }
  const forceDeleteCategory = (id)=> {
    console.log('/categories/'+id+'/soft')
    Axios.delete('/categories/'+id+'/soft').then(res=> {
      console.log(res)
      setOpenSuccess(true)
      setTimeout(()=>window.location.reload(false), 1500);
    })
    .catch(err=> {
      setOpenErr(true)
      console.log(err.response)
    })
  }

  return (
    <Card
    {...rest}
    className={clsx(classes.root, className)}
  >
    <CardContent>
      {/* <IconButton onClick={deleteCategories}>
      <DeleteIcon/>
    </IconButton> */}
    <FormControlLabel
         onChange={handleCheckBox}
          value={product._id}
          control={<Checkbox color="primary" />}
          // label="Top"
          // labelPlacement="top"
        />
      <div className={classes.imageContainer}>
        <img
          alt="Product"
          className={classes.image}
          src={product.icon}
        />
        <div >
        {/* {
         ReactHtmlParser(unescapeHTML(product.icon))
      } */}
        </div>
      </div>
      <Typography
        align="center"
        gutterBottom
        variant="h6"
      >
        {product.name.en}
      </Typography>
      <Typography
        align="center"
        variant="body1"
      >
        {product._id}
      </Typography>
    </CardContent>
    <Divider />
    <CardActions>
      <Grid
        container
        justify="space-between"
      >
        <Grid
          className={classes.statsItem}
          item
        >
          <Tooltip title={"Soft Delete"}>
          <IconButton
          onClick={()=>deleteCategory(product._id)}
          >
           <DeleteIcon className={classes.statsIcon} />
          </IconButton>
          </Tooltip>
          <Tooltip title={"Force Delete"}>
          <IconButton
          onClick={()=>forceDeleteCategory(product._id)}
          >
           <DeleteForeverIcon
           color="secondary"
           className={classes.statsIcon} />
          </IconButton>
          </Tooltip>
          <Tooltip title={"Edit"}>
          <Link
          style={{margin: '0px 20px'}}
          to={{
            pathname: '/categories-list/category/'+product._id,
            state: {
            data: product
            }
        }}
          >
            <EditIcon className={classes.statsIcon} />
          </Link>
          </Tooltip>
          {/* <Typography
            display="inline"
            variant="body2"
          >
            Updated 2hr ago
          </Typography> */}
        </Grid>
      </Grid>
    </CardActions>
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
  <Snackbar
  
  open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert
        style={{backgroundColor: 'red', color: 'white'}}
        onClose={handleClose} severity="error">
          Somthing went wrong please try again!
        </Alert>
      </Snackbar>
  </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    data: state
  }
}
export default connect(mapStateToProps, {deleteCategoriesAction})(ProductCard);