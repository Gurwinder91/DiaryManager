
import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles, List, ListItem, ListItemText, Divider, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const useStyles = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.primary.light
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

const NavList = (props) => {
    const classes = useStyles();
    return (
        <div
            role="presentation"
            onClick={props.toggleDrawer.bind(null, false)}
            onKeyDown={props.toggleDrawer.bind(null, false)}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.toggleDrawer.bind(null, false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {props.list.map((li) => (
                    <ListItem button
                        key={li.id}
                        component={NavLink}
                        to={li.link} exact
                        activeClassName={classes.active}>
                        <ListItemText primary={li.text} />
                    </ListItem>
                ))
                }
            </List>
        </div>
    )
}


export default NavList;