import React from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

import * as ACTIONS from '../../actions';  

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MySnackbar = ({ snackbar, hideSnackbar }) => {
    return (
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={hideSnackbar}>
            <Alert onClose={hideSnackbar} severity={snackbar.severity}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    )
}

const mapStateToProps = state => ({
    snackbar: state.snackBarState.snackBar,
})

const mapDispatchToProps = dispatch => ({
    hideSnackbar: () => dispatch({type: ACTIONS.HIDE_SNACKBAR}),
})

export default connect(mapStateToProps, mapDispatchToProps)(MySnackbar);