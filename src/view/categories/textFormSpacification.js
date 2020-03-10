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
import {Checkbox, Divider, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  btn: {
    margin: 20,
  },
  AddBtn: {
    margin: 5,
  },
});

function TextFormDialog(props) {
  const mainProps = props
  const {t, update} = props
  const classes = useStyles();

  return (
        <React.Fragment>
            <Formik
                initialValues={{
                    name:'',
                    lable: '',
                    arLable: '',
                    select: '',
                    required: ''
                  }}
                  onSubmit={data => {
                    console.log(data)
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string('Enter a name').required(t('countries/validations:name_is_required'))
                    .min(2, 'Seems a bit short...'),
                    lable: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                    .min(2, 'Seems a bit short...'),
                    arLable: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                    .min(2, 'Seems a bit short...'),
                  })}
            >
            {(props=> {
                    return <form>
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
                                // defaultValue={update ? data.name.en : '' }
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
                                    // defaultValue={update ? data.name.ar : ''}
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
                                // defaultValue={update? data.description.en : ''}
                                label={("arabic_lable")}
                                name="arLable"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                helperText={(props.errors.arLable && props.touched.arLable) && props.errors.arLable}
                                />
                            </Grid>
                                        </Grid>
                                </CardContent>
                                <FormGroup row>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        name="required"
                                        onChange={props.handleChange('required')}
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
                                        add
                                </Button>
                                    </form>}
                             )}
                    </Formik>
                </React.Fragment>
                );
                }
        
       export default withTranslation(["countries/addApdate", "countries/validations"])(TextFormDialog)