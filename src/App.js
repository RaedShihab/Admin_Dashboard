import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './auth/Helpers/history';
import { alertActions } from './auth/Actions/alertAction';
import { PrivateRoute } from './auth/Components/privateRoutes';
import { HomePage } from './auth/HomePage/homePage';
import UserTable from './view/userList/usersTable';
import Adduser from './view/userList/addUser/addUser';
import UserUpdate from './view/userList/updateUser/infoForm'
import LoginPage from './auth/LoginPage/loginPage';

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
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/users" component={UserTable} />
                                <PrivateRoute exact path="/users/add-user" component={Adduser} />
                                <PrivateRoute exact path="/users/update/:id" component={UserUpdate} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
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