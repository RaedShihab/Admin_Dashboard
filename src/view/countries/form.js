import React from 'react';
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
                          "flag" : this.state.file,
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
                                        {t("add_country_flag")}
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
                                      subheader="Adding Country"
                                      title="Profile"
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
                                                {t("the_country_has_added_successfuly")}
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
                    isoCode: Yup.string('Enter a iso Code').required(t('countries/validations:iso_code_is_requier')),
                    phone:  Yup.string('Enter a phone code').required(t('countries/validations:phone_code_is_required')),
                    currency: Yup.string('Enter a currency').required(t('countries/validations:currency_is_required')),
                    arCurrency: Yup.string('Enter a currency').required(t('countries/validations:currency_is_required')),
                    lon: Yup.number('Enter a number').required(t('countries/validations:required')),
                    lat: Yup.number('Enter a number').required(t('countries/validations:required')),
                    order: Yup.number('Enter a number').required(t('countries/validations:required'))
                  })}
            />
            </Card>
          );
    }  
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["countries/addApdate", "countries/validations"])(AccountDetails));