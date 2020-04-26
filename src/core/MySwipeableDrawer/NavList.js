
import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles, List, ListItem, ListItemText, Divider, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.primary.light
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '1.15rem',
        marginLeft: 10,
    }

}));

const NavList = (props) => {
    const classes = useStyles();

    const getList = () => {
        let list = [];
        if (props.authUser)
            list = props.list.filter(item => item.access.includes(props.authUser.role));
            
        return (
            list.map((li) => (
                <ListItem button
                    key={li.id}
                    onClick={props.toggleDrawer.bind(null, false)}
                    component={NavLink}
                    to={li.link} exact
                    activeClassName={classes.active}>
                    <ListItemText primary={li.text} />
                </ListItem>
            ))
        )
    }

    return (
        <div
            role="navList"
            onKeyDown={props.toggleDrawer.bind(null, false)}
        >
            <div className={classes.drawerHeader}>
                <Typography variant="h6" component="span" color="textPrimary" className={classes.title}>
                    Milk Diary Manager
                </Typography>
                <IconButton onClick={props.toggleDrawer.bind(null, false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    getList()
                }
            </List>
        </div>
    )
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(NavList);
