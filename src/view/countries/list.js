import React from 'react';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import Table from '../table'
 import 
 {
  withStyles, 
  TableContainer, 
  Paper,
} from '@material-ui/core';
import ApiService from '../../services/apis'

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
    countries: [],
    open: false
  }
  columns = [
    { name: "id", label: "ID" },
    { name: "phone", label: "Phone" },
    { name: "label", label: "Name" },
    { name: "code", label: "Code" },
  ];
  render() {
    return(
      <LayOut>
        <TableContainer component={Paper}>
     <Table add={'COUNTRY'} path={{update:'/countries-list/update/', add: '/countries-list/add-country/'}} fetch={ApiService.fetchCountries()} columns={this.columns} url={'https://jsonplaceholder.typicode.com/users/'}/>
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation(["countries/list", "translation"])(CustomizedTables));