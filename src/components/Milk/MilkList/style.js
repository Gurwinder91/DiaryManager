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
    customerName: {
        textTransform: 'capitalize',
    },
    contentSection: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    time: {
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: 3,
        fontSize: '0.775rem',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            height: 24,
            marginRight: 5,
        }
    },
}))
