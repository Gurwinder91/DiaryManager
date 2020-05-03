import React from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import { Button, ListItemIcon, Typography, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import * as ROUTES from '../../../constants/routes';
import ActionMenu from '../ActionMenu';
import { signOut } from '../../../actions/auth'

const RightHeader = ({ auth, onSignOut }) => {
    const history = useHistory();
    const location = useLocation();

    const onMenuClosed = (value) => {
        switch (value) {
            case 'updatePassword':
                history.push(ROUTES.UPDATE_PASSWORD);
                break;
            case 'settings':
                history.push(ROUTES.SETTINGS);
                break;
            case 'signout':
                signOut();
                break;
            default:
                break;
        }
    }
    const signOut = () => {
        onSignOut().then(() => {
            history.push(ROUTES.SIGN_IN);
        });
    }

    const whenUserLoggedIn = () => {
        return (
            <ActionMenu whenMenuClosed={onMenuClosed} />
        )
    }

    return (
        <>
            {
                (location.pathname.includes(ROUTES.SIGN_IN)) ? null :
                    auth ?
                        whenUserLoggedIn()
                        :
                        <Button variant="contained" color="secondary" component={NavLink} to={ROUTES.SIGN_IN}>Signin</Button>
            }
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
    onSignOut: () => dispatch(signOut())
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(RightHeader);
