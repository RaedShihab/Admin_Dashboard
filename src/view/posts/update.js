import React from 'react';
import { withTranslation } from "react-i18next"
import {Snackbar, CircularProgress} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayOut from '../../layOut';
import Form from '../postForm';

class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // post: props.history.location.state.post,
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
                 <form style={{backgroundColor: 'white', padding: 20, width: '50%' }} onSubmit={props.handleSubmit}>
                 {!this.state.showLoading&&<Form
                   handleSubmit={props.handleSubmit}
                   onChang={props.handleChange}
                   helperText={(props.errors.name && props.touched.name) && props.errors.name}
                   keyy={{btn:"update", title: "update_post"}}
                   />}
                   {this.state.showLoading&&<CircularProgress size="150px"/>
                   }
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
                        {t("The_post_has_updated_successfuly")}
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
           validationSchema={ Yup.object().shape({
            name: Yup.string('Enter a name').required(t('pleaes_add_post'))
          })}
         />
       </div>
     );
   }
}
export default withTranslation("posts/addPost")(InfoForm)