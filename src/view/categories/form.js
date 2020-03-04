import React from 'react';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik, Field} from 'formik'
import PropTypes from 'prop-types';
import { CircularProgress, Avatar, Typography} from '@material-ui/core';
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
          iconFile: document.getElementById('icon'),
          cover: '',
          coverFile: {},
          banner: '',
          bannerFile: {},
          image: '',
          imgFile: {},
          checked: true,
          selectedValue: 'a',
          categories: []
        };
      }

      componentDidMount() {
        const {update} = this.props

        update &&
        this.props.getCategory(this.props.data.id).then(res=>{
          console.log('working')
          this.setState({
            icon: res.data.data.icon,
            cover: res.data.data.media.cover,
            image: res.data.data.media.image,
            banner: res.data.data.media.banner
          })
        })

        Axios.get('/categories').then(res => {
          console.log('workinggg')
          console.log(res.data.data)
          this.setState({categories: res.data.data})
          })
      }

      chengeMedia = (media, type)=> {
        this.props.updateMedia(media, type)
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
            if(type === 'cover'){
              this.setState({
                cover: res.data.data,
               })
            }
            if(type === 'image'){
              this.setState({
                image: res.data.data,
               })
            }
            if(type === 'banner'){
              this.setState({
                banner: res.data.data,
               })
            }
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

      changeIcon = (media) => {
        this.props.updateIconRequist(media, '/icon')
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
             icon: res.data.data,
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
     handleChange = event => {
        this.setState({checked:event.target.checked});
      };
      handleChekced = e => {
        this.setState({selectedValue:e.target.value});
      }
    render() {
 
        const { t ,classes, data, update} = this.props;

        return (
            <div
              // {...rest}
              // className={classes.root}
            >
            <Formik
                initialValues={{
                    name:data===undefined? '': data.name.en,
                    arname: data===undefined? '': data.name.ar,
                    description: data===undefined? '': data.description.en,
                    icon: null,
                    cover:  null,
                    banner:  null,
                    img:  null,
                    is_real_estate: '',
                    select: ''
                  }}
                  onSubmit={data => {
                    console.log(data)
                      let values = new FormData();
                        values.append('name[en]', data.name);
                        values.append('name[ar]', data.arname);
                        // values.append('description', data.description);
                        values.append('parent', data.select);
                        
                        !update && values.append('icon', data.icon);
                        !update && values.append('media[cover]', data.cover);
                        !update && values.append('media[banner]', data.banner);
                        !update && values.append('media[image]', data.img);
                        !update && values.append('is_real_estate', data.is_real_estate);
                        console.log(values)
                        return;
                    this.setState({
                      showLoading:true
                    })
                this.props.requist(values)
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
                render={(props=> {
                  console.log(props)
                    return <form
                    autoComplete="off"
                     noValidate
                      onSubmit={props.handleSubmit}
                           >
                             <LayOut>
                             <div className={classes.root}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                  <Card>
                                    <CardContent>
                                      <div className={classes.details}>
                                      <Avatar
                                          className={classes.avatar}
                                          src={this.state.cover}
                                        />
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {("cover")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                      name='cover'
                                      onChange={
                                        (event) => {
                                          if (event.target.files && event.target.files[0]) {
                                            let reader = new FileReader();
                                            reader.onload = (e) => {
                                              this.setState({
                                                cover: e.target.result,
                                              });
                                            };
                                            reader.readAsDataURL(event.target.files[0]);
                                          }
                                          props.setFieldValue("cover", event.currentTarget.files[0]);
                                          const media = new FormData();
                                          media.append('image', event.currentTarget.files[0])
                                          media.append('_method', 'patch')
                                          update&&this.chengeMedia(media, 'cover')
                                        }
                                      }
                                      accept="image/*"
                                      id="cover"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="cover">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    {data !==undefined&&<Button className={classes.deleteBtn} variant="contained" color="secondary" component="span">
                                        delete
                                      </Button>}
                                    </CardActions>
                                  </Card>
                                </Grid> 
                                <div className={classes.root}>
                                <Grid item  xs={12}>
                                  <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                      <Avatar
                                          className={classes.avatar}
                                          src={this.state.icon}
                                        />
                                         {/* {data !== undefined&&<Avatar
                                          className={classes.avatar}
                                          src={this.state.icon===''? data.icon: this.state.icon}
                                        />}
                                       {data === undefined && <Avatar
                                          className={classes.avatar}
                                          src={this.state.icon}
                                        />} */}
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
                                        if (event.target.files && event.target.files[0]) {
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
                                        update&&this.changeIcon(media)
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
                                    {data !==undefined&&<Button className={classes.deleteBtn} variant="contained" color="secondary" component="span">
                                        delete
                                      </Button>}
                                    </CardActions>
                                  </Card>
                                </Grid>
                                <Grid item  xs={12}>
                                  <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                      <Avatar
                                          className={classes.avatar}
                                          src={this.state.banner}
                                        />
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {("banner")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                    name="banner"
                                      onChange={(event) => {
                                        if (event.target.files && event.target.files[0]) {
                                          let reader = new FileReader();
                                          reader.onload = (e) => {
                                            this.setState({
                                              banner: e.target.result,
                                            });
                                          };
                                          reader.readAsDataURL(event.target.files[0]);
                                        }
                                        props.setFieldValue("banner", event.currentTarget.files[0]);
                                        const media = new FormData();
                                        media.append('image', event.currentTarget.files[0])
                                        media.append('_method', 'patch')
                                        const type = 'banner'
                                        update&&this.chengeMedia(media, type)
                                      }}
                                      accept="image/*"
                                      id="banner"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="banner">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    {data !==undefined&&<Button className={classes.deleteBtn} variant="contained" color="secondary" component="span">
                                        delete
                                      </Button>}
                                    </CardActions>
                                  </Card>
                              </Grid>
                              <Grid item  xs={12}>
                                <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                      <Avatar
                                          className={classes.avatar}
                                          src={this.state.image}
                                        />
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {("image")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                    name="image"
                                      onChange={(event) => {
                                        if (event.target.files && event.target.files[0]) {
                                          let reader = new FileReader();
                                          reader.onload = (e) => {
                                            this.setState({
                                              image: e.target.result,
                                            });
                                          };
                                          reader.readAsDataURL(event.target.files[0]);
                                        }
                                        props.setFieldValue("img", event.currentTarget.files[0]);
                                          const media = new FormData();
                                          media.append('image', event.currentTarget.files[0])
                                          media.append('_method', 'patch')
                                          const type = 'image'
                                          update&&this.chengeMedia(media, type)
                                      }}
                                      accept="image/*"
                                      id="img"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="img">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    {data !==undefined&&<Button className={classes.deleteBtn} variant="contained" color="secondary" component="span">
                                        delete
                                      </Button>}
                                    </CardActions>
                                  </Card>
                                  </Grid>
                                    </div>
                                    <Grid item xs={9}>
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
                                                defaultValue={data !== undefined? data.name.en : '' }
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
                                                 defaultValue={data!== undefined? data.name.ar : ''}
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
                                              sm={9}
                                              xs={12}
                                            >
                                                <TextField
                                                defaultValue={data!== undefined? data.description.en : ''}
                                                label={("category_discription")}
                                                name="description"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                helperText={(props.errors.description && props.touched.description) && props.errors.description}
                                                />
                                            </Grid>
                                            <Grid
                                              item
                                              sm={3}
                                              xs={12}
                                            >
                                              <FormControl variant="filled" className={classes.formControl}>
                                              <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                                              <Select
                                              name="select"
                                              autoWidth={true}
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                value=""
                                                onChange={props.handleChange}
                                              >
                                                {
                                                  this.state.categories.map(category => {
                                                  return <MenuItem value={category.id}>{category.name.en}</MenuItem>
                                                  })
                                                }
                                              </Select>
                                            </FormControl>
                                            </Grid>
                                            <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                              <Grid container 
                                              // justify="center"
                                              // spacing={6}
                                              >
                                                  <Grid  item>
                                                  <FormControlLabel
                                                      control={
                                                        <Checkbox
                                                          name="is_real_estate"
                                                          onChange={props.handleChange('is_real_estate')}
                                                          value={true}
                                                          inputProps={{ 'aria-label': 'primary checkbox' }} />
                                                      }
                                                      label={t("it_is_real_estate")}
                                                      />
                                             </Grid>
                                             </Grid>
                                             </Grid>
                                            </Grid>
                                          </Grid>
                                      </CardContent>
                                   </Card>
                                      <Button
                                      className={classes.btn}
                                      disabled={!(props.isValid && props.dirty)}
                                      // disabled={props.isValid}
                                      // disabled={!props.dirty}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        >
                                        {!this.state.showLoading&&t('done')}
                                        {this.state.showLoading&&<CircularProgress
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
                                    validationSchema={Yup.object().shape({
                                      name: Yup.string('Enter a name').required(t('countries/validations:name_is_required'))
                                      .min(2, 'Seems a bit short...'),
                                      arname: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                                      .min(2, 'Seems a bit short...'),
                                    })}
                              />
                              </div>
                            );
                      }  
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["categories/addUpdate", "countries/validations"])(AccountDetails));