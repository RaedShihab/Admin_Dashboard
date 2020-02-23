import React from 'react';
import FormData from 'form-data'
import * as Yup from 'yup';
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
  },
  details: {
    display: 'flex'
  },
  avatar: {
    // marginLeft: 'auto',
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
  form: {
  backgroundColor: 'white', borderRadius: 5
  }
}));

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openSnackSucc: false,
          showLoading: false,
          openSnackErr: false,
          selectedFile: null,
          open422status: false,
          open500status: false,
          image: '',
          file:{},
          data: {},
        };
      }
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
          openSnackSucc: false,
          openSnackErr:false,
          open422status: false,
          open500status: false
        })
      };
      onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
              console.log(e.target)
            this.setState({image: e.target.result,
            file: document.getElementById('contained-button-file').files[0]
            });
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
      // componentDidMount() {
      //   if(this.props.data !== undefined) {
      //     this.setState({data: this.props.data[0]})
      //   }
      // }
    render() {
        const { t, classes } = this.props;
        const {data} = this.props
        // const withTernary = () => (
        //   (!conditionA)
        //     ? valueC
        //     : (conditionB)
        //     ? valueA
        //     : valueB
        // );
          return (
            <Formik
                initialValues={{
                    name: data===undefined? '': data.name.en,
                    arname: data===undefined? '': data.name.ar,
                    isoCode: data===undefined? '': data.iso_code,
                    phone: data===undefined? '': data.phone_code,
                    // iconn: withTernary(),
                    icon: data===undefined? this.state.file : data.flag,
                    currency: data===undefined? '': data.currency.en,
                    arCurrency: data===undefined? '': data.currency.ar,
                    // lon: data===undefined? '': data.geoloc.lon,
                    // lat: data===undefined? '':  data.geoloc.lat,
                    order: data===undefined? '': data.order
                  }}
                  onSubmit={data => {
                    console.log(data)
                    this.setState({
                      showLoading:true
                    })
                    console.log(data)
                    let values = new FormData();
                        values.append('name[en]', data.name);
                        values.append('name[ar]', data.name);
                        values.append('iso_code', data.isoCode);
                        values.append('phone_code', data.phone);
                        values.append('currency[en]', data.currency);
                        values.append('currency[ar]', data.arCurrency);
                        values.append('geoloc[lon]', data.lon);
                        values.append('geoloc[lat]', data.lat);
                        values.append('order', data.order);
                        values.append('flag', this.state.file==={}? data.flag : this.state.file);
                        this.props.patch && values.append('_method', 'patch');
                    console.log(values)
                    this.props.requist(values)
                           .then(res =>{
                             console.log(res)
                             this.setState({
                               showLoading: false,
                               openSnackSucc: true,
                             })
                           })
                           .catch(err => {
                             console.log(err.response)
                             if(err.response.status === 422) {
                              this.setState({
                                open422status:true,
                                showLoading: false,
                                })
                            }
                            if(err.response.status === 500) {
                              this.setState({
                                open500status:true,
                                showLoading: false,
                                })
                            }
                            if(err.response === undefined) {
                              this.setState({
                                openSnackErr:true,
                                showLoading: false,
                              })
                            }
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
                                      
                                      {data !== undefined&&<Avatar
                                          className={classes.avatar}
                                          src={this.state.image===''? data.flag: this.state.image}
                                        />}
                                       {data === undefined && <Avatar
                                          className={classes.avatar}
                                          src={this.state.image}
                                        />}
                                        <Typography
                                        style={{margin: 30}}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {t("add_country_flag")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                    // helperText={(props.errors.icon && props.touched.icon) && props.errors.icon}
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
                                    <Card className={classes.form}>
                                    <CardHeader
                                      // subheader="Adding Country"
                                      title={t("country_details_form")}
                                      />
                                      <Divider />
                                      <CardContent>
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
                                                defaultValue={data !== undefined? data.name.en : '' }
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                label={t("country_name")}
                                                name="name"
                                                onChange={props.handleChange}
                                                helperText={(props.errors.name && props.touched.name) && props.errors.name}
                                                />
                                            </Grid>
                                          <Grid
                                              item
                                              sm={6}
                                              xs={12}
                                            >
                                                <TextField
                                                defaultValue={data!== undefined? data.name.ar : ''}
                                                label={t("arabic_name")}
                                                name="arname"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
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
                                                defaultValue={data!== undefined? data.iso_code : ''}
                                                label={t("isoCode")}
                                                name="isoCode"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
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
                                                defaultValue={data!==undefined? data.phone_code: ''}
                                                label={t("phone_code")}
                                                name="phone"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
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
                                                defaultValue={data!== undefined? data.currency.en: ''}
                                                label={t("currency")}
                                                name="currency"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
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
                                                defaultValue={data!== undefined? data.currency.ar: ''}
                                                label={t("currency_arabic")}
                                                name="arCurrency"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
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
                                                // defaultValue={data!== undefined? data.geoloc.lon: ''}
                                                label={t("lon")}
                                                name="lon"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
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
                                                // defaultValue={data!== undefined? data.geoloc.lat: ''}
                                                label={t("lat")}
                                                name="lat"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
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
                                                defaultValue={data!== undefined? data.order : ''}
                                                label={t("order_number")}
                                                name="order"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                helperText={(props.errors.order && props.touched.order) && props.errors.order}
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
                                              onClose={this.handleClose}
                                              open={this.state.openSnackSucc}
                                            >
                                              <Alert
                                                onClose={this.handleClose}
                                                severity="success"
                                                style={{backgroundColor: 'green', color: 'white'}}
                                              >
                                                {t(this.props.response)}
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
                                            <Snackbar
                                                autoHideDuration={3000}
                                                onClose={this.handleClose}
                                                open={this.state.open422status}
                                            >
                                                <Alert
                                                onClose={this.handleClose}
                                                severity="error"
                                                style={{backgroundColor: 'red', color: 'white'}}
                                                >
                                                {t("Country Name, Phone Code, ISO Code, Should be uniqe! ")}
                                                </Alert>
                                            </Snackbar>
                                            <Snackbar
                                                autoHideDuration={3000}
                                                onClose={this.handleClose}
                                                open={this.state.open500status}
                                            >
                                                <Alert
                                                onClose={this.handleClose}
                                                severity="error"
                                                style={{backgroundColor: 'red', color: 'white'}}
                                                >
                                                {t("Server Error Please try again!")}
                                                </Alert>
                                            </Snackbar>
                                          </div>
                                    </Card>
                                  </Grid>
                              </Grid>
                             </LayOut>
                    </form>
                  })} 
                  validationSchema={data === undefined&&Yup.object().shape({
                    name: Yup.string('Enter a name').required(t('countries/validations:name_is_required'))
                    .min(2, 'Seems a bit short...'),
                    arname: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                    .min(2, 'Seems a bit short...'),
                    isoCode: Yup.string('Enter a iso Code').required(t('countries/validations:iso_code_is_requier'))
                    .max(2, 'Enter Just Tow carachters...').min(2, 'Enter Just Tow carachters......'),
                    phone:  Yup.number().min(1).max(1000).required(t('countries/validations:phone_code_is_required')),
                    currency: Yup.string('Enter a currency').required(t('countries/validations:currency_is_required')),
                    arCurrency: Yup.string('Enter a currency').required(t('countries/validations:currency_is_required')),
                    lon: Yup.number().min(-180).max(180).required(t('countries/validations:required')),
                    lat: Yup.number().min(-90).max(90).required(t('countries/validations:required')),
                    order: Yup.number().integer().required(t('countries/validations:required')),
                    // icon: Yup.mixed().required('A file is required')
                  })}
            />
          );
        }
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["countries/addApdate", "countries/validations"])(AccountDetails));