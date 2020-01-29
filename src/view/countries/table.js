import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { withTranslation } from "react-i18next";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {TableContainer, Avatar} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import  Menu from '../menu';
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

 function CustomizedTables(props) {
  const classes = useStyles();
  const {t} = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t("country_name")}</StyledTableCell>
            <StyledTableCell align="right">{t("isoCode")}</StyledTableCell>
            <StyledTableCell align="right">{t("phone_code")}</StyledTableCell>
            <StyledTableCell align="middle">{t("translation:edit")}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.countriesList.map(country => (
            <StyledTableRow key={country.name}>
              <StyledTableCell component="th" scope="row">
                {country.label}
              </StyledTableCell>
              <StyledTableCell align="right">{country.code}</StyledTableCell>
              <StyledTableCell align="right">{country.phone}</StyledTableCell>
              <StyledTableCell align="right">
              <Menu country={country}
                    path={'/countries-list/update/'}
                    data={country}
                    url={'https://jsonplaceholder.typicode.com/users/'}
                        />
              </StyledTableCell>
              {/* <StyledTableCell align="right">
              <Avatar
                      style={{left:20 }}
                    >
                      <Link
                        to={{
                            pathname: '/countries-list/update/' +country.phone,
                          state: {
                            country: country
                          }
                        }}
                      >
                        <EditIcon />
                      </Link>
                    </Avatar>
              </StyledTableCell> */}
              {/* <StyledTableCell align="right">
              <Delete
                      countryId={country.phone}
                    />
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 
export default withTranslation(["countries/addApdate", "translation"])(CustomizedTables);