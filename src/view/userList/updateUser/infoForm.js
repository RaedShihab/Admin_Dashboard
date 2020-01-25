/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React from 'react';
import {TextField,Button, Grid, Snackbar, CircularProgress, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayOut from '../../../layOut';
import { withTranslation } from "react-i18next";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
// const validationSchema = Yup.object().shape({
//   name: Yup.string('Enter a name').required('Name is required'),
//   email: Yup.string('Enter your email')
//     .email('Enter a valid email')
//     .required('Email is required'),
//   phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone Number is required'),
//   location: Yup.string('Enter your adress').required('The address is required'),
// });

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
     const {t}  = this.props
     console.log('llll',this.props)
     return (
       <div>
         <Formik
           initialValues={{
            name:'',
            email:'',
            password:'',
            password_confirmation:''
           }}
           onSubmit = {
             values=> {
               this.setState({
                 showLoading:true
               })
               axios.put('https://jsonplaceholder.typicode.com/users', values)
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
                     {t("update_the_user")}
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
                    label={t("user_name")}
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
                    label={t("email")}
                    name="email"
                    onChange={props.handleChange}
                  />
                     </Grid>
                     <Grid
                       item
                       sm={6}
                       xs={12}
                     >
                       <TextField
                        type='password'
                        autoComplete="fname"
                        fullWidth
                        helperText={(props.errors.password && props.touched.password) && props.errors.password}
                        label={t("password")}
                        name="password"
                        onChange={props.handleChange}
                  />
                     </Grid>
                     <Grid
                       item
                       sm={6}
                       xs={12}
                     >
                       <TextField
                        type='password'
                        autoComplete="fname"
                        fullWidth
                        helperText={(props.errors.password_confirmation && props.touched.password_confirmation) && props.errors.password_confirmation}
                        label={t("password_confirmation")}
                        name="password_confirmation"
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
                     {!this.state.showLoading&&t('update')} 
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
                      {t("the_user_has_updated_successfuly")}
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
           validationSchema={Yup.object().shape({
            name: Yup.string('Enter a name').required(t('name_is_required'))
            .min(2, 'Seems a bit short...')
            .max(10, 'We prefer insecure system, try a shorter password.'),
            email: Yup.string('Enter your email')
              .email('Enter a valid email')
              .required(t("emailRequired")),
              password: Yup.string().required(t('password_is_required')),
              password_confirmation: Yup.string()
                 .oneOf([Yup.ref('password'), null], t('passwords_must_match'))
          })}
         />
       </div>
     );
   }
}
export default withTranslation("translations")(InfoForm);
