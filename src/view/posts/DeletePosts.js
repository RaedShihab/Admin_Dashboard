import React from 'react';
import axios from 'axios';
import {Button, DialogTitle, Dialog, Snackbar, CircularProgress, Avatar} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';

class DeleteUser extends React.Component {
  state = {
    openDelete: false,
    openSnackSucc: false,
    showLoading: false,
    openSnackErr: false,
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      openSnackSucc: false,
      openSnackErr:false
    })
  };

  userId = this.props.userId
  deleteUser = ()=> {
    this.setState({
      showLoading: true,
    })
    axios.delete('https://jsonplaceholder.typicode.com/users/'+this.userId , { id: this.userId })
      .then(res => {
        console.log(res)
        this.setState({
          showLoading: false,
          openSnackSucc: true,
          openDelete: false,
        })
      }
      )
      .catch(err =>{  
        console.error(err)
      })
  }
  openDialog = ()=> {
    this.setState({ openDelete: true });
  }

  render() {
    return (
      <div>
        <Snackbar
          autoHideDuration={3000}
          onClose={this.handleClose}
          open={this.state.openSnackSucc}
        >
          <Alert
            onClose={this.handleClose}
            severity="success"
            style={{backgroundColor: 'green', color: 'white'}}
          >
                       The Post Has Deleted Successfuly
          </Alert>
        </Snackbar>

        <DeleteIcon
        cursor="pointer"
        fontSize="large"
          onClick={this.openDialog}
          style={{
            backgroundColor: '#dee1fa',
          }}
        >
              delete
        </DeleteIcon>
        <Dialog
          onEnter={console.log('Hey.')}
          open={this.state.openDelete}
        >
          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
          <Button
            onClick={this.deleteUser}
            style={{backgroundColor:'red', color: 'white', marginBottom: 3}}
            variant="contained"
          >
            {!this.state.showLoading&&'delete'} 
            {this.state.showLoading && <CircularProgress
              color="inherit"
              size={23}
            />}
          </Button>
          <Button
            color="primary"
            onClick={()=> this.setState({
              openDelete: false
            })}
            variant="contained"
          >
          cancele
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default DeleteUser;