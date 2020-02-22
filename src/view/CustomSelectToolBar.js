import React from "react";
import { withTranslation } from "react-i18next";
import {Link} from 'react-router-dom';
import {Axios} from './axiosConfig';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {CircularProgress} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
  iconButton: {
  },
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class CustomToolbarSelect extends React.Component {
    state={
        isDeleting: false,
        open: false,
        openErr400: false,
        isForceDeleting: false
    }
  handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
      if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
        nextSelectedRows.push(index);
      }

      return nextSelectedRows;
    }, []);

    this.props.setSelectedRows(nextSelectedRows);
  };

  handleClickDeselectAll = () => {
    this.props.setSelectedRows([]);
  };

  handleClickBlockSelected = () => {
    console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
  };
  delete = (ids)=> {
    console.log(ids)
    console.log(this.props.deleteURL+'/'+ids+'/soft')
      this.setState({isDeleting: true})
     Axios.delete(this.props.deleteURL+'/'+ids+'/soft').then(res => {
       if(res.status === 200) {
          console.log(res)
          this.setState({
              isDeleting: false,
              open: true
        })
         window.location.reload(false)
       }
    }
       )
       .catch(err=> {console.log(err.response.status)
        if(err.response.status === 400) {
          this.setState({
            isDeleting: false,
            openErr400: true
        })
       }
       if(err.response.status === 500) {
         console.log(err.response)
        this.setState({
          isDeleting: false,
          openErr500: true
      })
     }
     //this open when delete item already has
     if(err.response.status === 404) {
      console.log(err.response)
      this.setState({
        isDeleting: false,
        openErr404: true
    })
   }
      })
  }
  ForceDelete = (ids)=> {
    console.log(ids)
    console.log(this.props.deleteURL+'/'+ids+'/soft')
      this.setState({isForceDeleting: true})
     Axios.delete(this.props.deleteURL+'/'+ids+'/force').then(res => {
       if(res.status === 200) {
          console.log(res)
          this.setState({
              isForceDeleting: false,
              open: true
        })
          window.location.reload(false)
       }
    }
       )
       .catch(err=> {console.log(err.response.status)
        if(err.response.status === 400) {
          this.setState({
            isForceDeleting: false,
            openErr400: true
        })
       }
       if(err.response.status === 500) {
        this.setState({
          isForceDeleting: false,
          openErr500: true
      })
     }
     //this open when delete item already has
     if(err.response.status === 404) {
      this.setState({
        isForceDeleting: false,
        openErr404: true
    })
   }
      })
  }
  render() {
    const {t} = this.props
    console.log(this.props)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
          open: false,
          openErr400: false,
          openErr500: false
        });
          };
    const { classes, selectedRows, data } = this.props;
    const ids = selectedRows.data.map(d => data[d.dataIndex]._id);
    const item = selectedRows.data.map(d => data[d.dataIndex]);
    return (
      <div className={classes.iconContainer}>
       
        <Tooltip title={"Inverse selection"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickInverseSelection}>
            <CompareArrowsIcon className={[classes.icon, classes.inverseIcon].join(" ")} />
          </IconButton>
        </Tooltip>
        {ids.length === 1 && <Tooltip title={"Edit"}>
          <IconButton className={classes.iconButton} onClick={()=>console.log('edit')}>
          <Link 
                to={{
                    pathname: this.props.path +ids,
                    state: {
                    data: item
                    }
                }}
            >
            <EditIcon/>
            </Link>
          </IconButton>
        </Tooltip>}
        <Tooltip title={"Soft delete"}>
          <IconButton onClick={()=> this.delete(ids)}>
          {this.state.isDeleting&&<CircularProgress size='30px'/>}
          {!this.state.isDeleting&&<DeleteIcon/>} 
          </IconButton>
        </Tooltip>
        <Tooltip title={"Force delete"}>
          <IconButton onClick={()=> this.ForceDelete(ids)}>
          {this.state.isForceDeleting&&<CircularProgress size='30px'/>}
          {!this.state.isForceDeleting&&<DeleteForeverIcon color="secondary"/>} 
          </IconButton>
        </Tooltip>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {t("the_Items_has_deleted_successfuly!")}
            </Alert>
        </Snackbar>
        <Snackbar open={this.state.openErr400} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                The Item is already deleted!
            </Alert>
        </Snackbar>
        <Snackbar open={this.state.openErr500} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {("somthing_went_wrong_with_the_service!")}
            </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(withTranslation(["translation", "countries/validations"])(CustomToolbarSelect));
