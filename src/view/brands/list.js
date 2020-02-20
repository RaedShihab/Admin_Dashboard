import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, Snackbar, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Axios} from '../axiosConfig';
import BrandToolbar from './brandToolBar';
import BrandCard from './brandCard';
import Layout from '../../layOut';

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
  const [open, setOpen] = useState();
  const [openAlert, setOpenAlrt] = useState();
  const [categories, setCategories] = useState([]);
  // const [isfetching, setisfetching] = useState(true);

  React.useEffect(() => {
    setOpen(true)
    Axios.get('/brands')
    .then(res=> {
      setCategories(res.data.data)
      setOpen(false)
    })
    .catch(err=> {
      setOpen(false)
      setOpenAlrt(true)
    })
  }
  , []);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlrt(false)
      };
  console.log(categories)
  // if(isfetching) {
  //  return <div>
  //     lkkk
  //   </div>
  // }
  // else {
    return (
      <Layout>
        {open&&<CircularProgress size='100px' style={{display: 'block', margin:'350px 500px'}}/>}
        {!open&&
          <div className={classes.root}>
      <BrandToolbar path={{add:'/brands-list/add-category'}} />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {categories.map(product => {
            return <Grid
              item
              key={product.id}
              lg={3}
              md={6}
              xs={12}
            >
                <BrandCard product={product} />
            </Grid>
          })}
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
    </div>}
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert style={{backgroundColor: 'red', color: 'white'}} onClose={handleClose} severity="error">
                Somthing went wrong please refresh the page or check enternet connection..
            </Alert>
        </Snackbar>
      </Layout>
  );
  // }
};

export default ProductList;