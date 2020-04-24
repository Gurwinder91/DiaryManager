import { makeStyles } from '@material-ui/core';
import { deepOrange, deepPurple, teal } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    largeAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: 12,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    teal: {
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[500],
    },
    customerName: {
        textTransform: 'capitalize'
    },
    milkQuantityChip: {
        height: 22,
    },
    chip: {
        height: 22,
        marginLeft: 10
    },
}))
