import React from 'react';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik} from 'formik'
import PropTypes from 'prop-types';
import { Snackbar, CircularProgress} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
          cities: [],
          open422status: false,
        };
      }
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
          openSnackSucc: false,
          openSnackErr:false,
          open422status: false
        })
      };
      componentDidMount() {
        Axios.get('/cities').then(res=> this.setState({cities: res.data.data}))
      }
    render() {
        const { t , data, classes, ...rest } = this.props;
        console.log(data)
        return (
            <Card
              {...rest}
              className={classes.root}
            >
            <Formik
                initialValues={{
                    name:data===undefined? '': data.name.en,
                    arname: data===undefined? '': data.name.ar,
                    order: data===undefined? '': data.order,
                    // lon: data===undefined? '': data.geoloc.lon,
                    // lat: data===undefined? '':  data.geoloc.lat,
                    id: data===undefined? '':  data.old_city_id
                  }}
                  onSubmit={data => {
                    console.log(data)
                      let dataa = new FormData();
                        dataa.append('name[en]', data.name);
                        dataa.append('name[ar]', data.arname);
                        dataa.append('city_id', data.id);
                        dataa.append('geoloc[lon]', data.lon);
                        dataa.append('geoloc[lat]', data.lat);
                        dataa.append('order', data.order);
                        this.props.patch&&dataa.append('_method', 'patch');
                    this.setState({
                      showLoading:true
                    })
               this.props.requist(dataa)
                .then(res =>{
                  console.log(res)
                  if(res.status === 201 || res.status === 200) {
                    this.setState({
                      showLoading: false,
                      openSnackSucc: true,
                      })
                  }                    
                })
                .catch(err => {
                  if(err.response.status === 422) {
                    this.setState({
                      open422status:true,
                      showLoading: false,
                      })
                  }
                    console.log(err.response)
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
                        lg={8}
                        md={6}
                        xl={8}
                        xs={12}
                        >
                        <CardHeader
                            // subheader={t("City Form")}
                            title={t("district_form")}
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
                                    label={t("disrict_name")}
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
                                        defaultValue={data !== undefined? data.name.ar : '' }
                                        fullWidth
                                        margin="dense"
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
                                        // defaultValue={data!== undefined? data.geoloc.lon: ''}
                                        fullWidth
                                        margin="dense"
                                        label={t("countries/addApdate:lon")}
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
                                    // defaultValue={data!== undefined? data.geoloc.lat: ''}
                                    fullWidth
                                    margin="dense"
                                        label={t("countries/addApdate:lat")}
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
                                    defaultValue={data!== undefined? data.order : ''}
                                    fullWidth
                                    margin="dense"
                                        label={t("countries/addApdate:order_number")}
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
                                    <FormControl fullWidth
                                    margin="dense" variant="filled">
                                        <InputLabel htmlFor="filled-age-native-simple">{t('city')}</InputLabel>
                                            <Select
                                            native
                                            onChange={props.handleChange('id')}
                                            name='id'
                                            >
                                            {
                                            this.state.cities.map(city=> {
                                                return <option value={city._id}>{city.name.en}</option>
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
                                                autoHideDuration={10000}
                                                onClose={this.handleClose}
                                                open={this.state.open422status}
                                            >
                                                <Alert
                                                onClose={this.handleClose}
                                                severity="error"
                                                style={{backgroundColor: 'red', color: 'white'}}
                                                >
                                                {t("please select a city")}
                                                </Alert>
                                            </Snackbar>
                                </div>
                        </Grid>
                    </Grid>
                    </LayOut>
        </form>
        })}
        validationSchema={Yup.object().shape({
        name: Yup.string('Enter a name').required(t('cities/validations:name_is_required'))
        .min(2, 'Seems a bit short...'),
        arname: Yup.string('Enter a name').required(t('cities/validations:arabic_name_is_required'))
        .min(2, 'Seems a bit short...'),
        lon: Yup.number().min(-180).max(180).required(t('countries/validations:required')),
        lat: Yup.number().min(-90).max(90).required(t('countries/validations:required')),
        order: Yup.number().integer().required(t('countries/validations:required')),
        })}
            />
            </Card>
          );
    }  
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["districts/district", "countries/addApdate"])(AccountDetails));