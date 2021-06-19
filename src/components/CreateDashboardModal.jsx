import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import FacebookCircularProgress from "./FacebookCircularProgress.jsx";
import ErrorToast from "./ErrorToast.jsx";

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundImage: theme.palette.mainBackgroundColor,
    color: "#FFFFFF",
  },
  label: {
    color: "#FFFFFF !important",
  },
}));

const CreateDashboardModal = ({
  open,
  close,
  create,
  setDashboardName,
  setDashboardDescription,
  loading,
  error,
}) => {
  const classes = useStyles();

  const handleName = (e) => {
    setDashboardName(e.target.value);
  };

  const handleDescription = (e) => {
    setDashboardDescription(e.target.value);
  };

  return (
    <Modal
      disableBackdropClick
      open={open}
      onClose={close}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className={classes.dialog} id="form-dialog-title">
        CREATE
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText className={classes.label}>
          To create a Dashboard, Please provide a Dashboard name and its
          description.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Dashboard Name"
          type="name"
          fullWidth
          onChange={handleName}
          InputLabelProps={{
            className: classes.label,
          }}
          InputProps={{
            className: classes.label,
          }}
        />
        <TextField
          className={classes.text}
          margin="dense"
          id="description"
          label="Dashboard Description"
          type="description"
          fullWidth
          onChange={handleDescription}
          InputLabelProps={{
            className: classes.label,
          }}
          InputProps={{
            className: classes.label,
          }}
        />
      </DialogContent>
      <DialogActions className={classes.dialog}>
        <Button onClick={close} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={create} variant="contained" color="secondary">
          {loading ? <FacebookCircularProgress /> : "Create"}
        </Button>
      </DialogActions>
      {error && <ErrorToast error={error} />}
    </Modal>
  );
};

export default CreateDashboardModal;
