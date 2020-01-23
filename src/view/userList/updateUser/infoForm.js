/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React from 'react';
import {TextField,Button, Grid, Snackbar, CircularProgress, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayOut from '../../../layOut'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validationSchema = Yup.object().shape({
  name: Yup.string('Enter a name').required('Name is required'),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone Number is required'),
  location: Yup.string('Enter your adress').required('The address is required'),
});

class InfoForm extends React.Component {
  constructor(props) {
    console.log(props.history.location.state.user)
    super(props);
    this.state = {
      user: props.history.location.state.user,
      openSnackSucc: false,
      showLoading: false,
      openSnackErr: false
    };
  }
   handleClose = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
     this.setState({
       openSnackSucc: false,
       openSnackErr:false
     })
   };

   render() {
     console.log('llll',this.props)
     return (
       <div>
         <Formik
           initialValues={{
             name: '',
             email:'',
             phone:'',
             location:''
           }}
           onSubmit = {
             values=> {
               this.setState({
                 showLoading:true
               })
               axios.post('https://jsonplaceholder.typicode.com/users', values)
                 .then(res =>{
                   console.log(res)
                   this.setState({
                     showLoading: false,
                     openSnackSucc: true,
                   })
                 })
                 .catch(err => {
                   console.log(err)
                   this.setState({
                     openSnackErr:true,
                     showLoading: false,
                   })
                 })
             }
           }
           render={
             (props)=> {
               return <LayOut>
                  <form onSubmit={props.handleSubmit}>
                 <React.Fragment>
                 <Typography style={{marginBottom: 10}} variant='h5'>
                     Update The User
                   </Typography>
                   <Grid
                     container
                     spacing={3}
                   >
                     <Grid
                       item
                       sm={6}
                       xs={12}
                     >
                       <TextField
                         autoComplete="fname"
                         fullWidth
                         helperText={(props.errors.name && props.touched.name) && props.errors.name}
                         label="User Name"
                         name="name"
                         onChange={props.handleChange}
                       />
                     </Grid>
                     <Grid
                       item
                       sm={6}
                       xs={12}
                     >
                       <TextField
                         autoComplete="fname"
                         fullWidth
                         helperText={(props.errors.email && props.touched.name) && props.errors.email}
                         id="Email"
                         label="Email"
                         name="email"
                         onBlur={props.handleBlur}
                         onChange={props.handleChange}
                       />
                     </Grid>
                     <Grid
                       item
                       sm={6}
                       xs={12}
                     >
                       <TextField
                         autoComplete="fname"
                         fullWidth
                         helperText={(props.errors.phone && props.touched.phone) && props.errors.phone}
                         id="firstName"
                         label="Phon Number"
                         name="phone"
                         onBlur={props.handleBlur}
                         onChange={props.handleChange}
                       />
                     </Grid>
                     <Grid
                       item
                       sm={6}
                       xs={12}
                     >
                       <TextField
                         autoComplete="fname"
                         fullWidth
                         helperText={(props.errors.location && props.touched.location) && props.errors.location}
                         id="firstName"
                         label="Location"
                         name="location"
                         onBlur={props.handleBlur}
                         onChange={props.handleChange}
                       />
                     </Grid>
                   </Grid>
                   <Button
                     color="primary"
                     style={{marginTop: 30}}
                     type="submit"
                     variant="contained"
                   >
                     {!this.state.showLoading&&'update'} 
                     {this.state.showLoading&&<CircularProgress
                       color="inherit"
                       size={23}
                     />}
                   </Button>
                   <div>
                     <Snackbar
                       autoHideDuration={3000}
                       onClose={this.handleClose}
                       open={this.state.openSnackSucc}
                     >
                       <Alert
                         onClose={this.handleClose}
                         severity="success"
                         style={{backgroundColor: 'green', color: 'white'}}
                       >
                       The User Has Updated Successfuly
                       </Alert>
                     </Snackbar>
                     <Snackbar
                       autoHideDuration={3000}
                       onClose={this.handleClose}
                       open={this.state.openSnackErr}
                     >
                       <Alert
                         onClose={this.handleClose}
                         severity="error"
                         style={{backgroundColor: 'red', color: 'white'}}
                       >
                       Please, Try Again.
                       </Alert>
                     </Snackbar>
                   </div>
                 </React.Fragment>
               </form>
               </LayOut>
             }
           }
           validationSchema={validationSchema}
         />
       </div>
     );
   }
}
export default InfoForm