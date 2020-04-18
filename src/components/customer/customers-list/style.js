import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    largeAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    listItemText: {
        margin: '6px 0 6px 10px'
    },
    primary: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateText: {
        fontSize: '0.8rem',
        color: theme.palette.text.secondary
    },
    customerName: {
        textTransform: 'capitalize'
    }
}))