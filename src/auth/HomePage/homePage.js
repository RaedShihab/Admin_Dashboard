import React from 'react';
import { connect } from 'react-redux';

import LayOut from '../../layOut';

import { userActions } from '../Actions/userAcion';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        return (
            <div>
                <LayOut>
                    Dashboard
                </LayOut>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };