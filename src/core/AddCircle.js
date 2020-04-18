
import React from 'react';

import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: 40,
        right: 30,
    }
}))

export const AddCircleIcon = (props) => {
    const classes = useStyles();

    return (
        <Fab
            color="secondary"
            aria-label="add"
            className={classes.root}
            onClick={props.whenClicked}
        >
            <AddIcon />
        </Fab>
    )
}