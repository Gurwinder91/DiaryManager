import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from '../Firebase';
import * as ACTIONS from '../../actions';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.props.onSetAuthUser(JSON.parse(localStorage.getItem('authUser')));
        }

        componentDidMount() {
            console.log(this.props.firebase.auth.currentUser);
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.props.onSetAuthUser(authUser);
                },
                () => {
                    localStorage.removeItem('authUser');
                    this.props.onSetAuthUser(null);
                }
            );
        }
        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    }

    const mapDispatchToProps = dispatch => ({
        onSetAuthUser: authUser => dispatch({ type: ACTIONS.AUTH_USER_SET, authUser }),
    });

    return compose(
        withFirebase,
        connect(
            null,
            mapDispatchToProps,
        )
    )(WithAuthentication);
};
export default withAuthentication;