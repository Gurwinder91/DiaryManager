import React from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import { Button, ListItemIcon, Typography, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import ActionMenu from '../ActionMenu';

const RightHeader = ({ authUser, firebase }) => {
    const history = useHistory();
    const location = useLocation();

    const signOut = () => {
        firebase.doSignOut();
        history.push(ROUTES.SIGN_IN);
    }

    const whenUserLoggedIn = () => {
        return (
            <ActionMenu whenMenuClosed={signOut}/>
        )
    }

    return (
        <>
            {
                (location.pathname.includes(ROUTES.SIGN_IN)) ? null :
                    authUser ?
                        whenUserLoggedIn()
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
