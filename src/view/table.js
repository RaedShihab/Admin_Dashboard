import React from "react";
import {Link} from "react-router-dom"
import { ReactMUIDatatable } from "react-material-ui-datatable";
import IconButton from "@material-ui/core/IconButton";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import EditIcon from '@material-ui/icons/Edit';
import Delete from './delete'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button } from "@material-ui/core";

class Demo extends React.Component {
  state={
    data:[],
    isFetching: true,
    open: true,
  }
  //  customCell = ({ value, column, row }) => {
  //   if (column.name === "gender") {
  //     return value === "Male" ? <GenderMaleIcon /> : <GenderFemaleIcon />;
  //   }
  
  //   return value;
  // };
   customToolbarSelectActions = ({
    data,
    selectedData,
    updateSelectedData,
    handleDelete, 
  }) => (
    <React.Fragment>
      <IconButton
        onClick={() => {
          const nextSelectedData = data.reduce((nextSelectedData, row) => {
            if (!selectedData.includes(row)) {
              nextSelectedData.push(row);
            }
  
            return nextSelectedData;
          }, []);
  
          updateSelectedData(nextSelectedData);
        }}
      >
        <SwapHorizIcon />
      </IconButton>
      <IconButton
        // onClick={() => {
        //   const data = selectedData.map((user,i)=> user.id)
        //   handleDelete(selectedData);
        // }}
      >
        <Delete url={this.props.url} data={selectedData.map((user,i)=> user.id)}/>
      </IconButton>
      {selectedData.map((item,i)=> item.id).length<2&&
      <IconButton>
      <Link 
          to={{
            pathname: this.props.path.update +selectedData.map((item,i)=> item.id),
            state: {
              data: selectedData
            }
          }}
      >
      <EditIcon/>
      </Link>
    </IconButton>
      }
    </React.Fragment>
  );

  componentDidMount() {
    this.props.fetch.then(res=>{ 
      this.setState({data: res.data})
      this.setState({isFetching: false})
    }
  )
  }
   theme = createMuiTheme({
    spacing: 3,
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });
  render() {
    if(this.state.isFetching) {
      return (
        <Dialog open={this.state.open}>
          <DialogTitle>
            Please Waite ..
            <DialogContent>
             <CircularProgress />
            </DialogContent>
          </DialogTitle>
        </Dialog>
      )
    }
    else {
      return (
        <ThemeProvider theme={this.theme}>
          <ReactMUIDatatable
            title={<Button 
              style={{backgroundColor: 'blue', color: 'white', margin: '15px 0'}} 
              href= {this.props.path.add}>
                ADD {this.props.add}
                </Button>}
            data={this.state.data}
            columns={this.props.columns}
            // customCell={this.customCell}
            toolbarSelectActions={this.customToolbarSelectActions}
      />
    </ThemeProvider>
      );
    }
  }
}

export default Demo;
