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
    open: false
  }
  columns = [
    { name: "userId", label: "User ID" },
    { name: "id", label: "Post Number" },
    { name: "title", label: "Title" },
    { name: "body", label: "The Post" },
  ];
  render() {
    return(
      <LayOut>
        <TableContainer component={Paper}>
     <Table add={'POST'} path={{update:'/posts/update/', add: '/posts/add-post/'}} fetch={ApiService.fetchPosts()} columns={this.columns} url={'https://jsonplaceholder.typicode.com/posts/'}/>
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation(["countries/list", "translation"])(CustomizedTables));