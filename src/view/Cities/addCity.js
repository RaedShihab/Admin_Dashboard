import React from 'react';
import axios from 'axios';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
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

class Form extends React.Component {
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
          arname: '',
          countryId: '',
          lon: '',
          lat: '',
          order: ''
        }}
        onSubmit={data => {
            const values = {
              "name" : {
                "en" : "Amman",
                "ar" : "عمان"
              },
              "country_id" : "d238e7283d932e89323e",
              "order" : 2,
              "geoloc" : {
                "lat" : 90.324,
                "lon" : 89.234
              }
            }
          console.log(values)
          this.setState({
            showLoading:true
          })
          axios.post('https://jsonplaceholder.typicode.com/users', values)
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
                    {t("add_country")}
              </Typography>
              <Grid
              style={{width: '50%'}}
                container
                spacing={3}
              >
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("country_name")}
                     name="name"
                     onChange={props.handleChange}
                     variant="outlined"
                     helperText={(props.errors.name && props.touched.name) && props.errors.name}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("arabic_name")}
                     name="arname"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.arname && props.touched.arname) && props.errors.arname}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("arabic_name")}
                     name="order"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.order && props.touched.order) && props.errors.order}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("lon")}
                     name="lon"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.lon && props.touched.lon) && props.errors.lon}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("lat")}
                     name="lat"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.lat && props.touched.lat) && props.errors.lat}
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
          arname: Yup.string('Enter a name').required(t('name_is_required'))
          .min(2, 'Seems a bit short...')
          .max(10, 'We prefer insecure system, try a shorter password.'),
          order: Yup.string('Enter a name').required(t('required')),
          lon: Yup.string('Enter a name').required(t('required')),
          lat: Yup.string('Enter a name').required(t('required')),
        })}
      />
    </div>
    );
  }
}

export default withStyles(useStyles)(withTranslation("translations")(Form));
