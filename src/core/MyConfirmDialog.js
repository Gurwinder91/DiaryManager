import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

export function MyConfirmDialog(props) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="confirmation-dialog-title"
            maxWidth={props.maxWidth}
            open={props.open}
        >
            <DialogTitle id="confirmation-dialog-title">Confirmation</DialogTitle>
            <DialogContent dividers>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.dialogCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.dialogOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}