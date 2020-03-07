import React from "react";
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import {connect} from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import {Button, CircularProgress, IconButton, Avatar} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomSearchRender from './CustomSearchRender';
import CustomToolbarSelect from './CustomSelectToolBar';
import CustomToolbar from './CustomToolbar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';

class App extends React.Component {
  state = {
    submitFilter: false,
    open: true,
    openAlert: false,
    page: 1,
    rows: 10,
    count: 100,
    data: [],
    searchText: '',
    textAlign: 'left',
    filterData: '',
    listedData: []
  };
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          textAlign: this.props.data.reducer[0]
        }
      }
    }
  });

  componentDidMount() {
    this.getData(this.state.page, this.state.rows);
    this.props.showFilter && this.props.getAxios().then(res => {
      console.log(res)
      this.setState({listedData: res.data.data})})
  }
  

  // get data
  getData = (page, rows) => {
    console.log(page, rows)
    this.props.Axios(page, rows).then(res=> {
      // this.setState({data: this.models})//this is for models
      this.setState({data: res.data.data})
      this.setState({isFetching: false})
      this.setState({open: false})
    }).catch(err=> {
      console.log(err.response)
      this.setState({
        open: false,
        openAlert: true})
    }
      )
  };
  getDataBySearch = (data)=> {
    console.log(data)
    if(data === '') {
      this.setState({
        open: false,
        openAlert: true
        })
    }
    else {
      this.setState({open: true})
    axios.get(this.props.searchUrl, data).then(res=>{
      console.log('res1', res)
      this.setState({data:res.data})
      this.setState({open: false,
      })
    })
    .catch(err=> {
      this.setState({
        open: false,
        openAlert: true
        })
    })
    }
  }

  changePage = page => {
    axios.get(`https://api.glowyhan.com/gateway/districts?page=${page}&per_page=5`).then(data => {
      console.log(data.data.data.data)
      this.setState({
        page: page, 
        data
      });
    });
  };

  submitFilters = filterData => () => {
    console.log(filterData)
    this.setState({submitFilter: true})
    this.props.getById(filterData)
    .then(res=>{
      console.log(res.data.data.models)
      this.props.getBrands ? this.setState({
        submitFilter: false,
        data: res.data.data.models
      }) : this.setState({
        submitFilter: false,
        data: res.data.data
      });
    })
    .catch(err=> {
      this.setState({
        open: false,
        submitFilter: false,
        openAlert: true
        })
    })
  };
    handleFilterSelect = (e, values)=> {
      console.log(values)
      this.props.getBrands ? this.setState({filterData: values.id}) :
      this.setState({filterData: e.target.value})
    }
  render() {

    const {t, column, deleteURL} = this.props
    const {filterData, listedData} = this.state
    const dataList = listedData.map(item => {return {name: item.name.en, id: item.id}});
    const defaultProps = {
      options: dataList,
      getOptionLabel: option => option.name,
    };
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({openAlert: false});
        };
    const { data, page, count } = this.state;
    const options = {
      filter: this.props.showFilter ? true : false,
      search: false,
      print: false,
      download: false,
      filterType: "dropdown",
      filterType: "custom",
      responsive: "stacked",
      searchText: this.state.searchText,
      serverSide: true,
      count: count,
      page: page,
      onRowClick: (rowData, rowMeta, e) => {
        console.log(rowData[0]);
      },
      onFilterChange: (column, filterList, type) => {
        if (type === 'chip') {
          console.log('updating filters via chip');
          this.handleFilterSubmit(filterList)();
        }
      },
      customFilterDialogFooter: filterList => {
        return (
          <div>
          {this.props.getBrands ? <Autocomplete
                      {...defaultProps}
                      id="disable-open-on-focus"
                      disableOpenOnFocus
                      onChange={this.handleFilterSelect}
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant="standard"
                          label={this.props.list}
                          placeholder="Favorites"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  :
                  <FormControl>
              <InputLabel style={{marginTop: 10}}>
                {this.props.list}
              </InputLabel>
              <Select
              style={{marginTop: 50}}
              onChange={this.handleFilterSelect}
              >
                {
                  listedData.map(item => {
                  return <MenuItem value={item.id}>{item.name.en}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
                  }
            <div style={{marginTop: '40px'}}>
            {this.state.submitFilter&&<CircularProgress/>}
            {!this.state.submitFilter&&<Button variant="contained" onClick={this.submitFilters(filterData)}>Apply Filters</Button>}
          </div>
          </div>
        );
      },
      onTableChange: (action, tableState) => {
        console.log(tableState.page, tableState.rowsPerPage)
        switch (action) {
          case "changePage":  
            this.getData(tableState.page, tableState.rowsPerPage);
            break;
            default:
            return
        }
        // switch (action) {
        //   case "changeRowsPerPage":
        //     this.getData(tableState.page, tableState.rowsPerPage);
        //     break;
        //     default:
        //     return
        // }
      },
      // customSearchRender: (searchText, handleSearch, hideSearch, options) => {
      //   return (
      //     <CustomSearchRender
      //       searchText={searchText}
      //       onSearch={handleSearch}
      //       onHide={hideSearch}
      //       options={options}
      //       getDataBySearch={this.getDataBySearch}
      //     />
      //   );
      // },
      customToolbar: () => {
        return (
          <CustomToolbar 
          path={this.props.path.add}
          />
        );
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect
        deleteURL={deleteURL}
        data={this.state.data} 
        selectedRows={selectedRows}
        displayData={displayData} 
        setSelectedRows={setSelectedRows} 
        path={this.props.path.update}
        />
      ),
    };
    const columns = {
      users:  [
        { name: "id", label: "ID" },
        { name: "name", label: this.props.t("translation:user_name")},
        { name: "email", label: t("translation:email")},
        { name: "address.street", label: t("users/users:address") },
      ],
      posts:  [
        { name: "userId", label: t("user_id") },
        { name: "id", label: t("posts/postsTable:post_number") },
        { name: "title", label: t("posts/postsTable:title") },
        { name: "body", label: t("posts/postsTable:the_post")},
      ],
      countries : [
        { name: "_id", label: "ID" },
        { name: "name.en", label: t("countries/list:name")},
        { name: "name.ar", label: t("countries/list:name")},
        { name: "phone_code", label: t("countries/list:phone_code")},
        { name: "iso_code", label: t("countries/list:Code")},
      ],
      cities: [
        { name: "_id", label: "ID" },
        { name: "name.en", label: t("countries/list:city_name")},
        { name: "geoloc.lon", label: t("countries/list:lon")},
        { name: "geoloc.lat", label: t("countries/list:lat")},
      ],
      districts: [
        { name: "_id", label: "ID" },
        { name: "name.en", label: t("countries/list:name")},
        { name: "geoloc.lon", label: t("countries/lon")},
        { name: "geoloc.lat", label: t("countries/lat")},
      ],
      models: [
        { name: "_id", label: "ID" },
        { name: "name.en", label: t("model_name")},
        { name: 'brand_id', label: t("brand")},
        { name: "manf_year", label: t("manf_year")},
      ]
    }
    return (
      <React.Fragment>
        {this.state.open&&<CircularProgress size='100px' style={{display: 'block', margin:'200px 500px'}}/>}
        {!this.state.open&&
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
        title={
               <CustomSearchRender getDataBySearch={this.getDataBySearch}/>
            }
        data={data}
        columns={columns[column]}
        options={options}
      />
        </MuiThemeProvider>
        }
      <Snackbar open={this.state.openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Somthing went wrong please refresh the page or check enternet connection..
            </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state
  }
}
export default connect(mapStateToProps)(withTranslation(['translation', 'users/users', 'posts/postsTable', 'countries/list'])(App));
