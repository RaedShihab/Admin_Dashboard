// import React from 'react';
// import * as Yup from 'yup';
// import { withStyles } from '@material-ui/styles';
// import { withTranslation } from "react-i18next";
// import {Formik} from 'formik'
// import PropTypes from 'prop-types';
// import { Snackbar, CircularProgress} from '@material-ui/core';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { Alert } from '@material-ui/lab';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardActions,
//   Divider,
//   Grid,
//   Button,
//   TextField, 
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Typography
// } from '@material-ui/core';
// import LayOut from '../../layOut';
// import {Axios} from '../axiosConfig';

// const useStyles = (() => ({
//   root: {
//   },
//   details: {
//     display: 'flex'
//   },
//   avatar: {
//     marginLeft: 'auto',
//     height: 110,
//     width: 100,
//     flexShrink: 0,
//     flexGrow: 0
//   },
//   progress: {
//     marginTop: 10
//   },
//   uploadButton: {
//     marginRight: 10
//   },
//   input: {
//     display: 'none',
//   },
//   form: {
//     backgroundColor: 'white',
//     borderRadius: '5px'
//   }
// }));

// class AccountDetails extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           openSnackSucc: false,
//           showLoading: false,
//           openSnackErr: false,
//           open422status: false,
//           selectedFile: null,
//           brands: [],
//         };
//       }
//       handleClose = (event, reason) => {
//         if (reason === 'clickaway') {
//           return;
//         }
//         this.setState({
//           openSnackSucc: false,
//           openSnackErr:false,
//           open422status: false
//         })
//       };
//       componentDidMount() {
//         Axios.get('/brands').then(res=> this.setState({brands: res.data.data}))
//       }
      
//     render() {
//       const idsArray = [];

//       const handleCheckBox = (e)=> {
//         let index
        
//         if(e.target.checked) {
//           idsArray.push(e.target.value)
//         }
//         else {
//           index = idsArray.indexOf(e.target.value)
//           idsArray.splice(index, 1)
//         }
//         console.log(idsArray)
//       }

//         const { t ,classes, data, patch} = this.props;
//         console.log(patch)
//         return (
//             <Formik
//                 initialValues={{
//                     name:data===undefined? '': data.name.en,
//                     arname: data===undefined? '': data.name.ar,
//                     order: data===undefined? '': data.order,
//                     id: data===undefined? '':  data.brand_id,
//                   }}
                  
//                   onSubmit={data => {
//                     // console.log(data)
//                       let dataa = new FormData();
//                         dataa.append('name[en]', data.name);
//                         dataa.append('name[ar]', data.arname);
//                         dataa.append('brand_id', data.id);
//                         dataa.append('order', data.order);
//                         patch && dataa.append('_method', 'patch');
//                     this.setState({
//                       showLoading:true
//                     })
//                     // console.log(dataa)
//                this.props.requist(dataa)
//                 .then(res =>{
//                     console.log(res)
//                     if(res.status === 201 || res.status === 200) {
//                       this.setState({
//                         showLoading: false,
//                         openSnackSucc: true,
//                         })
//                     }   
//                 })
//                 .catch(err => {
//                     console.log(err.response)
//                     if(err.response === undefined) {
//                       this.setState({
//                         openSnackErr:true,
//                         showLoading: false,
//                       })
//                     }
//                     if(err.response.status === 422) {
//                       this.setState({
//                         open422status:true,
//                         showLoading: false,
//                         })
//                     }
//                     if(err.response.status === 500) {
//                       this.setState({
//                         open500status:true,
//                         showLoading: false,
//                         })
//                     }
//                     this.setState({
//                     openSnackErr:true,
//                     showLoading: false,
//                     })
//                 })
//         }
//         }
//     render={(props=> {
//         return <form
//         autoComplete="off"
//             noValidate
//             onSubmit={props.handleSubmit}
//                 >
//                     <LayOut>
//                       <Card>
//                       <Grid
//                     className={classes.form}
//                     container
//                     spacing={4}
//                     >
//                     <Grid
//                         item
//                         lg={8}
//                         md={6}
//                         xl={8}
//                         xs={12}
//                         >
//                         <CardHeader
//                             // subheader={t("City Form")}
//                             title={t("model_form")}
//                             />
//                             <Divider />
//                             <CardContent>
//                                 <Grid
//                                 container
//                                 spacing={3}
//                                 >
//                                 <Grid
//                                     item
//                                     sm={6}
//                                     xs={12}
//                                 >
//                                     <TextField
//                                     defaultValue={data !== undefined? data.name.en : '' }
//                                     fullWidth
//                                     margin="dense"
//                                     label={t("name")}
//                                     name="name"
//                                     onChange={props.handleChange}
//                                     variant="outlined"
//                                     helperText={(props.errors.name && props.touched.name) && props.errors.name}
//                                     />
//                                 </Grid>
//                                 <Grid
//                                     item
//                                     sm={6}
//                                     xs={12}
//                                 >
//                                         <TextField
//                                         defaultValue={data!== undefined? data.name.ar : ''}
//                                         fullWidth
//                                         margin="dense"
//                                     label={t("arabic_name")}
//                                     name="arname"
//                                     onChange={props.handleChange}
//                                     variant="outlined"
//                                     helperText={(props.errors.arname && props.touched.arname) && props.errors.arname}
//                                     />
//                                 </Grid>
//                                 <Grid
//                                     item
//                                     sm={6}
//                                     xs={12}
//                                 >
//                                     <TextField
//                                     defaultValue={data!== undefined? data.order : ''}
//                                     fullWidth
//                                     margin="dense"
//                                         label={t("order_number")}
//                                         name="order"
//                                         onChange={props.handleChange}
//                                         variant="outlined"
//                                         helperText={(props.errors.order && props.touched.order) && props.errors.order}
//                                         />
//                                 </Grid>
//                                 <Grid
//                                     item
//                                     sm={6}
//                                     xs={12}
//                                     >
//                                     <FormControl fullWidth
//                                     margin="dense" variant="filled"
//                                     >
//                                         <InputLabel htmlFor="filled-age-native-simple">Brand</InputLabel>
//                                             <Select
//                                             native
//                                             onChange={props.handleChange('id')}
//                                             name='id'
//                                             >
//                                             {
//                                             this.state.brands.map(country=> {
//                                                 return <option value={country._id}>{country.name.en}</option>
//                                             })
//                                             }
//                                         </Select>
//                                     </FormControl>
//                                     </Grid>
//                                     <Grid
//                                     item
//                                     sm={12}
//                                     xs={12}
//                                 >
//                                 </Grid>
//                                 </Grid>
//                             </CardContent>
//                             <CardActions>
//                             <Button
//                                 color="primary"
//                                 variant="contained"
//                                 type="submit"
//                                 >
//                                 {!this.state.showLoading&&t('add')} 
//                                 {this.state.showLoading&&<CircularProgress
//                                     size={23}
//                                 />}
//                                 </Button>
//                             </CardActions>
//                             <div>
//                                 <Snackbar
//                                     autoHideDuration={3000}
//                                     onClose={this.handleClose}
//                                     open={this.state.openSnackSucc}
//                                 >
//                                     <Alert
//                                     onClose={this.handleClose}
//                                     severity="success"
//                                     style={{backgroundColor: 'green', color: 'white'}}
//                                     >
//                                     {t(this.props.response)}
//                                     </Alert>
//                                 </Snackbar>
//                                 <Snackbar
//                                     autoHideDuration={10000}
//                                     onClose={this.handleClose}
//                                     open={this.state.openSnackErr}
//                                 >
//                                     <Alert
//                                     onClose={this.handleClose}
//                                     severity="error"
//                                     style={{backgroundColor: 'red', color: 'white'}}
//                                     >
//                                     {t("please_try_again")}
//                                     </Alert>
//                                 </Snackbar>
//                                 <Snackbar
//                                     autoHideDuration={10000}
//                                     onClose={this.handleClose}
//                                     open={this.state.open422status}
//                                 >
//                                     <Alert
//                                     onClose={this.handleClose}
//                                     severity="error"
//                                     style={{backgroundColor: 'red', color: 'white'}}
//                                     >
//                                     {t("please_check_if_you_selected_a_brand")}
//                                     </Alert>
//                                 </Snackbar>
//                                 </div>
//                         </Grid>
//                     </Grid>
//                       </Card>
//                     </LayOut>
//         </form>
//         })}
//         validationSchema={data === undefined && Yup.object().shape({
//         name: Yup.string('Enter a name').required(t('cities/validations:name_is_required'))
//         .min(2, 'Seems a bit short...'),
//         arname: Yup.string('Enter a name').required(t('cities/validations:arabic_name_is_required'))
//         .min(2, 'Seems a bit short...'),
//         order: Yup.number().integer().required(t('countries/validations:required')),
//         })}
//             />
//           );
//     }  
// };

// AccountDetails.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
//   export default withStyles(useStyles)(withTranslation(["model/model", "countries/addUpdate"])(AccountDetails));

/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
    this.onTagsChange = this.onTagsChange.bind(this);
  }

  onTagsChange = (event, values) => {
    this.setState({
      tags: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.tags);
    });
  }

  render() {
    return (
      <div style={{ width: 500 }}>
        <Autocomplete
          multiple
          options={top100Films}
          getOptionLabel={option => option.title}
          defaultValue={[top100Films[13]]}
          onChange={this.onTagsChange}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
              margin="normal"
              fullWidth
            />
          )}
        />
      </div>
    );
  }
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
];