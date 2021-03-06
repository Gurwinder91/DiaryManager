import { makeStyles } from "@material-ui/core";

export default makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px',
    },
    mySelect: {
        width: '40%',
        '& label + .MuiInput-formControl': {
            marginTop: 0,
        },
    },
})