import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import EditIcon from '@material-ui/icons/Edit';
import DeleteUser from './DeletePosts'
import LayOut from '../../layOut';
import {TableRow, Typography, Button, Container, Avatar, } from '@material-ui/core';
import {Link} from 'react-router-dom'
import InputIcon from '@material-ui/icons/Input'
import Paper from '@material-ui/core/Paper';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
// const classes = useStyles();

class PostsTable extends React.Component {
  state= {
    posts: []
  }
  componentDidMount() {
    ApiService.fetchPosts().then(res =>
       this.setState({posts: res.data}))
  }
  render() {
    const {classes} = this.props
    return(
      <LayOut>
        <TableContainer component={Paper}>
      <div >
      <Typography className={classes.title} variant="h5" component="h2">
          Posts Table
          <Button className={classes.title} variant="contained" color="primary" href="/posts/add-post">
            ADD POST
          </Button>
        </Typography>
      </div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Post Number</StyledTableCell>
            <StyledTableCell align="right">User ID</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Post</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.posts.map(post => (
            <StyledTableRow key={post.name}>
              <StyledTableCell component="th" scope="row">
                {post.id}
              </StyledTableCell>
              <StyledTableCell align="right">{post.userId}</StyledTableCell>
              <StyledTableCell align="right">{post.title}</StyledTableCell>
              <StyledTableCell align="right">{post.body}</StyledTableCell>
              <StyledTableCell align="right">
              <Avatar
                      style={{left:20 }}
                    >
                      <Link
                        to={{
                          pathname: '/posts/update/' +post.id,
                          state: {
                            post: post
                          }
                        }}
                      >
                        <EditIcon />
                      </Link>
                    </Avatar>
              </StyledTableCell>
              <StyledTableCell align="right">
                <DeleteUser
                      postId={post.id}
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
  export default withStyles(useStyles)(PostsTable)