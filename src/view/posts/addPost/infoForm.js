/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React from 'react';
import {TextField, Button, Grid, Snackbar, CircularProgress, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayOut from '../../../layOut'

const validationSchema = Yup.object().shape({
  name: Yup.string('Enter a name').required('Pleaes add a post')
  .min(2, 'Seems a bit short...')
  .max(300, 'We prefer insecure system, try a shorter password.')
});

class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
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
     return (
       <div>
         <Formik
           initialValues={{
             name: '',

           }}
           onSubmit = {
             values=> {
               this.setState({
                 showLoading:true
               })
               axios.post('https://jsonplaceholder.typicode.com/posts', values)
                 .then(res =>{
                   this.setState({
                     showLoading: false,
                     openSnackSucc: true,
                   })
                 })
                 .catch(err => {
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
                     Add a post
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
                         defaultValue={this.state.post.body}
                         fullWidth="bool"
                         helperText={(props.errors.name && props.touched.name) && props.errors.name}
                         id="filled-multiline-static"
                         label="Multiline"
                         multiline
                         name="name"
                         onChange={props.handleChange}
                         rows="4"
                         variant="filled"
                       />
 
                     </Grid>
                   </Grid>
                   <Button
                     color="primary"
                     style={{marginTop: 30}}
                     type="submit"
                     variant="contained"
                   >
                     {!this.state.showLoading&&'POST'} 
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
                       The Post Has Updated Successfuly
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