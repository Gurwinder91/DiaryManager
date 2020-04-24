import { makeStyles } from "@material-ui/core";

export default makeStyles({
    root: {
        margin: '10px 0',
    },
    content: {
        '& > *': {
            marginBottom: 10,
            '&:last-child': {
                marginBottom: 0
            }
        },
    },
    calculateBtn: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 15
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    milkType: {
        width: '45%',
    },
})