import React from 'react';
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
  Checkbox
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Axios} from '../axiosConfig';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
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

const ProductCard = props => {
  console.log('render')
  const { className, product, ...rest } = props;
  
  // const [idsArray, setIdsArray] = React.useState([])
  

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
    console.log(id)
    Axios.delete('/categories/'+id+'/soft').then(res=> console.log('res'))
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
          <IconButton
          onClick={()=>deleteCategory(product._id)}
          >
           <DeleteIcon className={classes.statsIcon} />
          </IconButton>
          <Link
          to={{
            pathname: '/categories-list/category/'+product._id,
            state: {
            data: product
            }
        }}
          >
            <EditIcon className={classes.statsIcon} />
          </Link>
          {/* <Typography
            display="inline"
            variant="body2"
          >
            Updated 2hr ago
          </Typography> */}
        </Grid>
      </Grid>
    </CardActions>
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