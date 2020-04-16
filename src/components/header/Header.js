import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, AppBar, Toolbar, Typography, makeStyles, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { HideOnSlide } from '../../core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    link: {
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none'
        }
    },

}));

const Header = (props) => {
    const classes = useStyles();
    return (
        <HideOnSlide>
            <AppBar className={classes.root}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={props.menuIconClick.bind(null, true)}
                        className={classes.menuButton}
                        color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link component={NavLink} to="/" className={classes.link}>
                            Diary Manager
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </HideOnSlide>
    )
}

export default Header;