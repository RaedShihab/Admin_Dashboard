import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, CircularProgress, MenuItem, FormControl, Select } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Axios} from '../axiosConfig';
import CategToolbar from './categToolBar';
import CategCard from './categCard'
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
  const [itemsPerPage, setItemsPerPage] = useState(5)
  
  let page = 1;

  const categoriesAxios = (page, itemsPerPage)=> 
  Axios.get(`/categories`)
  // Axios.get(`/categories/?page=${page}&per_page=${itemsPerPage}`)
  .then(res=>{
    // console.log(res.data.data.map(cat=> cat.parent_id))
    setCategories(res.data.data)
    setOpen(false)  
  })
  .catch(err=> {
    console.log(err.response)
    setOpen(false)
    setOpenAlrt(true)
  })

  const incrimentPage = ()=> {
    page+=1
    console.log(page, itemsPerPage)
    // categoriesAxios(page, itemsPerPage)
  }
  const decrimentPage = ()=> {
    page-=1
    console.log(page, itemsPerPage)
    // categoriesAxios(page, itemsPerPage)
  }

  const handleChange = event => {
    setItemsPerPage(event.target.value)
  };
  
  React.useEffect(() => {
    setOpen(true)
    categoriesAxios(page, itemsPerPage)
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
      <CategToolbar path={{add:'/categories/create'}} />
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
                <CategCard product={product} />
            </Grid>
          })}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">
        <FormControl variant="filled" className={classes.formControl}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={itemsPerPage}
          onChange={handleChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
      </FormControl>
        </Typography>
        <IconButton onClick={decrimentPage}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={incrimentPage}>
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
};
export default ProductList;