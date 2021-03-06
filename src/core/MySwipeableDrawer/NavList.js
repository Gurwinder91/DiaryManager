
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles, List, ListItem, ListItemText, Divider, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
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
        if (props.profile)
            list = props.list.filter(item => item.access.includes(props.profile.role));

        return (
            list.map((li) => (
                <Fragment key={li.id}>
                    <ListItem button
                        component={NavLink}
                        to={li.link} exact
                        activeClassName={classes.active}>
                        <ListItemText primary={li.text} />
                        <NavigateNextIcon />
                    </ListItem>
                    <Divider />
                </Fragment>
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
    profile: state.firebase.profile,
});

export default connect(mapStateToProps)(NavList);
