import React from 'react'; 
import {TextField,Button, Grid, Typography} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withTranslation } from "react-i18next";

class Form extends React.Component {
     render() {
         const{t, keyy} = this.props
         console.log(this.props.disabled)
        return(
            <React.Fragment>
              <Typography style={{marginBottom: 10}} variant='h5'>
                    {t("add_city")}
              </Typography>
              <Grid
              style={{width: '50%'}}
                container
                spacing={3}
              >
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("city_name")}
                     name="name"
                     onChange={this.props.onChang}
                     variant="outlined"
                     helperText={this.props.helperText}
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
                     onChange={this.props.onChang}
                    variant="outlined"
                    helperText={this.props.helperTextArname}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("lon")}
                     name="lon"
                     onChange={this.props.onChang}
                    variant="outlined"
                    helperText={this.props.helperTextLon}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("lat")}
                     name="lat"
                     onChange={this.props.onChang}
                    variant="outlined"
                    helperText={this.props.helperTextLat}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                    <TextField
                     label={t("order_number")}
                     name="order"
                     onChange={this.props.onChang}
                    variant="outlined"
                    helperText={this.props.helperTextOrder}
                    />
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                >
                   <FormControl variant="filled">
                      <InputLabel htmlFor="filled-age-native-simple">Country</InputLabel>
                        <Select
                        native
                        onChange={this.props.onChang('id')}
                        name='id'
                        >
                        {
                          this.props.countries.map(country=> {
                            return <option value={country.code}>{country.label}</option>
                          })
                        }
                      </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button 
                color="primary"
                type="submit"
                variant="contained"
              >
              </Button>
            </React.Fragment>
        );
     }
}

export default withTranslation(["translation", "users/users"])(Form);