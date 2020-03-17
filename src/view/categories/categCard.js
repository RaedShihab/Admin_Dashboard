import React from 'react';
import {compose} from 'redux'
import { withTranslation } from "react-i18next";
import {connect} from 'react-redux';
import {deletecategories} from '../../auth/Actions/deleteCategoriesAction'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
  IconButton,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Tooltip,
  CircularProgress,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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
  title: {
    fontWeight: 'bold'
  },
  link:{
    margin: '0px 20px', textDecoration: 'none', color: 'black'
  }
}));
const idsArray = [];

const ProductCard = props => {
  const { className, product, t, ...rest } = props;
  const [openSnackSucc, setOpenSuccess] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const [softDeliting, setSoftDeliting] = React.useState(false);
  const [forceDeliting, setForceDeliting] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
    setOpenSuccess(false)
  };

  const classes = useStyles();
  const handleCheckBox = (e)=> {

    let index

    if(e.target.checked) {
      idsArray.push(e.target.value)
    }
    else {
      index = idsArray.indexOf(e.target.value)
      idsArray.splice(index, 1)
    }
    props.deleteCategories(idsArray, e.target.checked)
    
  }
  
  const deleteCategory = (id)=> {
    setSoftDeliting(true)
    console.log('/categories/'+id+'/soft')
    Axios.delete('/categories/'+id+'/soft')
    .then(res=> {
      if(res.status === 200) {
        console.log(res)
        setSoftDeliting(false)
        setOpenSuccess(true)
      window.location.reload(false)
      }
    })
    .catch(err=> {
      setOpenErr(true)
      setSoftDeliting(false)
      console.log(err.response)
    })
  }
  const forceDeleteCategory = (id)=> {
    setForceDeliting(true)
    console.log('/categories/'+id+'/soft')
    Axios.delete('/categories/'+id+'/soft').then(res=> {
      console.log(res)
      setForceDeliting(false)
      setOpenSuccess(true)
      window.location.reload(false)
    })
    .catch(err=> {
      setForceDeliting(false)
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
    <FormControlLabel
         onChange={handleCheckBox}
          value={product.id}
          control={<Checkbox color="primary" />}
          // label="Top"
          // labelPlacement="top"
        />
        <Link
          className={classes.link}
          to={{
            pathname: '/categories/category/'+product.id,
            state: {
            data: product
            }
        }}
          >
            <div className={classes.imageContainer}>
        <img
          alt="Product"
          className={classes.image}
          src={product.icon}
        />
      </div>
         <p
        align="center"
        className={classes.title}
      >
        {product.name.en}
      </p>
          </Link>
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
          {softDeliting&& <CircularProgress />}
         {!softDeliting && <Tooltip title={t("soft_delete")}>
          <IconButton
          onClick={()=>deleteCategory(product.id)}
          >
           <DeleteIcon/>
          </IconButton>
          </Tooltip>}

          {forceDeliting&& <CircularProgress />}
         {!forceDeliting && <Tooltip title={t("force_delete")}>
          <IconButton
          onClick={()=>forceDeleteCategory(product.id)}
          >
           <DeleteForeverIcon
           color="secondary"/>
          </IconButton>
          </Tooltip>}
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
          {t("please_try_again")}
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
export default compose(withTranslation(["categories/addUpdate", "countries/validations"]) , connect(mapStateToProps, {deletecategories}))(ProductCard);
