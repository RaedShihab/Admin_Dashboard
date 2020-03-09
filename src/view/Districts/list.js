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
  Axios = (page, rows)=> Axios.get(`/locations/districts/?page=${page}&per_page=${rows}`);
  getAxios = ()=> Axios.get(`/locations/cities`)
  getById = (id)=> Axios.get(`/locations/cities/${id}/districts`);

  render() {
    return(
      <LayOut>
        <TableContainer component={Paper}>
     <Table 
     deleteURL={'/locations/districts'}
     Axios = {this.Axios}
     getAxios={this.getAxios}
      path={{update:'/districts/district/', add: '/districts/create/'}}
      column={"districts"} 
      url={'https://jsonplaceholder.typicode.com/users/'}
      searchUrl={'https://jsonplaceholder.typicode.com/countries/'}
      getById={this.getById}
      showFilter={true}
      showAutoComplete={true}
      list={"Cities"}
      />
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation("usersTable")(CustomizedTables));