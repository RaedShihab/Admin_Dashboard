import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Container, Box, Grid, Link, Avatar, Typography} from '@material-ui/core';
import {Radio , FormControlLabel, FormControl, RadioGroup} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withTranslation } from "react-i18next";
import { userActions } from '../Actions/userAcion';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import * as Yup from 'yup';


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const useStyles = (theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    group: {
      display: 'inline-block',
      marginLeft: 90
    }
  }));

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: "en"
        };
        // reset login status
        this.props.dispatch(userActions.logout());
    }
    // componentDidMount() {
    //   localStorage.removeItem('user')
    // }
    handleChange = event => {
      let newlang = event.target.value;
      this.setState(prevState => ({ value: newlang }));
      this.props.i18n.changeLanguage(newlang);
    };
    render() {
      console.log(this.props)
      // if(this.props.loggingIn) {
      //   alert('loginn')
      // }
      // if(this.props.loggingIn === undefined) {
      //   alert('not')
      // }
        const {classes, t} = this.props;
        return (
            <div>
              <Grid item xs={12}>
                 </Grid>
                <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values)=> {
                    const { dispatch, history } = this.props;
                    if (values) {
                      console.log(values)
                        dispatch(userActions.login(values.username, values.password));
                        history.push('/dashboard')
                        }
                          }}
                          // render={
                            
                          // }
                          validationSchema={Yup.object().shape({
                            username: Yup.string('Enter your User Name')
                              .required (t('name_is_required')),
                            password: Yup.string().required(t('password_is_required'))
                          })}
                >
                  {
                    (props)=> {
                      return <div className={classes.paper}>
                         <Avatar className={classes.avatar}>
                            <LockIcon />
                          </Avatar>
                          <Typography component="h1" variant="h5">
                          {t(
                              "sign_in"
                            )} 
                          </Typography>
                      <form className={classes.form} onSubmit={props.handleSubmit}>
                              <Container component="main" maxWidth="xs">
                              <CssBaseline />
                              <FormControl
                              component="fieldset"
                              className={classes.formControl}
                            >
                              <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                // value={this.state.value}
                                onChange={this.handleChange}
                              >
                                <FormControlLabel
                                  value="en"
                                  control={<Radio />}
                                  label="English"
                                />
                                <FormControlLabel
                                  value="ar"
                                  control={<Radio />}
                                  label="Arabic"
                                />
                              </RadioGroup>
                            </FormControl>
                              <TextField
                               variant="filled"
                               margin="normal"
                               required
                               fullWidth
                               helperText={(props.errors.username && props.touched.username) && props.errors.username}
                               label={t("user_name")}
                               name="username"
                                onChange={props.handleChange}
                              />
                               <TextField
                               variant="filled"
                               margin="normal"
                               required
                               fullWidth
                               helperText={(props.errors.password && props.touched.password) && props.errors.password}
                               label={t("passowrd")}
                               name="password"
                               onChange={props.handleChange}
                              />
                              <Button
                                color="primary"
                                type="submit"
                                variant="contained"
                                fullWidth
                                className={classes.submit}
                              >

                                {this.props.loggingIn === undefined && t("sign_in")}
                                {this.props.loggingIn && <CircularProgress color="white"/>}
                                
                              </Button>
                              <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              {t("forgot_password")}
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href="#" variant="body2">
                              {t("dont_have_an_account_sign_up")}
                            </Link>
                          </Grid>
                       </Grid>
                              </Container>
                      </form>
                      <Box mt={8}>
                   <Copyright />
                  </Box>
                      </div>
                    }
                  } 
                </Formik>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = compose(
    withStyles(useStyles),
    connect(mapStateToProps),
    withTranslation("translation")
  )(LoginPage);

  export default connectedLoginPage;