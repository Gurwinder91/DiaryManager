import React from 'react';

import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        '& > *': {
            marginBottom: '20px',
        },
        '& * + button': {
            marginTop: '10px',
            width: 'auto'
        },
        [theme.breakpoints.up('sm')]: {
            width: '40%'
        }
    }
}));

export function MyForm(props) {
    const classes = useStyles();

    return (
        <form autoComplete="off" noValidate
            onSubmit={props.formSubmit.bind(this)} className={classes.form}>
            <div className={classes.formContainer}>
                {props.children}
                <Button variant="contained" color="primary" type="submit" disabled={props.disabled}>
                    Submit
            </Button>
            </div>
        </form>
    )
}