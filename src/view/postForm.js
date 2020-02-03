import React from 'react';
import {TextField,Button, Grid, Typography} from '@material-ui/core';
import { withTranslation } from "react-i18next";

class Form extends React.Component {
    render() {
        const{t, keyy} = this.props
        return(
            <React.Fragment>
                <Typography style={{marginBottom: 10}} variant='h5'>
                    {t(keyy.title)}
                   </Typography>
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
                         fullWidth="bool"
                         helperText={this.props.helperText}
                         id="filled-multiline-static"
                         label="Multiline"
                         multiline
                         name="name"
                         onChange={this.props.onChang}
                         rows="4"
                         variant="filled"
                       />
 
                     </Grid>
                   </Grid>
                   <Button
                     color="primary"
                     style={{marginTop: 30}}
                     type="submit"
                     variant="contained"
                   >{t(keyy.btn)}
                   </Button>
            </React.Fragment>
        );
    }
}
export default withTranslation(["posts/addPost", 'posts/updatePost'])(Form);