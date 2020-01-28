import React from 'react'; 
import { withTranslation } from "react-i18next";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import EditIcon from '@material-ui/icons/Edit';
import DeleteUser from './DeletePosts'
import LayOut from '../../layOut';
import {TableRow, Typography, Button, Avatar, Dialog, DialogTitle,} from '@material-ui/core';
import {Link} from 'react-router-dom'
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

class PostsTable extends React.Component {
  state= {
    posts: [],
    open: false
  }
  componentDidMount() {
    this.setState({open: true})
    ApiService.fetchPosts().then(res =>{
      this.setState({open: false})
       this.setState({posts: res.data})
      }
       )
  }
  render() {
    const {classes, t} = this.props
    return(
      <LayOut>
        <Dialog
        open={this.state.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Please Wait...</DialogTitle>
      </Dialog>
        <TableContainer component={Paper}>
      <div >
      <Typography className={classes.title} variant="h5" component="h2">
          {t("posts_table")}
          <Button className={classes.title} variant="contained" color="primary" href="/posts/add-post">
            {t("add_post")}
          </Button>
        </Typography>
      </div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t("post_number")}</StyledTableCell>
            <StyledTableCell align="right">{t("translation:user_id")}</StyledTableCell>
            <StyledTableCell align="right">{t("title")}</StyledTableCell>
            <StyledTableCell align="right">{t("the_post")}</StyledTableCell>
            <StyledTableCell align="right">{t("translation:edit")}</StyledTableCell>
            <StyledTableCell align="right">{t("translation:delete")}</StyledTableCell>
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
  export default withStyles(useStyles)(withTranslation(['postsTable', 'translation'])(PostsTable))