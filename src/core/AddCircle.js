
import React from 'react';

import { IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        bottom: 40,
        right: 30,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    }
}))

export const AddCircleIcon = (props) => {
    const classes = useStyles();

    return (
        <IconButton
            className={classes.root}
            onClick={props.whenClicked}
            aria-label="add">
            <AddIcon style={{ fontSize: '2.0rem' }} />
        </IconButton>
    )
}