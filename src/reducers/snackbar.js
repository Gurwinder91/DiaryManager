
import {SHOW_SNACKBAR, HIDE_SNACKBAR} from '../actions/snackbar';

const INTIAL_STAGE = {
    snackBar: {
        message: '',
        open: false,
        severity: ''
    }
}

export default (state = INTIAL_STAGE, action) => {
    switch (action.type) {
        case SHOW_SNACKBAR:
            return {
                ...state,
                snackBar: {
                    open: true,
                    message: action.message,
                    severity: action.severity,
                },
            }
        case HIDE_SNACKBAR:
            return {
                ...state,
                snackBar: {
                    ...INTIAL_STAGE,
                },
            }
        default:
            return state;
    }
}