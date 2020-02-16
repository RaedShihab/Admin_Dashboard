import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Axios} from '../axiosConfig';
import CategToolbar from './categToolBar';
import CategCard from './categCard'
import Layout from '../../layOut';
import ApiService from '../../services/apis';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  React.useEffect(() => {
    Axios.get('/categories').then(res=> setCategories(res.data.data))
  }
  // ApiService.fetchCategories().then(res=> setCategories(res)), []
  , []);
  
  // console.log(categories)
  return (
      <Layout>
          <div className={classes.root}>
      <CategToolbar path={{add:'/categories-list/add-category'}} />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {categories.map(product => (
            <Grid
              item
              key={product.id}
              lg={4}
              md={6}
              xs={12}
            >
                <CategCard product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
      </Layout>
  );
};

export default ProductList;