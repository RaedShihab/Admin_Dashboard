import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Container, Box, Grid, Link, Avatar, Typography} from '@material-ui/core';
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
  const validationSchema = Yup.object().shape({
    username: Yup.string('Enter your User Name')
      .required('User Name is required'),
    password: Yup.string().required('Password is required')
  });
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
  }));

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());
    }

    render() {
        const {classes} = this.props;
        console.log('jjjjj',this.props)
        return (
            <div>
                <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values)=> {
                    const { dispatch, history } = this.props;
                    if (values) {
                        dispatch(userActions.login(values.username, values.password));
                        history.push('/dashboard')
                    }
                          }}

                          render={
                            (props)=> {
                              return <div className={classes.paper}>
                                 <Avatar className={classes.avatar}>
                                    <LockIcon />
                                  </Avatar>
                                  <Typography component="h1" variant="h5">
                                    Sign in
                                  </Typography>
                              <form className={classes.form} onSubmit={props.handleSubmit}>
                                      <Container component="main" maxWidth="xs">
                                      <CssBaseline />
                                      <TextField
                                       variant="outlined"
                                       margin="normal"
                                       required
                                       fullWidth
                                       helperText={(props.errors.username && props.touched.username) && props.errors.username}
                                       label="Email Address"
                                       name="username"
                                        onChange={props.handleChange}
                                      />
                                       <TextField
                                       variant="outlined"
                                       margin="normal"
                                       required
                                       fullWidth
                                       helperText={(props.errors.password && props.touched.password) && props.errors.password}
                                       label="Password"
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
                                        Sign In
                                      </Button>
                                      <Grid container>
                                  <Grid item xs>
                                    <Link href="#" variant="body2">
                                      Forgot password? 
                                    </Link>
                                  </Grid>
                                  <Grid item>
                                    <Link href="#" variant="body2">
                                      {"Don't have an account? Sign Up"}
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
                          validationSchema={validationSchema}
                />
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
  )(LoginPage);

  export default connectedLoginPage;