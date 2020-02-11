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
import ApiService from '../../services/apis';

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
          countries: [],
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
      componentDidMount() {
        ApiService.fetchCountries().then(res=> this.setState({countries: res}))
      }
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
                    order: '',
                    lon: '',
                    lat: '',
                    id: ''
                  }}
                  onSubmit={data => {
                    const values     = {
                        "name" : {
                          "en" : data.name,
                          "ar" : data.arname
                        },
                        "country_id" : data.id,
                        "order" : data.order,
                        "geoloc" : {
                          "lat" : data.lat,
                          "lon" : data.lon
                        }
                      }
                    this.setState({
                      showLoading:true
                    })
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
                        lg={8}
                        md={6}
                        xl={8}
                        xs={12}
                        >
                        <CardHeader
                            // subheader={t("City Form")}
                            title={t("District Form")}
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
                                    label={t("city_name")}
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
                                        fullWidth
                                        margin="dense"
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
                                    fullWidth
                                    margin="dense"
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
                                    fullWidth
                                    margin="dense"
                                        label={t("order_number")}
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
                                            this.state.countries.map(country=> {
                                                return <option value={country.code}>{country.label}</option>
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
        name: Yup.string('Enter a name').required(t('cities/validations:name_is_required'))
        .min(2, 'Seems a bit short...'),
        arname: Yup.string('Enter a name').required(t('cities/validations:arabic_name_is_required'))
        .min(2, 'Seems a bit short...'),
        lon: Yup.number('Enter a number').required(t('cities/validations:required')),
        lat: Yup.number('Enter a number').required(t('cities/validations:required')),
        order: Yup.number('Enter a number').required(t('cities/validations:required'))
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