import React from 'react';
import {Link} from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {TableContainer, Avatar} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Delete from './delete';
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Code</StyledTableCell>
            <StyledTableCell align="right">Phone Code</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.countriesList.map(city => (
            <StyledTableRow key={city.name}>
              <StyledTableCell component="th" scope="row">
                {city.label}
              </StyledTableCell>
              <StyledTableCell align="right">{city.code}</StyledTableCell>
              <StyledTableCell align="right">{city.phone}</StyledTableCell>
              <StyledTableCell align="right">
              <Avatar
                      style={{left:20 }}
                    >
                      <Link
                        to={{
                            pathname: '/districts-list/update-district/' +city.phone,
                          state: {
                            city: city
                          }
                        }}
                      >
                        <EditIcon />
                      </Link>
                    </Avatar>
              </StyledTableCell>
              <StyledTableCell align="right">
              <Delete
                      cityId={city.phone}
                    />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 