import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Typography } from '@material-ui/core';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {

        // componentDidMount() {
        //     this.listener = this.props.firebase.auth.onAuthStateChanged(
        //         authUser => {
        //             if (!condition(this.props.authUser)) {
        //                 this.props.history.push(ROUTES.SIGN_IN);
        //             }
        //        },
        //     );
        // }
        // componentWillUnmount() {
        //     this.listener();
        // }

        render() {
            return condition(this.props.authUser) ? <Component {...this.props} /> : <NoRightInfoPage />
        }
    }


    const mapStateToProps = state => ({
        authUser: state.sessionState.authUser,
    });

    return compose(
        withRouter,
        withFirebase,
        connect(mapStateToProps),
    )(WithAuthorization);
};
export default withAuthorization;

const NoRightInfoPage = () => {
    return (
        <Typography>
            You do not have rights to access this page. Please <Link to={ROUTES.SIGN_IN}>Login</Link> as a Admin and
            ask Administrator to give you a Admin Access to application.
        </Typography>
    )
}