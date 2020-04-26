
import React from 'react';
import { List, makeStyles, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    emptyItem: {
        display: 'flex',
        marginTop: 40,
        justifyContent: 'center',
    }
}));


export default (props) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {props.children
                ?
                props.children
                :
                <ListItem className={classes.emptyItem}>
                    No Records Found
                </ListItem>
            }

        </List>
    )
}