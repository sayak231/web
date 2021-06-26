import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

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
import { EDIT_DASHBOARD } from "../Queries.js";
import { getErrorMessage } from "../utils/getError";

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundImage: theme.palette.mainBackgroundColor,
    color: "#FFFFFF",
  },
  label: {
    color: "#FFFFFF !important",
  },
}));

const EditDashboardModal = ({
  open,
  close,
  id,
  getDash,
  name,
  description,
}) => {
  const classes = useStyles();

  const [dashName, setDashName] = useState(name);
  const [dashDescription, setDashDescription] = useState(description);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (
      dashName &&
      dashDescription &&
      (dashName.length < 3 || dashDescription.length < 4)
    ) {
      setDisable(true);
    } else setDisable(false);
  }, [dashName, dashDescription]);

  const handleName = (e) => {
    setDashName(e.target.value);
  };

  const handleDescription = (e) => {
    setDashDescription(e.target.value);
  };

  const [editDashboard, { loading, error }] = useMutation(EDIT_DASHBOARD);

  const handleEdit = async () => {
    try {
      const response = await editDashboard({
        variables: {
          id: parseInt(id),
          name: dashName,
          description: dashDescription,
        },
      });

      if (response && response.data) {
        getDash();
        close();
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  return (
    <Modal
      disableBackdropClick
      open={open}
      onClose={close}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className={classes.dialog} id="form-dialog-title">
        EDIT DASHBOARD
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText className={classes.label}>
          To create a Dashboard, Please provide a new Dashboard name and its
          description.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Dashboard Name"
          type="name"
          fullWidth
          value={dashName}
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
          value={dashDescription}
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
        <Button
          disabled={disable}
          onClick={handleEdit}
          variant="contained"
          color="secondary"
        >
          {loading ? <FacebookCircularProgress /> : "Edit"}
        </Button>
      </DialogActions>
      {error && <ErrorToast error={getErrorMessage(error)} />}
    </Modal>
  );
};

export default EditDashboardModal;
