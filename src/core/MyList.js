
import React from 'react';
import { List, makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));


export function MyList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {props.children}
        </List>
    )
}