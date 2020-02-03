import React from 'react'; 
import {TextField,Button, Grid, Typography} from '@material-ui/core';
import { withTranslation } from "react-i18next";

class Form extends React.Component {
     render() {
         const{t, keyy} = this.props
         console.log(this.props.disabled)
        return(
            <React.Fragment>
                  <Typography style={{marginBottom: 10}} variant='h5'>
                        {t("users/users:"+this.props.keyy.title)}
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
                      variant="filled"
                        autoComplete="fname"
                        fullWidth
                        helperText={this.props.helperText}
                        label={t("user_name")}
                        name="name"
                        onChange={this.props.onChang}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={6}
                      xs={12}
                    >
                      <TextField
                      defaultValue={this.props.email}
                      disabled= {this.props.disabled}
                      variant="filled"
                        autoComplete="fname"
                        fullWidth
                        helperText={this.props.helperTextEmail}
                        label={t("email")}
                        name="email"
                        onChange={this.props.onChang}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={6}
                      xs={12}
                    >
                      <TextField
                      variant="filled"
                      type='password'
                        autoComplete="fname"
                        fullWidth
                        helperText={this.props.helperTextPassword}
                        label={t("password")}
                        name="password"
                        onChange={this.props.onChang}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={6}
                      xs={12}
                    >
                      <TextField
                      variant="filled"
                      type='password'
                        autoComplete="fname"
                        fullWidth
                        helperText={this.props.helperTextConfigPassword}
                        label={t("password_confirmation")}
                        name="password_confirmation"
                        onChange={this.props.onChang}
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

export default withTranslation(["translation", "users/users"])(Form);