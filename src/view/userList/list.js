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
    users: [],
  }
  columns = [
    { name: "id", label: "ID" },
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "address.street", label: "Adress" },
    { name: "address.street", label: "Edit" },
  ];
  render() {
    return(
      <LayOut>
        <TableContainer component={Paper}>
     <Table 
     add={'USER'} 
     path={{update:'/users/update/', add: '/users/add-user/'}} 
     fetch={ApiService.fetchUsers()}
     url={'https://jsonplaceholder.typicode.com/users/'}
     columns={this.columns}
     searchUrl={'https://jsonplaceholder.typicode.com/users/'}
     filterUrl={'https://jsonplaceholder.typicode.com/users/'}
     />
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation(["users/usersTable", "translation"])(CustomizedTables));