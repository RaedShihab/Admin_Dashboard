import React from 'react';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import Table from '../table';
import {Axios} from '../axiosConfig';
 import 
 {
  withStyles, 
  TableContainer,
  Paper,
} from '@material-ui/core';
import ApiService from '../../services/apis';

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
  Axios = Axios.get('/users')
  render() {
    return(
      <LayOut>
        <TableContainer component={Paper}>
     <Table
     Axios = {this.Axios}
     add={'USER'} 
     path={{update:'/users/update/', add: '/users/add-user/'}} 
     fetch={ApiService.fetchUsers()}
     url={'https://jsonplaceholder.typicode.com/users/'}
     column={"users"}
     searchUrl={'https://jsonplaceholder.typicode.com/users/'}
     filterUrl={'https://jsonplaceholder.typicode.com/users/'}
     />
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation(["users/usersTable", "translation"])(CustomizedTables));