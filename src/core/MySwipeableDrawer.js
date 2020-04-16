import React from 'react';

import { SwipeableDrawer, makeStyles } from '@material-ui/core';
import NavList from './NavList';

const drawerWidth = 250;

const setStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
}))

export const MySwipeableDrawer = (props) => {
    const classes = setStyles();
    return (
        <SwipeableDrawer
            className={classes.drawer}
            open={props.open}
            onClose={props.toggleDrawer.bind(null, false)}
            onOpen={props.toggleDrawer.bind(null, true)}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <NavList list={props.navList} toggleDrawer={props.toggleDrawer} />
        </SwipeableDrawer>
    );
}
