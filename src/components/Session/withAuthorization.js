import React from 'react';
import {  NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { isLoaded } from 'react-redux-firebase';
import { Typography, makeStyles, Container, Link } from '@material-ui/core';

import * as ROUTES from '../../constants/routes';

export default condition => Component => {
    class WithAuthorization extends React.Component {
        render() {
            if(!isLoaded(this.props.profile)){
                return null;
            }
            return condition(this.props.profile) ? <Component {...this.props} /> : <NoRightsInfoPage />
        }
    }

    const mapStateToProps = state => ({
        profile: state.firebase.profile,
    });

    return compose(
        connect(mapStateToProps),
    )(WithAuthorization);
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent:'center',
        wordSpacing: '0.1em',
        marginTop: 20,
    },
    link: {
        color: theme.palette.secondary.dark,
    },
}))

const NoRightsInfoPage = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="sm" className={classes.root}>
            <Typography variant="body1" component="span">
                You do not have rights to access this page. Please <Link className={classes.link} component={NavLink} to={ROUTES.SIGN_IN}>Login</Link> as a Admin and
                ask Administrator to give you a Admin Access to application.
            </Typography>
        </Container>

    )
}