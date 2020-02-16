import React from 'react';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik} from 'formik'
import PropTypes from 'prop-types';
import { Snackbar, CircularProgress, Avatar, Typography} from '@material-ui/core';
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
  form: {
    backgroundColor: 'white', borderRadius: 5
    }
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
          file:{},
          categories: []
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
      componentDidMount() {
        Axios.get('/categories').then(res=> this.setState({categories: res.data.data}))
      }
    render() {
        const { t ,classes } = this.props;
        return (
            <div>
            <Formik
                initialValues={{
                    name:'',
                    arname: '',
                    id: '',
                    order: ''
                  }}
                  onSubmit={data => {
                      const values     = {
                          "name" : {
                              "en" : data.name,
                              "ar" : data.arname
                          },
                          "category_id": data.id,
                          "order": data.order,
                          "icon" : this.state.file,
                      }
                      console.log(values)
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
                                  lg={3}
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
                                        {t("brand")}
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
                                    <Card className={classes.form}>
                                    <CardHeader
                                      title="Adding Brand"
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
                                                label={t("order")}
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
                                    <FormControl fullWidth
                                    margin="dense" variant="filled">
                                        <InputLabel htmlFor="filled-age-native-simple">Country</InputLabel>
                                            <Select
                                            native
                                            onChange={props.handleChange('id')}
                                            name='id'
                                            >
                                            {
                                            this.state.categories.map(category=> {
                                                return <option value={category._id}>{category.name.en}</option>
                                            })
                                            }
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                          </Grid>
                                      </CardContent>
                                      <CardActions>
                                      <Button
                                      style={{marginBottom: 30}}
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
                                      <Divider />
                                    </Card>
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
                    order: Yup.string('Enter a description').required(t('countries/validations:description_is_required'))
                  })}
            />
            </div>
          );
    }  
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["countries/addApdate", "countries/validations"])(AccountDetails));