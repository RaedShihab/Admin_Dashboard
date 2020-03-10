import React from 'react';
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

export default function NumberForm(props) {
  const mainProps = props
  const classes = useStyles();

  return (
        <React.Fragment>
            <Formik>
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
                                // helperText={(props.errors.name && props.touched.name) && props.errors.name}
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
                                name="arname"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                // helperText={(props.errors.arname && props.touched.arname) && props.errors.arname}
                                />
                            </Grid>
                            <Grid
                                item
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                // defaultValue={update? data.description.en : ''}
                                label={("lable")}
                                name="description"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                // helperText={(props.errors.description && props.touched.description) && props.errors.description}
                                />
                            </Grid>
                            <Grid
                                item
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                // defaultValue={update? data.description.en : ''}
                                label={("from")}
                                name="description"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                // helperText={(props.errors.description && props.touched.description) && props.errors.description}
                                />
                            </Grid>
                            <Grid
                                item
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                // defaultValue={update? data.description.en : ''}
                                label={("to")}
                                name="description"
                                onChange={props.handleChange}
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                // helperText={(props.errors.description && props.touched.description) && props.errors.description}
                                />
                            </Grid>
                                        </Grid>
                                </CardContent>
                                <FormGroup row>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        // checked={state.checkedB}
                                        // onChange={handleChange('checkedB')}
                                        value="checkedB"
                                        color="primary"
                                    />
                                    }
                                    label="Required"
                                />
                                </FormGroup>
                                <Divider/>
                                    <Button 
                                    className={classes.AddBtn}
                                    onClick={mainProps.handleClose} variant="contained" color="primary">
                                        add
                                </Button>
                                    </form>}
                             )}
                    </Formik>
                </React.Fragment>
                );
                }