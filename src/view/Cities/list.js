import React from 'react';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import CountriesTable from '../table';
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
  }
  Axios = (page, rows)=> Axios.get(`/locations/cities/?page=${page}&per_page=${rows}`)
  getAxios = ()=> Axios.get(`/locations/countries`)
  getById = (id)=> Axios.get(`/locations/countries/${id}/cities`)
  render() {
    return(
      <LayOut>
        <TableContainer component={Paper}>
     <CountriesTable
     deleteURL={'/locations/cities'}
     Axios = {this.Axios}
     getAxios={this.getAxios}
     path={{update:'/cities/edit/', add: '/cities/create'}} 
     column={"cities"} 
     url={'https://jsonplaceholder.typicode.com/users/'}
     searchUrl={'https://jsonplaceholder.typicode.com/cuntries/'}
     getById={this.getById}
     showFilter={true}
     getBrands={false}
     list={"Countries"}
     />
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation("usersTable")(CustomizedTables));