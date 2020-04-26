import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';

export default ({ open, maxWidth, onDialogClose, data, message }) => {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="confirmation-dialog-title"
            maxWidth={maxWidth}
            open={open}
        >
            <DialogContent dividers>
                <Typography variant="body1" component="div" color="textPrimary">
                    {message ? message : 'Delete this entry?'}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onDialogClose.bind(this, null)} color="primary">
                    Cancel
                </Button>
                <Button onClick={onDialogClose.bind(this, data)} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}