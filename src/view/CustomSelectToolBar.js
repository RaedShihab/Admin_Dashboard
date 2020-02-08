import React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
        open: false
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
      this.setState({isDeleting: true})
     axios.delete('https://jsonplaceholder.typicode.com/users/'+ ids, ids).then(res =>{ 
        console.log(res)
        this.setState({
            isDeleting: false,
            open: true
        })
    }
       )
  }
  render() {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open: false});
          };
    const { classes, selectedRows, displayData, data } = this.props;
    const ids = selectedRows.data.map(d => data[d.dataIndex].id);
    return (
      <div className={classes.iconContainer}>
       
        <Tooltip title={"Inverse selection"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickInverseSelection}>
            <CompareArrowsIcon className={[classes.icon, classes.inverseIcon].join(" ")} />
          </IconButton>
        </Tooltip>
        {ids.length === 1 && <Tooltip title={"Edit User"}>
          <IconButton className={classes.iconButton} onClick={()=>console.log('edit')}>
          <Link 
                to={{
                    pathname: this.props.path +ids,
                    state: {
                    data: ids
                    }
                }}
            >
            <EditIcon/>
            </Link>
          </IconButton>
        </Tooltip>}
        <Tooltip>
          <IconButton onClick={()=> this.delete(ids)}>
          {this.state.isDeleting&&<CircularProgress size='30px'/>}      
          {!this.state.isDeleting&&<DeleteIcon/>} 
          </IconButton>
        </Tooltip>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);
