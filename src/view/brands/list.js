import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, Snackbar, CircularProgress, MenuItem, FormControl, Select } from '@material-ui/core';
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
  const [item, setItem] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5)
  let page = 1;

  const brandsAxios = (page, itemsPerPage)=>
  Axios.get(`/brands`)
  // Axios.get(`/brands/?page=${page}&per_page=${itemsPerPage}`)
  .then(res=>{
    // console.log(res.data.data.map(cat=> cat.parent_id))
    setItem(res.data.data)
    setOpen(false)  
  })
  .catch(err=> {
    console.log(err.response)
    setOpen(false)
    setOpenAlrt(true)
  })
  

  const handelChoose = (e)=> {
    console.log(e.target.value)
    const parentId = e.target.value
    Axios.get(`/categories/${parentId}`)
    .then(res=> {
      console.log(res.data.data.brands)
      setItem(res.data.data.brands)
      setOpen(false)  
      })
      .catch(err=> {
        console.log(err.response)
        setOpen(false)
        setOpenAlrt(true)
      })
  }

  const incrimentPage = ()=> {
    page+=1
    console.log(page, itemsPerPage)
    // brandsAxios(page, itemsPerPage)
  }
  const decrimentPage = ()=> {
    page-=1
    console.log(page, itemsPerPage)
    // brandsAxios(page, itemsPerPage)
  }

  const handleChange = event => {
    setItemsPerPage(event.target.value)
  };

  React.useEffect(() => {
    setOpen(true)
    brandsAxios(page, itemsPerPage)
    
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
      <BrandToolbar 
      handelChoose={handelChoose}
      path={{add:'/brands/create'}} />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {item.map(product => {
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
          <ChevronLeftIcon/>
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
  // }
};

export default ProductList;