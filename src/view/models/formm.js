import React from 'react';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik} from 'formik'
import PropTypes from 'prop-types';
import { Snackbar, CircularProgress} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField, 
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
  form: {
    backgroundColor: 'white',
    borderRadius: '5px'
  }
}));

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openSnackSucc: false,
          showLoading: false,
          openSnackErr: false,
          open422status: false,
          selectedFile: null,
          brands: [],
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
        Axios.get('/categories/brands').then(res=> this.setState({brands: res.data.data}))
      }
      
    render() {

      const {brands} = this.state
    const dataList = brands.map(item => {return {name: item.name.en, id: item.id}});
    const defaultProps = {
      options: dataList,
      getOptionLabel: option => option.name,
    };

        const { t ,classes, data, update} = this.props;

        return (
            <Formik
                initialValues={{
                    name:!update? '': data.name.en,
                    arname: !update? '': data.name.ar,
                    order: !update? '': data.order,
                    brand_id: !update? '':  data.brand_id,
                    manf_year: !update? '': data.manf_year
                  }}
                  
                  onSubmit={data => {
                      let values = new FormData();
                        values.append('name[en]', data.name);
                        values.append('name[ar]', data.arname);
                        values.append('brand_id', data.brand_id);
                        values.append('order', data.order);
                        values.append('manf_year', parseInt(data.manf_year));
                        update && values.append('_method', 'patch');
                    this.setState({
                      showLoading:true
                    })
               this.props.request(values)
                .then(res =>{
                    if(res.status === 201 || res.status === 200) {
                      this.setState({
                        showLoading: false,
                        openSnackSucc: true,
                        })
                    }   
                })
                .catch(err => {
                    console.log(err.response)
                    if(err.response === undefined) {
                      this.setState({
                        openSnackErr:true,
                        showLoading: false,
                      })
                    }
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
                    this.setState({
                    openSnackErr:true,
                    showLoading: false,
                    })
                })
        }
        }
        validationSchema={ Yup.object().shape({
        name: Yup.string('Enter a name').required(t('required'))
        .min(2, 'Seems a bit short...'),
        arname: Yup.string('Enter a name').required(t('required'))
        .min(2, 'Seems a bit short...'),
        order: Yup.number().integer().required(t('required')),
        manf_year: Yup.number().integer().required(t('required')),
        brand_id: Yup.string('choose brand').required(t('required'))
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
                          title={t("model_form")}
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
                                    defaultValue={update? data.name.en : '' }
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    label={t("name")}
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
                                    defaultValue={update? data.name.ar : ''}
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
                                    defaultValue={update? data.order : ''}
                                    label={t("order_number")}
                                    name="order"
                                    onChange={props.handleChange}
                                    fullWidth
                                    margin="dense"
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
                                    defaultValue={update? data.manf_year : ''}
                                    label={t("manf_year")}
                                    name="manf_year"
                                    onChange={props.handleChange}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    helperText={(props.errors.manf_year && props.touched.manf_year) && props.errors.manf_year}
                                    />
                                </Grid>
                                <Grid
                                  item
                                  sm={6}
                                  xs={12}
                                >
                                  <Autocomplete
                                    {...defaultProps}
                                    id="disable-open-on-focus"
                                    disableOpenOnFocus
                                    onChange={(e, value) => {props.setFieldValue("brand_id", value.id); }}
                                    renderInput={params => (
                                      <TextField
                                        name='brand_id'
                                        {...params}
                                        variant="standard"
                                        label={this.props.list}
                                        placeholder={t("choose_brand")}
                                        margin="normal"
                                        fullWidth
                                      />
                                    )}
                                  />
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
                                color="white"
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
                                    {t("model Names Should be uniqe! ")}
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
            </Formik>
          );
    }  
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["model/model", "countries/addUpdate"])(AccountDetails));