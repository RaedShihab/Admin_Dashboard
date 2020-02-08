import React from 'react';
import {Snackbar, CircularProgress, withStyles} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayOut from '../../layOut';
import { withTranslation } from "react-i18next";
import Form from '../userForm';

const useStyles = (theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 500,
    },
    marginTop: '150px',
  },
  btn: {
    margin: '80px 0px 0px 0px'
  },
  form : {
    backgroundColor: 'white', padding: 20, width: '50%'
  }
}));

class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
     const {t, classes}  = this.props
     const userIdArray = this.props.match.params.id;
    //  const userEmailArray = this.props.location.state.data.map(user=> user.email);
    //  console.log(userEmailArray)
     return (
       <div>
         <Formik
           initialValues={{
            name:'',
            email:'',
            password:'',
            password_confirmation:''
           }}
           onSubmit={data => {
            console.log(data)
            this.setState({
              showLoading:true
            })
            axios.put('https://jsonplaceholder.typicode.com/users/'+userIdArray, data)
                   .then(res =>{
                     console.log(userIdArray)
                     this.setState({
                       showLoading: false,
                       openSnackSucc: true
                     })
                   })
                   .catch(err => {
                     console.log(err)
                     this.setState({
                       showLoading: false,
                       openSnackErr: true
                     })
                   })
          }
           }
           render={
             (props)=> {
               return <LayOut>
                  <form className={classes.form} onSubmit={props.handleSubmit}>
                  {!this.state.showLoading&&<Form
                   handleSubmit={props.handleSubmit}
                   helperText={(props.errors.name && props.touched.name) && props.errors.name}
                   helperTextPassword={(props.errors.password && props.touched.password) && props.errors.password}
                   helperTextConfigPassword={(props.errors.password_confirmation && props.touched.password_confirmation) && props.errors.password_confirmation}
                   onChang={props.handleChange}
                   keyy={{btn:"update", title: "update_the_user"}}
                  //  email={userEmailArray}
                   disabled={true}
                   />}
                   {this.state.showLoading&&<CircularProgress size="150px"/>}
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
                        {t("users/users:the_user_has_updated_successfuly")}
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
                 </form>
               </LayOut>
             }
           }
           validationSchema={Yup.object().shape({
            name: Yup.string('Enter a name').required(t('name_is_required'))
            .min(2, 'Seems a bit short...')
            .max(10, 'We prefer insecure system, try a shorter password.'),
              password: Yup.string().required(t('password_is_required')),
              password_confirmation: Yup.string()
                 .oneOf([Yup.ref('password'), null], t('passwords_must_match'))
          })}
         />
       </div>
     );
   }
}
export default withStyles(useStyles)(withTranslation(["translation", "users/users"])(InfoForm));
