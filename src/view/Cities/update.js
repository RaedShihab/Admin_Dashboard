import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import {Snackbar, CircularProgress} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ApiService from '../../services/apis';
import Form from './form';

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
  },
  formControl: {
    margin: theme.spacing(1),
    width: 209,
    color: 'red'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class FormList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackSucc: false,
      showLoading: false,
      openSnackErr: false,
      countries: []
    };
  }
  componentDidMount() {
    ApiService.fetchCountries().then(res=> this.setState({countries: res}))
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
    const {t, classes} = this.props;
    return (
        <div>
      <Formik
        initialValues={{
          name:'',
          arname: '',
          lon: '',
          lat: '',
          order: '',
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
                    "lat" : data.lon,
                    "lon" : data.lat
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
            {!this.state.showLoading&&<Form
                   handleSubmit={props.handleSubmit}
                   helperText={(props.errors.name && props.touched.name) && props.errors.name}
                   helperTextArname={(props.errors.arname && props.touched.arname) && props.errors.arname}
                   helperTextOrder={(props.errors.order && props.touched.order) && props.errors.order}
                   helperTextLon={(props.errors.lon && props.touched.lon) && props.errors.lon}
                   helperTextLat={(props.errors.lat && props.touched.lat) && props.errors.lat}
                   onChang={props.handleChange}
                   keyy={{btn:"add", title: "add_user"}}
                   disabled={false}
                   countries={this.state.countries}
                   />}
                   {this.state.showLoading&&<CircularProgress size="150px"/>
                   }
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
                        {t("users/users:the_user_has_added_successfuly")}
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
          </form>
          </LayOut>
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
    </div>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(withTranslation(["cities/addUpdate", "cities/validations"])(FormList));

