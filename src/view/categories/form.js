import React from 'react';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik} from 'formik'
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
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Axios} from '../axiosConfig';
import LayOut from '../../layOut';
import FormDialog from './spesification'

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
          openSnackSucc: false,
          showLoading: false,
          showDeleteLoading: false,
          openSnackErr: false,
          openCoverValidation: false,
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
          categories: [],
          coverLoading: false,
          iconLoading: false,
          imageLoading: false,
          bannerLoading: false
        };
      }

      componentDidMount() {
        const {update} = this.props
    
        update &&
        this.setState({
          coverLoading: true,
          iconLoading: true,
          imageLoading: true,
          bannerLoading: true
          })

          update && this.props.getCategory(this.props.data.id).then(res=>{
            console.log(res.data.data)
          this.setState({
            coverLoading: false,
            iconLoading: false,
            imageLoading: false,
            bannerLoading: false,
            icon: res.data.data.icon,
            cover: res.data.data.media.cover,
            image: res.data.data.media.image,
            banner: res.data.data.media.banner
          })
        })

        Axios.get('/categories').then(res => {
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
                coverLoading: false
               })
            }
            if(type === 'image'){
              this.setState({
                image: res.data.data,
                imageLoading: false,
               })
            }
            if(type === 'banner'){
              this.setState({
                banner: res.data.data,
                bannerLoading: false
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
          this.setState({
            iconLoading: false,
            coverLoading: false,
            bannerLoading: false,
            imageLoading: false
          })
        })

      }

      changeIcon = (media) => {
        this.setState({iconLoading: true})
        this.props.updateIconRequist(media, '/icon')
        .then(res =>{
          console.log(res.data.data)
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
             iconLoading: false,
             showLoading: false,
             openSnackSucc: true,
           })
          }
        })
        .catch(err => {
          console.log(err.response)
          if(err.response.status === 422) {
           this.setState({
             iconLoading: false,
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
          open422status: false,
          openCoverValidation: false
        })
      };
       deleteMedia =(id, type)=> {
      this.setState({showDeleteLoading: true})
      Axios.delete(`/categories/${id}/media/delete/${type}`)
      .then(res=> {
        console.log(res)
        if(type === 'cover') {
          this.setState({
            cover: '',
            showDeleteLoading: false,
            openSnackSucc: true,
          })
        }
        if(type === 'banner') {
          this.setState({
            banner: '',
            showDeleteLoading: false,
            openSnackSucc: true,
          })
        }
        if(type === 'image') {
          this.setState({
            image: '',
            showDeleteLoading: false,
            openSnackSucc: true,
          })
        }
      })
      .catch(err=> {
        console.log(err.response)
        this.setState({
          showDeleteLoading: false,
          open500status:true,
        })
      })
     }
    render() {
 
        const { t ,classes, data, update} = this.props;
        const {coverLoading, iconLoading, imageLoading, bannerLoading, cover, banner, image} = this.state
        return (
            <div
              // {...rest}
              // className={classes.root}
            >
            <Formik
                initialValues={{
                    name:!update? '': data.name.en,
                    arname: !update? '': data.name.ar,
                    description: !update? '': data.description.en,
                    icon: null,
                    cover:  null,
                    banner:  null,
                    img:  null,
                    is_real_estate: !update?'' : data.is_real_estate,
                    select: !update? '' : data.parent_id,
                  }}
                  onSubmit={data => {
                    console.log(data)
                      let values = new FormData();
                        values.append('name[en]', data.name);
                        values.append('name[ar]', data.arname);
                        // values.append('description', data.description);
                        values.append('parent', data.select===""? null : data.select);
                        update && values.append('_method', 'patch')
                        
                         values.append('icon', data.icon);
                        !update && data.cover !== null && values.append('media[cover]', data.cover);
                        !update && data.banner !== null&& values.append('media[banner]', data.banner);
                        !update && data.img !== null && values.append('media[image]', data.img);
                        values.append('is_real_estate', data.is_real_estate=== true? "1" : "0");
                        console.log(values)
                    this.setState({
                      showLoading:true
                    })
                this.props.request(values)
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
                            //  console.log(err.response.data["name.en"])
                            console.log(err.response)
                             if(err.response.status === 422) {
                               if(err.response.data.icon!== undefined){
                                this.setState({
                                  showLoading: false,
                                  openSnackErr:true,
                                })
                               }
                               if(err.response.data["media.cover"]!== undefined){
                                this.setState({
                                  showLoading: false,
                                  openCoverValidation:true,
                                })
                               }
                               if(err.response.data["media.banner"]!== undefined){
                                this.setState({
                                  showLoading: false,
                                  openCoverValidation:true,
                                })
                               }
                               if(err.response.data["media.image"]!== undefined){
                                this.setState({
                                  showLoading: false,
                                  openCoverValidation:true,
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
                  }
                                    validationSchema={Yup.object().shape({
                                      name: Yup.string('Enter a name').required(t('countries/validations:name_is_required'))
                                      .min(2, 'Seems a bit short...'),
                                      arname: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                                      .min(2, 'Seems a bit short...'),
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
                                  <Grid item xs={12}>
                                  <Card>
                                    <CardContent>
                                      <div className={classes.details}>
                                     {!coverLoading && <Avatar
                                          className={classes.avatar}
                                          src={this.state.cover}
                                        />}
                                          {coverLoading&&<CircularProgress style={{margin: 25}}/>}
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {t("cover")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                      name='cover'
                                      onChange={
                                        (event) => {
                                          if (!update&&event.target.files && event.target.files[0]) {
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
                                          update&&this.setState({coverLoading: true})
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
                                    {update && cover !== '' && cover !== null && cover !== undefined && <Button 
                                    onClick={()=>this.deleteMedia(data.id, "cover")}
                                    className={classes.deleteBtn}
                                    variant="contained" 
                                    color="secondary" 
                                    component="span">
                                      {!this.state.showDeleteLoading&&t('delete')}
                                        {this.state.showDeleteLoading&&<CircularProgress
                                          size={23}
                                        />}
                                      </Button>}
                                    </CardActions>
                                  </Card>
                                </Grid> 
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
                                    </CardActions>
                                  </Card>
                                </Grid>
                                <Grid item  xs={12}>
                                  <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                      {!bannerLoading&&<Avatar
                                          className={classes.avatar}
                                          src={this.state.banner}
                                        />}
                                          {bannerLoading&&<CircularProgress style={{margin: 25}}/>}
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {t("banner")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                    name="banner"
                                      onChange={(event) => {
                                        if (!update&&event.target.files && event.target.files[0]) {
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
                                        update&& this.setState({bannerLoading: true})
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
                                    {update && banner !== '' && banner !== undefined && banner !== null && <Button
                                    onClick={()=>this.deleteMedia(data.id, "banner")}
                                    className={classes.deleteBtn} 
                                    variant="contained" 
                                    color="secondary"
                                    component="span">
                                       {!this.state.showDeleteLoading&&t('delete')}
                                        {this.state.showDeleteLoading&&<CircularProgress
                                          size={23}
                                        />}
                                      </Button>}
                                    </CardActions>
                                  </Card>
                              </Grid>
                              <Grid item  xs={12}>
                                <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                      {!imageLoading&&<Avatar
                                          className={classes.avatar}
                                          src={this.state.image}
                                        />}
                                          {imageLoading&&<CircularProgress style={{margin: 25}}/>}
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {t("image")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                    name="image"
                                      onChange={(event) => {
                                        if (!update&&event.target.files && event.target.files[0]) {
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
                                          update&&this.setState({imageLoading: true})
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
                                    {update && image !== '' && image !== undefined && image !== null && <Button
                                    onClick={()=>this.deleteMedia(data.id, "image")}
                                    className={classes.deleteBtn} 
                                    variant="contained" 
                                    color="secondary" 
                                    component="span">
                                       {!this.state.showDeleteLoading&&t('delete')}
                                        {this.state.showDeleteLoading&&<CircularProgress
                                          size={23}
                                        />}
                                      </Button>}
                                    </CardActions>
                                  </Card>
                                  </Grid>
                                    </div>
                                    <Grid item xs={9}>
                                    <Card className={classes.form}>
                              {/* <CardHeader
                              className={classes.CardHeader}
                                      title={t("category_form")}
                                      /> */}
                                      <FormDialog/>
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
                                                 defaultValue={update ? data.name.ar : ''}
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
                                              sm={9}
                                              xs={12}
                                            >
                                                <TextField
                                                defaultValue={update? data.description.en : ''}
                                                label={t("category_discription")}
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
                                              <FormControl fullWidth
                                                margin="dense" variant="filled"
                                                >
                                                  <InputLabel htmlFor="filled-age-native-simple">{t("category")}</InputLabel>
                                                      <Select
                                                      native
                                                      onChange={props.handleChange}
                                                      name="select"
                                                      >
                                                        <option value="">
                                                         
                                                        </option>
                                                      {
                                                      this.state.categories.map(category=> {
                                                          return <option value={category.id}>{category.name.en}</option>
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
                                                      label={t("is_it_a_real_estate")}
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
                                      disabled={!update && !(props.isValid && props.dirty)}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        >
                                        {!this.state.showLoading&&t('done')}
                                        {this.state.showLoading&&<CircularProgress
                                        color="white"
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
                                              autoHideDuration={3000}
                                              onClose={this.handleClose}
                                              open={this.state.openCoverValidation}
                                            >
                                              <Alert
                                                onClose={this.handleClose}
                                                severity="error"
                                                style={{backgroundColor: 'red', color: 'white'}}
                                              >
                                                {t("media_sholud_be_svg")}
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
                                                {t("server_err")}
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
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import TextField from '@material-ui/core/TextField';
// import {Grid,CardContent,} from '@material-ui/core';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import {Checkbox, Divider, Button, DialogContent, Dialog} from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: '33.33%',
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
// }));

// export default function ControlledExpansionPanels() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Dialog open={true}>
//       <DialogContent>
//       <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1bh-content"
//           id="panel1bh-header"
//         >
//           <Typography className={classes.heading}>General settings</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//         <form>
//                          <CardContent>
//                             <Grid
//                             container
//                             spacing={3}
//                             >
//                                 <Grid
//                                 item
//                                 sm={12}
//                                 xs={12}
//                             >
//                                 <Typography variant='h5'>Text Specification</Typography>
//                             </Grid>
//                             <Grid
//                                 item
//                                 sm={12}
//                                 xs={12}
//                             >
//                                 <TextField
//                                 // defaultValue={update ? data.name.en : '' }
//                                 fullWidth
//                                 margin="dense"
//                                 variant="outlined"
//                                 label={("name")}
//                                 name="name"
//                                 // onChange={props.handleChange}
//                                 // helperText={(props.errors.name && props.touched.name) && props.errors.name}
//                                 />
//                             </Grid>
//                             <Grid
//                                 item
//                                 sm={6}
//                                 xs={12}
//                             >
//                                 <TextField
//                                     // defaultValue={update ? data.name.ar : ''}
//                                 label={("lable")}
//                                 name="arname"
//                                 // onChange={props.handleChange}
//                                 fullWidth
//                                 margin="dense"
//                                 variant="outlined"
//                                 // helperText={(props.errors.arname && props.touched.arname) && props.errors.arname}
//                                 />
//                             </Grid>
//                             <Grid
//                                 item
//                                 sm={6}
//                                 xs={12}
//                             >
//                                 <TextField
//                                 // defaultValue={update? data.description.en : ''}
//                                 label={("lable")}
//                                 name="description"
//                                 // onChange={props.handleChange}
//                                 fullWidth
//                                 margin="dense"
//                                 variant="outlined"
//                                 // helperText={(props.errors.description && props.touched.description) && props.errors.description}
//                                 />
//                             </Grid>
//                                         </Grid>
//                                 </CardContent>
//                                 <FormGroup row>
//                                 <FormControlLabel
//                                     control={
//                                     <Checkbox
//                                         // checked={state.checkedB}
//                                         // onChange={handleChange('checkedB')}
//                                         value="checkedB"
//                                         color="primary"
//                                     />
//                                     }
//                                     label="Required"
//                                 />
//                                 </FormGroup>
//                                 <Divider/>
//                                     <Button 
//                                     className={classes.AddBtn}
//                                     // onClick={mainProps.handleClose}
//                                      variant="contained" color="primary">
//                                         add
//                                 </Button>
//                                     </form>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       </DialogContent>
//     </Dialog>
//   );
// }