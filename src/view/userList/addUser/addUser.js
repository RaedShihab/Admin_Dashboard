import React from 'react';
import axios from 'axios';
import { withTranslation } from "react-i18next";
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
    const {t} = this.props;
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
          axios.post('https://jsonplaceholder.typicode.com/users', data)
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
        render={(props=> {
          return <LayOut>
           <form
            form
            onSubmit={props.handleSubmit}
                 >
            <React.Fragment>
              <Typography style={{marginBottom: 10}} variant='h5'>
                    {t("add_user")}
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
                {!this.state.showLoading&&t('add')} 
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
                    {t("the_user_has_added_successfuly")}
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
        })}
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

export default withStyles(useStyles)(withTranslation("translations")(UserForm));
