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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  backgroundColor: 'white', borderRadius: 5, 
  // width: '100%', position: 'absolute'
  }
}));

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          countries: [],
          openSnackSucc: false,
          showLoading: false,
          openSnackErr: false,
          selectedFile: null,
          open422status: false,
          open500status: false,
          data: {},
          formLoading: false,
          enName: '',
          arName: '',
          order: '',
          lat: '',
          lon: '',
          select: '',
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

      componentDidMount() {
        const {update, data} = this.props;

        Axios.get('/locations/countries').then(res => {
          this.setState({countries: res.data.data})
        })

        update &&
        this.setState({
          formLoading: true,
          })

       update && 
       Axios.get(`/locations/cities/${data.id}`).then(res => {
         console.log(res.data.data)
        this.setState({
          enName: res.data.data.name.en,
          arName: res.data.data.name.ar,
          lat: res.data.data.geoloc.lat,
          lon: res.data.data.geoloc.lon,
          order: res.data.data.order,
          select: res.data.data.country_id,
          formLoading: false,
        })
       })
       .catch(err => console.log(err))
      }

    render() {

        const { t, classes, update, data} = this.props;
        const { formLoading, enName, arName, lon, lat, order, countries, select} = this.state;
        
        return (
          <div>
            {formLoading&&<LayOut>
              <CircularProgress size={100} style={{margin: '300px 0px 0px 500px'}}/>
            </LayOut>}
            { !formLoading&&
              <Formik
                initialValues={{
                  name:!update? '': enName,
                  arname: !update? '': arName,
                  lon: !update? '': lon,
                  lat: !update? '':  lat,
                  order: !update? '': order,
                  select: !update? '': select
                  }}
                  
                  onSubmit={data => {
                    console.log(data)
                    this.setState({
                      showLoading:true
                    })
                    let values = new FormData();
                        values.append('name[en]', data.name);
                        values.append('name[ar]', data.name);
                        values.append('geoloc[lon]', data.lon);
                        values.append('geoloc[lat]', data.lat);
                        values.append('order', data.order);
                        values.append('country_id', data.select);
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
                  validationSchema={Yup.object().shape({
                    name: Yup.string('Enter a name').required(t('countries/validations:name_is_required'))
                    .min(2, 'Seems a bit short...'),
                    arname: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                    .min(2, 'Seems a bit short...'),
                    lon: Yup.number().min(-180).max(180).required(t('countries/validations:required')),
                    lat: Yup.number().min(-90).max(90).required(t('countries/validations:required')),
                    order: Yup.number().integer().required(t('countries/validations:required')),
                    select: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                  })}
            >
              {(props=> {
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
                                                helpertext={(props.errors.name && props.touched.name) && props.errors.name}
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
                                                helpertext={(props.errors.arname && props.touched.arname) && props.errors.arname}
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
                                                helpertext={(props.errors.lon && props.touched.lon) && props.errors.lon}
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
                                                helpertext={(props.errors.lat && props.touched.lat) && props.errors.lat}
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
                                                helpertext={(props.errors.order && props.touched.order) && props.errors.order}
                                                />
                                            </Grid>
                                            <Grid
                                              item
                                              sm={6}
                                              xs={12}
                                            >
                                              <FormControl fullWidth
                                                margin="dense" variant="filled"
                                                >
                                                  <InputLabel htmlFor="filled-age-native-simple">{t("category")}</InputLabel>
                                                      <Select
                                                      native
                                                      onChange={props.handleChange}
                                                      helpertext={(props.errors.select && props.touched.select) && props.errors.select}
                                                      name="select"
                                                      >
                                                        <option value="">
                                                         
                                                        </option>
                                                      {
                                                        countries.map(category=> {
                                                          return <option key={category.id} value={category.id}>{category.name.en}</option>
                                                      })
                                                      }
                                                  </Select>
                                              </FormControl>
                                            </Grid>
                                          </Grid>
                                      </CardContent>
                                      <Divider />
                                      <CardActions>
                                      <Button
                                        disabled={!update && !(props.isValid && props.dirty)}
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
              </Formik>}
          </div>
          );
        }
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["countries/addApdate", "countries/validations"])(AccountDetails));