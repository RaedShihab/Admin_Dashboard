import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, Paper, CircularProgress, MenuItem, FormControl, Select } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Axios} from '../../axiosConfig';
import Toolbar from './toolBar';
import Card from './card'
import Layout from '../../../layOut';

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

let page = 1;

const ProductList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState();
  const [openAlert, setOpenAlrt] = useState();
  const [packages, setPackages] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const packagesAxios = (page, itemsPerPage)=> 
  Axios.get(`/ads/packages?page=${page}&per_page=${itemsPerPage}`)
  .then(res=>{
    console.log(res)
    setPackages(res.data.data)
    setOpen(false)  
  })
  .catch(err=> {
    console.log(err)
    setOpen(false)
    setOpenAlrt(true)
  })

  
  React.useEffect(() => {
    setOpen(true)
    packagesAxios(page, itemsPerPage)
  }, []);
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlrt(false)
      };

  return (
      <Layout>
        {open&&<CircularProgress size='100px' style={{display: 'block', margin:'350px 500px'}}/>}
        {!open&&
          <div className={classes.root}>
      <Toolbar
      path={{add:'/packages/create'}} />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {packages.map(product => {
            return <Grid
              item
              key={product.id}
              lg={3}
              md={6}
              xs={12}
            >
                <Card product={product} />
            </Grid>
          })}
        </Grid>
      </div>
    </div>}
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert style={{backgroundColor: 'red', color: 'white'}} onClose={handleClose} severity="error">
                Somthing went wrong please refresh the page or check enternet connection..
            </Alert>
        </Snackbar>
      </Layout>
  );
};
export default ProductList;