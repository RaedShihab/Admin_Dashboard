import React from 'react';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik} from 'formik'
import PropTypes from 'prop-types';
import { CircularProgress, Avatar, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
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
  IconButton
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Axios} from '../../axiosConfig';
import LayOut from '../../../layOut';

const useStyles = ((theme) => ({
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
    backgroundColor: 'white', borderRadius: 5, marginTop: 10,
    ['@media (max-width:781px)']: {
      width: '80%',
      position: 'absolute',
    },
  },
    btn: {
      margin: 14, width: '25%'
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
          formLoading: false,
          message: '',
          openSnackSucc: false,
          showLoading: false,
          openSnackErr: false,
          icon: '',
          categories: [],
          iconLoading: false,
          enName: '',
          arName: '',
          category_id: '',
          arrayValues: [],
          quote: '',
          n_days: '',
        };
      }

      componentDidMount() {
        const {update} = this.props
        update &&
        this.setState({
          formLoading: true,
          iconLoading: true,
          })

          update && this.props.getCategory(this.props.data.id).then(res=>{
            console.log(res.data.data)
          this.setState({
            formLoading: false,
            iconLoading: false,
            icon: res.data.data.icon,
          enName: res.data.data.name.en,
          arName: res.data.data.name.ar,
          order: res.data.data.order,
          category_id: res.data.data.category_id
          })
        })

        Axios.get('/categories').then(res => {
          this.setState({categories: res.data.data})
          })
      }

      changeIcon = (media, id) => {
        const {t} = this.props
        this.setState({iconLoading: true})
        this.props.updateIcon(media, id)
        .then(res =>{
          console.log(res)
          if(res.status === 201) {
           this.setState({
            icon: res.data.message,
            message: t('the_brand_has_added_successfuly'),
            iconLoading: false,
             showLoading: false,
             openSnackSucc: true,
           })
          }
          if(res.status === 200) {
           this.setState({
             icon: res.data.message,
             message: t('the_brand_has_updated_successfuly'),
             iconLoading: false,
             showLoading: false,
             openSnackSucc: true,
           })
          }
        })
        .catch(err => {
          console.log(err.response)
          if(err.response.status === 422) {
            if(err.response.data.icon!== undefined){
              this.setState({
                message: t('please choose SVG icon'),
                 iconLoading: false,
                 showLoading: false,
                 openSnackErr:true,
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

      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
          openSnackSucc: false,
          openSnackErr:false,
        })
      };

    render() {

      const handleDaysChange = (e)=> {
        this.setState({
          n_days: e.target.value
        })
  }
      const handleEnValueChange = (e)=> {
        this.setState({
          quote: e.target.value
        })
      }

      const pushingValues = (n_days, quote)=> {
      if(n_days!== ''&& quote!== '') {
        this.setState({
          arrayValues: [...arrayValues, {n_days:n_days, quote: quote}],
          quote: '',
          n_days: '',
        })
      }
      console.log(arrayValues)
    }
    
    const removeValue = (value)=> {
      const index = arrayValues.indexOf(value)
      const newArr = arrayValues.filter((val, i)=> {
        return i !== index
      })
      this.setState({
        arrayValues: newArr
      })
    }

      const dataList = this.state.categories
        const listedData = dataList.map(item => {return {name: item.name.en, id: item.id}});
        const defaultProps = {
          options: listedData,
          getOptionLabel: option => option.name,
        };
 
        const { t ,classes, data, update, submitForm} = this.props;
        const {iconLoading, message, formLoading, enName, arName, order, category_id, arrayValues, quote, n_days} = this.state
        return (
            <div>
              {formLoading&&<LayOut>
              <CircularProgress size={100} style={{margin: '300px 0px 0px 500px'}}/>
            </LayOut>}
            {!formLoading && <Formik
                initialValues={{
                    name:!update? '': enName,
                    arname: !update? '': arName,
                    description: !update? '':'',
                    icon: null,
                    category: !update? '': category_id,
                  }}
                  onSubmit={data => {
                    console.log(data)
                    console.log(arrayValues)
                      let values = new FormData();
                        values.append('name[en]', data.name);
                        values.append('name[ar]', data.arname);
                        values.append('order', data.order);
                        // values.append('description', data.description);
                        values.append('prices', arrayValues);
                        values.append('category_id', data.category.id);
                        update && values.append('_method', 'patch')
                        
                         !update&&values.append('icon', data.icon);               
                    this.setState({
                      showLoading:true
                    })
                        submitForm(values)
                           .then(res =>{
                             console.log(res)
                             if(res.status === 201) {
                              console.log(res)
                              this.setState({
                                showLoading: false,
                                message: t('the_package_has_added_successfuly'),
                                openSnackSucc: true,
                              })
                             }
                             if(res.status === 200) {
                              console.log(res)
                              this.setState({
                                showLoading: false,
                                message: t('the_package_has_added_successfuly'),
                                openSnackSucc: true,
                              })
                             }
                           })
                           .catch(err => {
                            //  console.log(err.response.data["name.en"])
                            console.log(err.response)
                             if(err.response.status === 422) {
                               if(err.response.data.icon !== undefined){
                                this.setState({
                                  showLoading: false,
                                  message: t('please_add_svg_file'),
                                  openSnackErr:true,
                                })
                               }
                             }
                             if(err.response.status === 500) {
                              console.log(err.response)
                              this.setState({
                                showLoading: false,
                                message: 'Server Error',
                                openSnackErr:true,
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
                                        />}
                                          {iconLoading&&<CircularProgress style={{margin: 25}}/>}
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {t("icon")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                    name='icon'
                                      onChange={(event) => {
                                        if (!update&&event.target.files && event.target.files[0]) {
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
                                    <Grid item xs={9}>
                                    <Card className={classes.form}>
                                    <Grid
                                      container
                                      // spacing={1}
                                    >
                                    </Grid>
                              {!update&&<CardHeader
                              className={classes.CardHeader}
                                      title={t("package_form")}
                                      />}
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
                                                defaultValue={update ? enName: '' }
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
                                                 defaultValue={update ? arName : ''}
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
                                sm={5}
                                xs={12}
                            >
                                <TextField
                                value={quote}
                                label={("quote")}
                                name="quote"
                                onChange={handleEnValueChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                sm={5}
                                xs={12}
                            >
                                <TextField
                                value={n_days}
                                label={("n_days")}
                                name="n_days"
                                onChange={handleDaysChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                sm={2}
                                xs={12}
                            >
                              <IconButton
                              onClick={()=>pushingValues(n_days, quote)}
                              >
                                  <AddCircleOutlineIcon fontSize='large' color='primary'/>
                              </IconButton>
                            </Grid>
                            {
                              arrayValues.map(value => {
                              return <React.Fragment key={Math.random()}>
                            <Grid
                            container
                            spacing={3}
                            >
                               <Grid
                              item
                              sm={4}
                              xs={12}
                          >
                              <TextField
                              defaultValue={value.quote}
                              label={("quote")}
                              name="quote"
                              onChange={props.handleChange}
                              fullWidth
                              margin="dense"
                              variant='filled'
                              />
                          </Grid>
                          <Grid
                              item
                              sm={4}
                              xs={12}
                          >
                              <TextField
                              defaultValue={value.n_days}
                              label={("number_of_days")}
                              name="n_days"
                              onChange={props.handleChange}
                              fullWidth
                              margin="dense"
                              variant='filled'
                              />
                          </Grid>
                          <Grid
                                item
                                sm={2}
                                xs={12}
                            >
                              <IconButton
                              onClick={()=>removeValue(value)}
                              >
                                  <RemoveCircleOutlineIcon fontSize='large' color='primary'/>
                              </IconButton>
                            </Grid>
                            </Grid>
                              </React.Fragment>
                              })
                            }
                                            <Grid
                                              item
                                              sm={12}
                                              xs={12}
                                            >
                                              <Autocomplete
                                                {...defaultProps}
                                                id="disable-open-on-focus"
                                                disableOpenOnFocus
                                                helpertext={!update && (props.errors.category && props.touched.category) && props.errors.category}
                                                onChange={(e, value) => {props.setFieldValue("category", value.id); }}
                                                renderInput={params => (
                                                  <TextField
                                                  name="category"
                                                    {...params}
                                                    variant="standard"
                                                    label={this.props.list}
                                                    placeholder={t("choose_category")}
                                                    margin="normal"
                                                    fullWidth
                                                  />
                                                )}
                                              />
                                            </Grid>
                                            </Grid>
                                      </CardContent>
                                      <Button
                                      className={classes.btn}
                                      disabled={!update && !(props.isValid && props.dirty)}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        >
                                        {!this.state.showLoading&&t('done')}
                                        {this.state.showLoading&&<CircularProgress
                                          size={23}
                                        />}
                                        </Button>
                                   </Card>
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
                                                {message}
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
                                                {message}
                                              </Alert>
                                            </Snackbar>
                                          </div>
                                        </div>
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
  export default withStyles(useStyles)(withTranslation(["brand/brand", "countries/validations"])(AccountDetails));