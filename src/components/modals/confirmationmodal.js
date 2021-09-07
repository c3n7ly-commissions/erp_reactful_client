import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

function ConfirmationModal(props) {
  return (
    <Dialog open={props.open} onClose={props.closeHandler}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.handleNoClicked}>
          {props.noButtonText ? props.noButtonText : 'Cancel'}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={props.handleYesClicked}
        >
          {props.yesButtonText ? props.yesButtonText : 'Proceed'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;
