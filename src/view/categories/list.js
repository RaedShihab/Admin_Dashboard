import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, Paper, CircularProgress, MenuItem, FormControl, Select } from '@material-ui/core';
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

let page = 1;

const ProductList = () => {
  
  const classes = useStyles();
  const [open, setOpen] = useState();
  const [openAlert, setOpenAlrt] = useState();
  const [categories, setCategories] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [allCtegories, setAllCategories] = useState([])
  const [hidepagination, setHidepagination] = useState(false)
 

  const categoriesAxios = (page, itemsPerPage)=> 
  Axios.get(`/categories/?page=${page}&per_page=${itemsPerPage}`)
  .then(res=>{
    setCategories(res.data.data)
    setOpen(false)  
  })
  .catch(err=> {
    console.log(err)
    setOpen(false)
    setOpenAlrt(true)
  })

  const getAllCategories = ()=>
  Axios.get('/categories')
  .then(res=>{
    setAllCategories(res.data.data)
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
    categoriesAxios(page, itemsPerPage)
  }
  const decrimentPage = ()=> {
    while(page>1) {
      page-=1
    console.log(page, itemsPerPage)
    categoriesAxios(page, itemsPerPage)
    }
  }

  const handleChange = event => {
    setItemsPerPage(event.target.value)
  };
  
  React.useEffect(() => {
    setOpen(true)
    categoriesAxios(page, itemsPerPage)
    getAllCategories()
  }, []);
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlrt(false)
      };

      const handle_select = (e)=> {
        console.log(e.target.value)
        const parentId = e.target.value
        Axios.get(`/categories/${parentId}`)
        .then(res=> {
          console.log(res.data.data.childrens)
          setHidepagination(true)
          setCategories(res.data.data.childrens)
          setOpen(false)  
          })
          .catch(err=> {
            console.log(err.response)
            setOpen(false)
            setOpenAlrt(true)
          })
      }

      const handelchoose = (e)=> {
        console.log(e.target.value)
        const parentId = e.target.value
        Axios.get(`/categories/${parentId}`)
        .then(res=> {
          console.log(res.data.data.childrens)
          setCategories(res.data.data.childrens)
          setOpen(false)  
          })
          .catch(err=> {
            console.log(err.response)
            setOpen(false)
            setOpenAlrt(true)
          })
      }

  return (
      <Layout>
        {open&&<CircularProgress size='100px' style={{display: 'block', margin:'350px 500px'}}/>}
        {!open&&
          <div className={classes.root}>
      <CategToolbar
      categories={allCtegories} 
      handelchoose={handelchoose}
      handle_select={handle_select}
      path={{add:'/categories/create'}} />
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
     {categories.length>0 && !hidepagination && <div className={classes.pagination}>
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
      </div>}
      {
        categories.length === 0 && <div>
          <Paper style={{ textAlign: 'center'}}>
            <Typography variant="h6">No Items Founded</Typography>
            </Paper>
        </div>
      }
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