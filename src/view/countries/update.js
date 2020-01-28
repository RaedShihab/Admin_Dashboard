import React from 'react';
import axios from 'axios';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import IconCard from './iconCard'
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
    console.log('oooooo',this.props)
    return (
        <div>
      <Formik
        initialValues={{
          name:'',
          arname: '',
          isoCode: '',
          phone: '',
          icon: '',
          currency: '',
          arCurrency: '',
          lon: '',
          lat: '',
          order: ''
        }}
        onSubmit={data => {
            const values     = {
                "name" : {
                    "en" : data.name,
                    "ar" : data.arname
                },
                "iso_code" : data.isoCode,
                "phone_code" : data.phone,
                "icon" : data.icon,
                "currency" : {
                    "en" : data.currency,
                    "ar" : data.arCurrency
                },
                "geoloc" : {
                    "lon" : data.lon,
                    "lat" : data.lat
                },
                "order" : data.order
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
                     label={t("idoCode")}
                     name="isoCode"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.isoCode && props.touched.isoCode) && props.errors.isoCode}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("phone_code")}
                     name="phone"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.phone && props.touched.phone) && props.errors.phone}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("icon")}
                     name="icon"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.icon && props.touched.icon) && props.errors.icon}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("currency")}
                     name="currency"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.currency && props.touched.currency) && props.errors.currency}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("currency in arabic")}
                     name="arCurrency"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.arCurrency && props.touched.arCurrency) && props.errors.arCurrency}
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
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("order_number")}
                     name="order"
                     onChange={props.handleChange}
                    variant="outlined"
                    helperText={(props.errors.order && props.touched.order) && props.errors.order}
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
                  <div>
                  <IconCard/>
                  </div>
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
          isoCode: Yup.string('Enter a iso Code').required(t('iso_code_is_requier')),
          phone:  Yup.string('Enter a name').required(t('name_is_required')),
        //   .min(2, 'Seems a bit short...')
        //   .max(10, 'We prefer insecure system, try a shorter password.'),
          currency: Yup.string('Enter a name').required(t('currency_is_required')),
          arCurrency: Yup.string('Enter a name').required(t('currency_is_required')),
          lon: Yup.string('Enter a name').required(t('required')),
          lat: Yup.string('Enter a name').required(t('required')),
          order: Yup.string('Enter a name').required(t('required'))
        })}
      />
    </div>
    );
  }
}

export default withStyles(useStyles)(withTranslation("translations")(UserForm));
