import { makeStyles } from '@material-ui/core';
import { deepOrange, deepPurple, teal } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    root: {
        marginBottom: 10,
    },
    total: {
        display: 'flex',
        '& > *': {
            marginRight: 10
        },
        '& > *:first-child': {
            fontWeight: 500
        },
    },
    milkData: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        '& > *': {
            display: 'flex'
        }
    },
    green: {
        color: theme.palette.success.main,
        fontWeight: 500,
    },
    orange: {
        color: deepOrange[500],
        fontWeight: 500,
        marginLeft: 10,
    },
    purple: {
        color: deepPurple[500],
        fontWeight: 500,
        marginLeft: 10,
    },
}));