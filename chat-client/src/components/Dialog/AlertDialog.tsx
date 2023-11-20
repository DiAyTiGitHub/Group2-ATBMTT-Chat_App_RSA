import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogProps = {
    header: string,
    body: string,
    openAlertDialog: boolean,
    handleClose: any,
    handleClickAgree: any
}

function AlertDialog({ header, body, openAlertDialog, handleClose, handleClickAgree }: AlertDialogProps) {
    return (
        <>
            <Dialog
                open={openAlertDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {header}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AlertDialog;