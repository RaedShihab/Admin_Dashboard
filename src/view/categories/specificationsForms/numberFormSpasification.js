import React from 'react';
import *  as Yup from 'yup';
import { withTranslation } from "react-i18next";
import {Formik} from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Grid,CardContent,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Checkbox, Divider, Snackbar, CircularProgress} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {Axios} from '../../axiosConfig';

const useStyles = makeStyles({
  btn: {
    margin: 20,
  },
  AddBtn: {
    margin: 5,
  },
  circularProgress: {
    margin: '50px 0px 0px 150px'
  }
});

function TextFormDialog(props) {
  const {t, update, categoryId, updateSpecification, numberSpacification, addSpecification} = props
  const classes = useStyles();
  const id = update? numberSpacification._id: categoryId
  const [openSnackSucc, setopenSnackSucc] = React.useState(false);
  const [openSnackErr, setopenSnackErr] = React.useState(false);
  const[message, setMessage] = React.useState('');
  const[loading, setLoading] = React.useState(false);
  const[gettingData, setGettingData] = React.useState(false);

  const[name, setname] = React.useState([])
  const[label, setLabel] = React.useState([])
  const[arLabel, setArLabel] = React.useState([])
  const[min, setMin] = React.useState([])
  const[max, setMax] = React.useState([])
  const[is_required, set_is_required] = React.useState([])

  const showSpecification = ()=> {
    setGettingData(true)
    Axios.get(`/categories/specifications/${numberSpacification._id}`)
    .then(res=> {
        setname(res.data.data.name)
        setLabel(res.data.data.label.en)
        setArLabel(res.data.data.label.ar)
        setMin(res.data.data.constraints.min)
        setMax(res.data.data.constraints.max)
        set_is_required(res.data.data.is_required==='1'?true: false)
        setGettingData(false)
        console.log(res.data.data)
    })
    .catch(err => {
        setGettingData(false)
        console.log(err.response)
    })
  }

  React.useEffect(()=> {
      update&&showSpecification()
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setopenSnackErr(false)
    setopenSnackSucc(false)
  };

  const handleCheck = ()=> {
    set_is_required(!is_required)
  }

  return (
        <React.Fragment>
             {gettingData&&
              <CircularProgress size="70px" className={classes.circularProgress}/>
            }
            {!gettingData&&<Formik
                initialValues={{
                    name: !update? '': name,
                    lable: !update? '': label,
                    arLable: !update? '': arLabel,
                    from: !update? '': min,
                    to: !update? '': max,
                    required: !update? '': is_required,
                  }}
                  onSubmit={data => {
                      console.log(data)
                      setLoading(true)
                    const booleanToInt = data.required? '1': '0'
                    const values = new FormData()
                    values.append('name', data.name);
                    values.append('label[en]', data.lable);
                    values.append('label[ar]', data.arLable);
                    values.append('constraints[min]', parseInt(data.from))
                    values.append('constraints[max]', parseInt(data.to))
                    !update && values.append('type', 'number');
                    values.append('is_required', booleanToInt);
                    const request = update? updateSpecification : addSpecification
                    request(id, values)
                    .then(res => {
                      console.log(res)
                      if(res.status === 200 || res.status === 201) {
                        setopenSnackSucc(true)
                        setMessage('the spacification has added successfuly')
                        setLoading(false)
                      }
                    })
                    .catch(err=> {
                      console.log(err.response)
                      if(err.response.status === 244) {
                        setopenSnackErr(true)
                        setMessage('please add unique name')
                        setLoading(false)
                      }
                      if(err.response.status === 404) {
                        setopenSnackErr(true)
                        setMessage('404 Page not found')
                        setLoading(false)
                      }
                    })
                  }}

                  validationSchema={Yup.object().shape({
                    name: Yup.string('Enter a name').required(t('required'))
                    .min(2, 'Seems a bit short...'),
                    lable: Yup.string('Enter a name').required(t('required'))
                    .min(2, 'Seems a bit short...'),
                    arLable: Yup.string('Enter a name').required(t('required'))
                    .min(2, 'Seems a bit short...'),
                    from: Yup.number().min(0).max(1000).required(t('required')),
                    to: Yup.number().min(0).max(1000).required(t('required')),
                  })}
            >
            {(props=> {
                    return <form
                            autoComplete="off"
                            noValidate
                            onSubmit={props.handleSubmit}>
                         <CardContent>
                            <Grid
                            container
                            spacing={3}
                            >
                            <Grid
                                item
                                sm={12}
                                xs={12}
                            >
                                <TextField
                                defaultValue={update ? name: '' }
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                label={("name")}
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
                                    defaultValue={update ? label : ''}
                                label={("lable")}
                                name="lable"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                helperText={(props.errors.lable && props.touched.lable) && props.errors.lable}
                                />
                            </Grid>
                            <Grid
                                item
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                defaultValue={update? arLabel : ''}
                                label={("arabic_lable")}
                                name="arLable"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                helperText={(props.errors.arLable && props.touched.arLable) && props.errors.arLable}
                                />
                            </Grid>
                            <Grid
                                item
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                defaultValue={update ? min : ''}
                                label={("from")}
                                name="from"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                helperText={(props.errors.from && props.touched.from) && props.errors.from}
                                />
                            </Grid>
                            <Grid
                                item
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                defaultValue={update ? max : ''}
                                label={("to")}
                                name="to"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                helperText={(props.errors.to && props.touched.to) && props.errors.to}
                                />
                            </Grid>
                                        </Grid>
                                </CardContent>
                                <FormGroup row>
                                <FormControlLabel
                                    control={
                                    update?
                                    <Checkbox
                                    checked={is_required}
                                    onClick={handleCheck}
                                        name="required"
                                        onChange={props.handleChange}
                                        value={true}
                                        color="primary"
                                    />
                                    :
                                    <Checkbox
                                        name="required"
                                        onChange={props.handleChange}
                                        value={true}
                                        color="primary"
                                    />
                                    }
                                    label="Required"
                                />
                                </FormGroup>
                                <Divider/>
                                    <Button
                                    type="submit"
                                    className={classes.AddBtn}
                                    variant="contained" color="primary">
                                        {!loading&&'add'}
                                        {loading&&<CircularProgress color="white" size="25px"/>}
                                  </Button>
                                  <div>
                                            <Snackbar
                                              autoHideDuration={3000}
                                              onClose={handleClose}
                                              open={openSnackSucc}
                                            >
                                              <Alert
                                                onClose={handleClose}
                                                severity="success"
                                                style={{backgroundColor: 'green', color: 'white'}}
                                              >
                                                {message}
                                              </Alert>
                                            </Snackbar>
                                            <Snackbar
                                              autoHideDuration={3000}
                                              onClose={handleClose}
                                              open={openSnackErr}
                                            >
                                              <Alert
                                                onClose={handleClose}
                                                severity="error"
                                                style={{backgroundColor: 'red', color: 'white'}}
                                              >
                                                {message}
                                              </Alert>
                                            </Snackbar>
                                          </div>
                                    </form>}
                             )}
                    </Formik>}
                </React.Fragment>
                );
                }
        
export default withTranslation(["countries/addApdate", "countries/validations"])(TextFormDialog)