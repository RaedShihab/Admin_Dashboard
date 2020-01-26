
import React from 'react';
import { withTranslation } from "react-i18next";
import {TextField, Button, Grid, Snackbar, CircularProgress, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import Yup from './yup'
import LayOut from '../../../layOut';
// import { fr } from 'yup-locales';
// import { setLocale } from 'yup';

// setLocale(fr);

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
     const {t} = this.props
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
                    {t("add_post")}
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
                     {!this.state.showLoading&&t('post')} 
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
                       {t("the_post_has_added_successfuly")}
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
                      {t("please_try_again")}
                       </Alert>
                     </Snackbar>
                   </div>
                 </React.Fragment>
               </form>
               </LayOut>
             }
           }
           validationSchema={ Yup.object().shape({
            name: Yup.string('Enter a name').required(t('pleaes_add_post'))
          })}
         />
       </div>
     );
   }
}
export default withTranslation("addPost")(InfoForm);
