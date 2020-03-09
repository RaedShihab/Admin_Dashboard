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
import {Axios} from '../axiosConfig';

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
          icon: '',
          iconLoading: false,
          formLoading: false,
          enName: '',
          arName: '',
          isoCode: '',
          phoneNumber: '',
          order: '',
          lat: '',
          lon: '',
          arCurrency: '',
          engCurrency: '',
          message: '',
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
      componentDidMount() {
        const {update, data} = this.props;

        update &&
        this.setState({
          formLoading: true,
          iconLoading: true,
          })

       update && 
       Axios.get(`/locations/countries/${data.id}`).then(res => {
         console.log(res.data.data)
        this.setState({
          formLoading: false,
          iconLoading: false,
          icon: res.data.data.flag,
          enName: res.data.data.name.en,
          arName: res.data.data.name.ar,
          isoCode: res.data.data.iso_code,
          phoneNumber: res.data.data.phone_code,
          arCurrency: res.data.data.currency.ar,
          engCurrency: res.data.data.currency.en,
          lat: res.data.data.geoloc.lat,
          lon: res.data.data.geoloc.lon,
          order: res.data.data.order
        })
       })
       .catch(err => console.log(err))
      }

      changeFlag = (media) => {
        const {t} = this.props
        this.setState({iconLoading: true})
        this.props.updateFlag(media)
        .then(res =>{
          console.log(res.data.message)
          if(res.status === 201) {
           this.setState({
             showLoading: false,
             openSnackSucc: true,
           })
          }
          if(res.status === 200) {
           console.log(res)
           this.setState({
             icon: res.data.message,
             iconLoading: false,
             showLoading: false,
             openSnackSucc: true,
           })
          }
        })
        .catch(err => {
          console.log(err.response)
          if(err.response.status === 422) {
            if(err.response.data.flag !== undefined) {
              this.setState({
                message: t("please add SVG file for Country flag"),
                iconLoading: false,
                showLoading: false,
                open422status:true,
              })
             }
          }
          if(err.response.status === 500) {
           console.log(err.response)
           this.setState({
             showLoading: false,
             open500status:true,
           })
          }
        })
      }

    render() {
        const { t, classes, update, data} = this.props;
        const {iconLoading, formLoading, enName, arName, isoCode, phoneNumber, lon, lat, engCurrency, arCurrency, order} = this.state
          return ( 
            <div>
               {formLoading&&<LayOut>
              <CircularProgress size={100} style={{margin: '300px 0px 0px 500px'}}/>
            </LayOut>}
           { !formLoading&&<Formik
                initialValues={{
                  name:!update? '': enName,
                  arname: !update? '': arName,
                    isoCode: !update? '': isoCode,
                    phone: !update? '': phoneNumber,
                    icon: null,
                    currency: !update? '': engCurrency,
                    arCurrency: !update? '': arCurrency,
                    lon: !update? '': lon,
                    lat: !update? '':  lat,
                    order: !update? '': order
                  }}
                  
                  onSubmit={data => {
                    console.log(data)
                    this.setState({
                      showLoading:true
                    })
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
                        !update && values.append('flag', data.icon);
                         update&&values.append('_method', 'patch');
                    this.props.request(values)
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
                               if(err.response.data["name.ar"] !== undefined || err.response.data["name.en"] !== undefined) {
                                this.setState({
                                  message: t("Country Name, should be uniqe in English and Arabic!"),
                                  open422status:true,
                                  showLoading: false,
                                  })
                               }
                               if(err.response.data.flag !== undefined) {
                                this.setState({
                                  message: t("please add SVG icon"),
                                  open422status:true,
                                  showLoading: false,
                                  })
                               }
                               if(err.response.data.iso_code !== undefined) {
                                this.setState({
                                  message: t("Iso Code shuld be 2 characters"),
                                  open422status:true,
                                  showLoading: false,
                                  })
                               }
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
                                      {!iconLoading&&<Avatar
                                          className={classes.avatar}
                                          src={this.state.icon}
                                        />}
                                          {iconLoading&&<CircularProgress style={{margin: 25}}/>}
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
                                     name='icon'
                                     onChange={(event) => {
                                          if (!update && event.target.files && event.target.files[0]) {
                                            let reader = new FileReader();
                                            reader.onload = (e) => {
                                              this.setState({
                                                icon: e.target.result,
                                              });
                                            };
                                            reader.readAsDataURL(event.target.files[0]);
                                          }
                                          props.setFieldValue("icon", event.currentTarget.files[0]);
                                          const media = new FormData();
                                          media.append('flag', event.currentTarget.files[0])
                                          media.append('_method', 'patch')
                                          update&&this.changeFlag(media)
                                        }}

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
                                                defaultValue={update? enName : '' }
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
                                                defaultValue={update? arName : ''}
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
                                                defaultValue={update? isoCode : ''}
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
                                                defaultValue={update? phoneNumber : ''}
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
                                                defaultValue={update? engCurrency : ''}
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
                                                defaultValue={update? arCurrency : ''}
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
                                                defaultValue={update? lon : ''}
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
                                                defaultValue={update? lat: ''}
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
                                                defaultValue={update? order : ''}
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
                                                {this.state.message}
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
                  validationSchema={Yup.object().shape({
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
            />}
            </div>
           
          );
        }
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["countries/addApdate", "countries/validations"])(AccountDetails));