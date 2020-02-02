import React from 'react';
import axios from 'axios';
import { withTranslation } from "react-i18next";
import {Button, DialogTitle, Dialog, Snackbar, CircularProgress} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Alert } from '@material-ui/lab';

class Delete extends React.Component {
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

  // data = this.props.data
  deleteUser = ()=> {
    this.setState({
      showLoading: true,
    })
    axios.delete(this.props.url+this.props.data , { id: this.props.data})
      .then(res => {
        console.log('delete', this.props.url+this.props.data)
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
    const {t} = this.props
    console.log('dalete',this.props.data, this.props.url)
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
                       {t("the_country_has_deleted_successfuly")}
          </Alert>
        </Snackbar>

        <DeleteOutlineIcon
        color="secondary"
        cursor="pointer"
        fontSize="large"
          onClick={this.openDialog}
          style={{
            backgroundColor: '#dee1fa',
          }}
        >
        </DeleteOutlineIcon>
        <Dialog
          onEnter={console.log('Hey.')}
          open={this.state.openDelete}
        >
          <DialogTitle>{t("are_you_sure_delete_country")}</DialogTitle>
          <Button
            onClick={this.deleteUser}
            style={{backgroundColor:'red', color: 'white', marginBottom: 3}}
            variant="contained"
          >
            {!this.state.showLoading&&t('delete')} 
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
          {t("cancele")}
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default withTranslation('countries/delete')(Delete);