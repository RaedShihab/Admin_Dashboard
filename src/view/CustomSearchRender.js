import React from 'react';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const defaultSearchStyles = theme => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
  },
  searchText: {
    flex: '0.8 0',
    // height: 
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
  btn: {
    margin: '0 10px',
    height: 55
  }
});

class CustomSearchRender extends React.Component {
  state={
    text : '',
    disabled: true
  }
  handleTextChange = event => {
    // this.props.onSearch(event.target.value);
    if((event.target.value.length<1)) {this.setState({disabled: true})}
    else{
      this.setState({
        text: event.target.value,
        disabled: false,
      })
    }
  };

  // componentDidMount() {
  //   document.addEventListener('keydown', this.onKeyDown, false);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.onKeyDown, false);
  // }

  // onKeyDown = event => {
  //   if (event.keyCode === 27) {
  //     this.props.onHide();
  //   }
  // };

  render() {
    const {classes, getDataBySearch} = this.props
    const {text, disabled} = this.state;
    // const { classes, options, onHide, searchText, getDataBySearch } = this.props;
    return (
      <Grow appear in={true} timeout={300}>
        <div>
          <TextField
            onChange={this.handleTextChange}
            variant="filled"
            placeholder={'Search'}
            className={classes.searchText}
          />
          <Button
          disabled={disabled}
          onClick={()=>getDataBySearch(text)}
            className={classes.btn}
            variant="contained" color="primary">
           Search
         </Button>
        </div>
      </Grow>
    );
  }
}

export default withStyles(defaultSearchStyles)(CustomSearchRender);

