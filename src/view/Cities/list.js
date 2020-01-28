import React from 'react';
import { withTranslation } from "react-i18next";
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteUser from './delete';
import LayOut from '../../layOut';
import {countries} from './service';
import CountriesTable from './table'
 import 
 { Dialog,
  DialogTitle,
  TableRow, 
  Typography, 
  Button, 
  Avatar, 
  withStyles, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
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
          {t("cities_table")}
          <Button className={classes.title} variant="contained" color="primary" href="/cities-list/add-city">
            {t("add_city")}
          </Button>
        </Typography>
      </div>
     <CountriesTable countriesList={countries}/>
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation("usersTable")(CustomizedTables));