import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik} from 'formik'
import PropTypes from 'prop-types';
import { Snackbar, CircularProgress, Avatar, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import LayOut from '../../layOut';

const useStyles = (() => ({
  root: {
      padding: 20,
    //   margin: 10,
    //   backgroundColor: '#fafafa'
  },
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: 10
  },
  uploadButton: {
    marginRight: 10
  },
  input: {
    display: 'none',
  },
  
}));

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openSnackSucc: false,
          showLoading: false,
          openSnackErr: false,
          selectedFile: null,
          image: '',
          file:{}
        };
      }
      onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
              console.log(e.target)
            this.setState({image: e.target.result,
            file: e.target
            });
          };
          reader.readAsDataURL(event.target.files[0]);
        }
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
        const { t ,classes, ...rest } = this.props;
        return (
            <Card
              {...rest}
              className={classes.root}
            >
            <Formik
                initialValues={{
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:'',
                  }}
                  onSubmit={data => {
                    const values     = {
                        "name" : data.name,
                        "email": data.email,
                        "password" : data.password,
                        "password_confirmation" : data.password_confirmation,
                        "photo" : this.state.file,
                    }
                      console.log(values)
                    this.setState({
                      showLoading:true
                    })
                this.props.requist(values)
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
                    return <form
                    autoComplete="off"
                     noValidate
                      onSubmit={props.handleSubmit}
                           >
                             <LayOut>
                             <Grid
                                container
                                spacing={4}
                              >
                                <Grid
                                  item
                                  lg={4}
                                  md={6}
                                  xl={4}
                                  xs={12}
                                >
                                  <Card>
                                    <CardContent>
                                      <div className={classes.details}>
                                      <Typography
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {t("add_photo")}
                                      </Typography>
                                      <Avatar
                                          className={classes.avatar}
                                          src={this.state.image}
                                        />
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                      onChange={this.onImageChange}
                                      accept="image/*"
                                      id="contained-button-file"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="contained-button-file">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    </CardActions>
                                  </Card>
                                </Grid>
                                <Grid
                                    item
                                    lg={8}
                                    md={6}
                                    xl={8}
                                    xs={12}
                                  >
                                    <CardHeader
                                    style={{backgroundColor: 'white'}}
                                    //   subheader={t("user_form")}
                                      title={t("user_form")}
                                      />
                                      <Divider />
                                      <CardContent style={{backgroundColor: 'white'}}>
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
                                                    variant="outlined"
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
                                                    defaultValue={this.props.email}
                                                    disabled= {this.props.disabled}
                                                    variant="outlined"
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
                                                variant="outlined"
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
                                               variant="outlined"
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
                                      </CardContent>
                                      <Divider />
                                      <CardActions>
                                      <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                          >
                                            {!this.state.showLoading&&t('add')} 
                                            {this.state.showLoading&&<CircularProgress
                                              size={23}
                                            />}
                                          </Button>
                                      </CardActions>
                                      <div>
                                            <Snackbar
                                              autoHideDuration={3000}
                                              onClose={props.handleClose}
                                              open={this.state.openSnackSucc}
                                            >
                                              <Alert
                                                onClose={this.handleClose}
                                                severity="success"
                                                style={{backgroundColor: 'green', color: 'white'}}
                                              >
                                                {t("users/users:the_user_has_added_successfuly")}
                                              </Alert>
                                            </Snackbar>
                                            <Snackbar
                                              autoHideDuration={3000}
                                              onClose={props.handleClose}
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
                                  </Grid>
                              </Grid>
                             </LayOut>
                    </form>
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
            </Card>
          );
    }  
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["translation", "users/users"])(AccountDetails));