import React from 'react';
import axios from 'axios';
import LayOut from '../../../layOut'
import {Formik} from 'formik';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import {TextField,Button, Grid, Snackbar, CircularProgress, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  }
}));
const validationSchema = Yup.object().shape({
  name: Yup.string('Enter a name').required('Name is required')
  .min(2, 'Seems a bit short...')
  .max(10, 'We prefer insecure system, try a shorter password.'),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

class UserForm extends React.Component {
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
    // const {classes} = this.props 
    return (
      <LayOut>
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
        }
        }
        render={(props=> {
          return <form
            form
            onSubmit={props.handleSubmit}
                 >
            <React.Fragment>
              <Typography style={{marginBottom: 10}} variant='h5'>
                     Add User
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
                    label="Email"
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
                    autoComplete="fname"
                    fullWidth
                    helperText={(props.errors.password && props.touched.password) && props.errors.password}
                    label="Password"
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
                    autoComplete="fname"
                    fullWidth
                    helperText={(props.errors.password_confirmation && props.touched.password_confirmation) && props.errors.password_confirmation}
                    label="Password Confirmation"
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
                {!this.state.showLoading&&'add'} 
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
                    The User Has Added Successfuly
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
        })}
        validationSchema={validationSchema}
      />
    </div>
      </LayOut>
    );
  }
}
  export default withStyles(useStyles)(UserForm);