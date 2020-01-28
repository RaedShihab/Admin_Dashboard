import React from 'react';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import {countries} from './service';
import CountriesTable from './table'
 import 
 { Dialog,
  DialogTitle,
  Typography, 
  Button, 
  withStyles, 
  TableContainer, 
  Paper,
} from '@material-ui/core';
// import ApiService from '../services/apis'

const useStyles = ({
  table: {
    minWidth: 700,
  },
  title: {
      padding: '10px 10px 10px 10px',
      margin: '0 10px',
      textAlign: 'center'
  }
});

class CustomizedTables extends React.Component {
  state= {
    users: [],
    open: false
  }
  // componentDidMount() { 
  //   this.setState({open: true})
  //   ApiService.fetchUsers().then(res => {
  //     this.setState({open: false})
  //     this.setState({users: res.data})
  //   })
  // }
  render() {
    const {classes, t} = this.props
    return(
      <LayOut>
        <Dialog
        open={this.state.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Please Wait...</DialogTitle>
      </Dialog>
        <TableContainer component={Paper}>
      <div >
      <Typography className={classes.title} variant="h5" component="h2">
          {t("countries_table")}
          <Button className={classes.title} variant="contained" color="primary" href="/countries-list/add-country">
            {t("add_country")}
          </Button>
        </Typography>
      </div>
     <CountriesTable countriesList={countries}/>
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation(["countries/list", "translation"])(CustomizedTables));