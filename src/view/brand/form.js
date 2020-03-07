import React from 'react';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik, Field} from 'formik'
import PropTypes from 'prop-types';
import { CircularProgress, Avatar, Typography} from '@material-ui/core';
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
  Checkbox,
  FormControlLabel,
  Snackbar,
  Radio
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Axios} from '../axiosConfig';
import LayOut from '../../layOut';

const useStyles = (() => ({
  root: {
    flexGrow: 1,
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
    backgroundColor: 'white', borderRadius: 5, marginTop: 10
    },
    btn: {
      marginTop: 20, width: '25%'
    },
    margin: {
      marginTop: 15
    },
    TypographyMargin : {
      // margin: 40
    },
    deleteBtn: {
      margin: '0px 15px'
    },
    formControl: {
      // margin: theme.spacing(1),
      // minWidth: 120,
      width: 100
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
          icon: '',
          checked: true,
          selectedValue: 'a',
          categories: [], 
          iconLoading: false
        };
      }

      componentDidMount() {
        const {update, data} = this.props

        update && this.setState({iconLoading: true})

        update &&
        Axios.get('/categories/brands/'+data.id).then(res=>{
          this.setState({
            icon: res.data.data.icon,
            iconLoading: false
          })
        })
        .catch(err => console.log(err))

        Axios.get('/categories').then(res => {
          this.setState({categories: res.data.data})
          })
      }

      changeIcon = (media, id) => {
        this.setState({iconLoading: true})
        this.props.updateIcon(media, id)
        .then(res =>{
          console.log(res)
           this.setState({
             icon: res.data.message,
             iconLoading: false,
             showLoading: false,
             openSnackSucc: true,
           })
        })
        .catch(err => {
          console.log(err.response)
          if(err.response.status === 422) {
           this.setState({
             showLoading: false,
             openSnackErr:true,
             iconLoading: false
           })
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
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
          openSnackSucc: false,
          openSnackErr:false,
          open500status:false,
          open422status: false 
        })
      };

       deleteMedia =(id, type)=> {
        console.log('id', id)
        console.log('type', type)
      Axios.delete(`/categories/${id}/media/${type}`)
      .then(res=> {
        this.setState({
          type: '',
          showLoading: false,
          openSnackSucc: true,
        })
      })
      .catch(err=> {
        this.setState({
          showLoading: false,
          open500status:true,
        })
      })
     }

    render() {
 
        const { t ,classes, data, update} = this.props;
        const {iconLoading} = this.state

        const dataList = this.state.categories
        const listedData = dataList.map(item => {return {name: item.name.en, id: item.id}});
        const defaultProps = {
          options: listedData,
          getOptionLabel: option => option.name,
        };

        return (
            <div
              // {...rest}
              // className={classes.root}
            >
            <Formik
                initialValues={{
                    name:!update? '': data.name.en,
                    arname: !update? '': data.name.ar,
                    order: !update? '': data.order,
                    icon: !update? null: data.icon_svg,
                    category: !update? '': {id:data.category_id}
                  }}
                  onSubmit={data => {
                    console.log(data)
                      let values = new FormData();
                        values.append('name[en]', data.name);
                        values.append('name[ar]', data.arname);
                        values.append('order', data.order);
                        values.append('category_id', data.category.id);
                        
                        !update&&values.append('icon', data.icon);
                        update&&values.append('_method', 'patch')
                        // console.log(values)
                    this.setState({
                      showLoading:true
                    })
                this.props.submitForm(values)
                           .then(res =>{
                             console.log(res)
                             if(res.status === 201) {
                              console.log(res)
                              this.setState({
                                showLoading: false,
                                openSnackSucc: true,
                              })
                             }
                             if(res.status === 200) {
                              console.log(res)
                              this.setState({
                                showLoading: false,
                                openSnackSucc: true,
                              })
                             }
                           })
                           .catch(err => {
                             console.log(err.response)
                             if(err.response.status === 422) {
                              this.setState({
                                showLoading: false,
                                openSnackErr:true,
                              })
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
                  }
                            validationSchema={Yup.object().shape({
                              name: Yup.string('Enter a name').required(t('countries/validations:name_is_required'))
                              .min(2, 'Seems a bit short...'),
                              arname: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                              .min(2, 'Seems a bit short...'),
                              order: Yup.number().integer().required(t('countries/validations:required')),
                              category: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                            })}
                      >
                          {(props=> {
                    return <form
                    autoComplete="off"
                     noValidate
                      onSubmit={props.handleSubmit}
                           >
                             <LayOut>
                             <div className={classes.root}>
                                <Grid container spacing={3}>
                                 
                                <div className={classes.root}>
                                <Grid item  xs={12}>
                                  <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                      {!iconLoading&&<Avatar
                                          className={classes.avatar}
                                          src={this.state.icon}
                                        />} {
                                          iconLoading && <CircularProgress style={{margin: 25}}/>
                                        }
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {("icon")}
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
                                        media.append('icon', event.currentTarget.files[0])
                                        media.append('_method', 'patch')
                                        update&&this.changeIcon(media, data.id)
                                      }}
                                      accept="image/*"
                                      id="icon"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="icon">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    </CardActions>
                                  </Card>
                                </Grid>

                                    </div>
                                    <Grid item xs={10}>
                                    <Card className={classes.form}>
                              <CardHeader
                                      title={t("category_form")}
                                      />
                                      <Divider />
                                      <CardContent >
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
                                                defaultValue={update ? data.name.en : '' }
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                label={("category_name")}
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
                                                 defaultValue={update ? data.name.ar : ''}
                                                label={("arabic_name")}
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
                                                label={("order")}
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
                                              <Autocomplete
                                                {...defaultProps}
                                                id="disable-open-on-focus"
                                                disableOpenOnFocus
                                                helperText={!update && (props.errors.category && props.touched.category) && props.errors.category}
                                                onChange={(e, value) => {props.setFieldValue("category", value); }}
                                                renderInput={params => (
                                                  <TextField
                                                  name="category"
                                                    {...params}
                                                    variant="standard"
                                                    label={this.props.list}
                                                    placeholder="Favorites"
                                                    margin="normal"
                                                    fullWidth
                                                  />
                                                )}
                                              />
                                            </Grid>
                                          </Grid>
                                      </CardContent>
                                   </Card>
                                      <Button
                                      className={classes.btn}
                                      disabled={!update && !(props.isValid && props.dirty)}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        >
                                        {!this.state.showLoading&&t('done')}
                                        {this.state.showLoading&&<CircularProgress
                                        color='white'
                                          size={23}
                                        />}
                                        </Button>
                                    </Grid>
                                  </Grid>
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
                                                {t("please_add_svg_icon")}
                                              </Alert>
                                            </Snackbar>
                                            <Snackbar
                                                // autoHideDuration={10000}
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
                                                // autoHideDuration={10000}
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
                                        </div>
                                        </LayOut>
                                      </form>
                                    })}
                              </Formik>
                              </div>
                            );
                      }  
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["categories/addUpdate", "countries/validations"])(AccountDetails));