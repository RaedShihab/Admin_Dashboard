import React , {Suspense} from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './auth/Helpers/history';
import { alertActions } from './auth/Actions/alertAction';
import { PrivateRoute } from './auth/Components/privateRoutes';
import { HomePage } from './auth/HomePage/homePage';

import UserTable from './view/userList/list';
import Adduser from './view/userList/add';
import UserUpdate from './view/userList/update';

import PosteTable from './view/posts/list';
import AddPost from './view/posts/add';
import updatePost from './view/posts/update';

import AddCountry from './view/countries/add';
import UpdateCountry from './view/countries/update';
import CountriesTable from './view/countries/list';

import AddCity from './view/Cities/add'
import UpdateCity from './view/Cities/update'
import CitiesList from './view/Cities/list';

import AddDistric from './view/Districts/add'
import UpdateDistrict from './view/Districts/update'
import DistrictsList from './view/Districts/list';

import AddCategory from './view/categories/add';
import updateCategory from './view/categories/update';
import CategoriesList from './view/categories/list';

import AddBrand from './view/brands/add';
import updateBrand from './view/brands/update';
import brandList from './view/brands/list'

import LoginPage from './auth/LoginPage/loginPage';

import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <Suspense fallback={(<div>Loading</div>)}>
                 <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/dashboard" component={HomePage} />

                                <PrivateRoute exact path="/users" component={UserTable} />
                                <PrivateRoute exact path="/users/add-user" component={Adduser} />
                                <PrivateRoute exact path="/users/update/:id" component={UserUpdate} />
                                
                                <PrivateRoute exact path="/posts/add-post" component={AddPost} />
                                <PrivateRoute exact path="/posts/update/:id" component={updatePost} />
                                <PrivateRoute exact path="/posts" component={PosteTable} />

                                <PrivateRoute exact path="/countries/create" component={AddCountry} />
                                <PrivateRoute exact path="/countries/edit/:id" component={UpdateCountry} />
                                <PrivateRoute exact path="/countries" component={CountriesTable} />

                                <PrivateRoute exact path="/cities/create" component={AddCity} />
                                <PrivateRoute exact path="/cities/edit/:id" component={UpdateCity} />
                                <PrivateRoute exact path="/cities" component={CitiesList} />

                                <PrivateRoute exact path="/districts-list/add-district" component={AddDistric} />
                                <PrivateRoute exact path="/districts-list/update-district/:id" component={UpdateDistrict} />
                                <PrivateRoute exact path="/districts-list" component={DistrictsList} />

                                <PrivateRoute exact path="/categories-list/add-category" component={AddCategory} />
                                <PrivateRoute exact path="/categories-list/category/:id" component={updateCategory} />    
                                <PrivateRoute exact path="/categories-list" component={CategoriesList} />

                                <PrivateRoute exact path="/brands-list/add-brand" component={AddBrand} />
                                <PrivateRoute exact path="/brands-list/brand/:id" component={updateBrand} />    
                                <PrivateRoute exact path="/brands-list" component={brandList} />

                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
            </Suspense>
            </ThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 