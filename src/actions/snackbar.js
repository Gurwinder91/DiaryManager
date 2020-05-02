
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export const showSnackbar = (message, severity) => ({
    type: SHOW_SNACKBAR,
    message,
    severity
})

export const hideSnackbar = () => ({
    type: HIDE_SNACKBAR
})