import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { IconButton, AppBar, Toolbar, Typography, makeStyles, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';

import { HideOnSlide } from '../../core';
import RightHeader from './RightHeader';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    leftIconSection: {
        marginRight: theme.spacing(1)
    },
    backIcon: {
        fontSize: theme.spacing(3.4),
    },
    title: {
        flexGrow: 1,
        textTransform: 'capitalize'
    },
    link: {
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none'
        }
    },

}));

const Header = ({ authUser, menuIconClick }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const getMenuIcon = () => {
        const isChildRoute = (location.state && location.state.childRoute);
        return (
            isChildRoute ?
                <IconButton
                    edge="start"
                    onClick={() => history.goBack()}
                    className={classes.leftIconSection}
                    color="inherit" aria-label="back-icon" >
                    <ArrowBackIcon className={classes.backIcon} />
                </IconButton >
                :
                < IconButton
                    edge="start"
                    onClick={menuIconClick.bind(null, true)}
                    className={classes.leftIconSection}
                    color="inherit" aria-label="menu" >
                    <MenuIcon />
                </IconButton >
        )
    }

    return (
        <HideOnSlide>
            <AppBar className={classes.root}>
                <Toolbar>
                    {authUser ? getMenuIcon() : null}
                    <Typography variant="h6" className={classes.title}>
                        <Link component={NavLink} to="/" className={classes.link}>
                            Milk Diary Manager
                            </Link>
                    </Typography>
                    <RightHeader />
                </Toolbar>
            </AppBar>
        </HideOnSlide>
    )
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Header);
