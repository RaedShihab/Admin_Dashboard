import React from 'react';
import { withTranslation } from "react-i18next";
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteUser from './DeleteUser';
import LayOut from '../../layOut';
import {TableRow, 
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

import ApiService from '../../services/apis'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

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
    users: []
  }
  componentDidMount() {
    ApiService.fetchUsers().then(res => this.setState({users: res.data}))
  }
  render() {
    const {classes, t} = this.props
    return(
      <LayOut>
        <TableContainer component={Paper}>
      <div >
      <Typography className={classes.title} variant="h5" component="h2">
          {t("User Table")}
          <Button className={classes.title} variant="contained" color="primary" href="/users/add-user">
            {t("ADD USER")}
          </Button>
        </Typography>
      </div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t("Name")}</StyledTableCell>
            <StyledTableCell align="right">{t("User Name")}</StyledTableCell>
            <StyledTableCell align="right">{t("Email")}</StyledTableCell>
            <StyledTableCell align="right">{t("Phone")}</StyledTableCell>
            <StyledTableCell align="right">{t("Edit")}</StyledTableCell>
            <StyledTableCell align="right">{t("Delete")}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.users.map(user => (
            <StyledTableRow key={user.name}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="right">{user.username}</StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.phone}</StyledTableCell>
              <StyledTableCell align="right">
              <Avatar
                      style={{left:20 }}
                    >
                      <Link
                        to={{
                          pathname: '/users/update/' +user.id,
                          state: {
                            user: user
                          }
                        }}
                      >
                        <EditIcon />
                      </Link>
                    </Avatar>
              </StyledTableCell>
              <StyledTableCell align="right">
                <DeleteUser
                      userId={user.id}
                    />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation("translations")(CustomizedTables));