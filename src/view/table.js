import React from "react";
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import {connect} from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import {Button, CircularProgress, IconButton, Avatar} from '@material-ui/core'
import CustomSearchRender from './CustomSearchRender';
import CustomToolbarSelect from './CustomSelectToolBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import { act } from "react-dom/test-utils";



class App extends React.Component {
  state = {
    submitFilter: false,
    open: true,
    openAlert: false,
    page: 1,
    rows: 5,
    count: 100,
    data: [],
    searchText: '',
    textAlign: 'left'
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
  }
models = [
  {
    "_id": "5e4d32190e26001fd365b5d2",
    "old_id": "1",
    "name": {
        "ar": "افانتي",
        "en": "Avante"
    },
    "colors" : [
      {"name": "red", "code": "#ff000"}
    ],
    "manf_year" : 2019,
    "order" : 2,
    "brand_id": "5e4d321820800027d97f2b93"
},
{
  "_id": "5e4d32190e26001fd365b5d2",
  "old_id": "1",
  "name": {
      "ar": "افانتي",
      "en": "Avante"
  },
  "colors" : [
    {"name": "red", "code": "#ff000"}
  ],
  "manf_year" : 2019,
  "order" : 2,
  "brand_id": "5e4d321820800027d97f2b93"
},
]
  // get data
  getData = (page, rows) => {
    console.log(page, rows)
    this.props.Axios(page, rows).then(res=> {
      this.setState({data: this.models})//this is for models
      // this.setState({data: res.data.data.data})
      this.setState({isFetching: false})
      this.setState({open: false})
    }).catch(err=> {
      console.log(err.response)
      this.setState({
        open: false,
        openAlert: true})
    }
      )
    // this.xhrRequest().then(data => { 
    //   this.setState({ data });
    // });
  };
  getDataBySearch = (data)=> {
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
  // getFilterdData = ()=> {
  //   axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
  //     console.log('res2', res)
  //     this.setState({data:res.data})
  //   })
  // }
  // mock async function
  xhrRequest = () => {
    return new Promise((resolve, reject) => {
      const srcData = [
        ["Gabby George", "Business Analyst", "Minneapolis"],
        ["Aiden Lloyd", "Business Consultant", "Dallas"],
        ["Jaden Collins", "Attorney", "Santa Ana"],
        ["Franky Rees", "Business Analyst", "St. Petersburg"],
        ["Aaren Rose", "Business Analyst", "Toledo"]
      ];

      const maxRound = Math.floor(Math.random() * 2) + 1;
      const data = [...Array(maxRound)].reduce(
        acc => acc.push(...srcData) && acc,
        []
      );
      data.sort((a, b) => 0.5 - Math.random());

      setTimeout(() => {
        resolve(data);
      }, 250);
    });
  };

  changePage = page => {
    axios.get(`https://api.glowyhan.com/gateway/districts?page=${page}&per_page=5`).then(data => {
      console.log(data.data.data.data)
      this.setState({
        page: page, 
        data
      });
    });
  };
  handleFilterSubmit = filterList => () => {
    this.setState({submitFilter: true})
    console.log('Submitting filters: ', filterList);
    axios.get(this.props.filterUrl, filterList).then(res=>{
      console.log(res)
      this.setState({
        submitFilter: false,
        data: res.data });
    })
    .catch(err=> {
      this.setState({
        open: false,
        submitFilter: false,
        openAlert: true
        })
    })
  };
  render() {
    console.log('render')
    const {t, column, deleteURL} = this.props
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
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      searchText: this.state.searchText,
      serverSide: true,
      count: count,
      page: page,
      onFilterChange: (column, filterList, type) => {
        if (type === 'chip') {
          console.log('updating filters via chip');
          this.handleFilterSubmit(filterList)();
        }
      },
      customFilterDialogFooter: filterList => {
        return (
          <div style={{marginTop: '40px'}}>
            {this.state.submitFilter&&<CircularProgress/>}
            {!this.state.submitFilter&&<Button variant="contained" onClick={this.handleFilterSubmit(filterList)}>Apply Filters</Button>}
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
      customSearchRender: (searchText, handleSearch, hideSearch, options) => {
        return (
          <CustomSearchRender
            searchText={searchText}
            onSearch={handleSearch}
            onHide={hideSearch}
            options={options}
            getDataBySearch={this.getDataBySearch}
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
        {this.state.open&&<CircularProgress size='100px' style={{display: 'block', margin:'350px 500px'}}/>}
        {!this.state.open&&
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
        title={
          <Avatar>
            <IconButton
        href={this.props.path.add}
        >
          <AddIcon
           color="primary" variant="contained"
           />
        </IconButton>
          </Avatar>}
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
