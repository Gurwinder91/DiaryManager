import React from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

const RightHeader = ({ authUser, firebase }) => {
    const history = useHistory();
    const location = useLocation();

    const signOut = () => {
        firebase.doSignOut();
        history.push(ROUTES.SIGN_IN);
    }

    return (
        <>
            {
                (location.pathname.includes(ROUTES.SIGN_IN)) ? null :
                    authUser ? 
                    <Button variant="contained" color="secondary" onClick={signOut}>Signout</Button>
                    : 
                    <Button variant="contained" color="secondary" component={NavLink} to={ROUTES.SIGN_IN}>Signin</Button>
            }
        </>
    )
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
});

export default compose(
    withFirebase,
    connect(mapStateToProps)
)(RightHeader);
