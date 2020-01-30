import React from 'react';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import {countries} from './service';
import CountriesTable from './table'
 import 
 { Dialog,
  DialogTitle,
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
     <CountriesTable countriesList={countries}/>
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation(["countries/list", "translation"])(CustomizedTables));