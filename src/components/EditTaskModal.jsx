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
import { EDIT_TASK } from "../Queries.js";

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundImage: theme.palette.mainBackgroundColor,
    color: "#FFFFFF",
  },
  label: {
    color: "#FFFFFF !important",
  },
  formControl: {
    width: "100%",
  },
}));

const EditTaskModal = ({
  getDash,
  open,
  close,
  dashboard,
  taskId,
  name,
  description,
}) => {
  const classes = useStyles();

  const [taskName, setTaskName] = useState(name);
  const [taskDescription, setTaskDescription] = useState(description);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      taskName &&
      taskDescription &&
      (taskName.length < 3 || taskDescription.length < 5)
    ) {
      setDisabled(true);
    } else setDisabled(false);
    // eslint-disable-next-line
  }, [taskName, taskDescription]);

  const [editTask, { loading, error }] = useMutation(EDIT_TASK);

  const handleName = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleEdit = async () => {
    try {
      const response = await editTask({
        variables: {
          id: parseInt(taskId),
          dashboard: parseInt(dashboard),
          name: taskName,
          description: taskDescription,
        },
      });
      if (response && response.data) {
        getDash({ variables: { id: parseInt(dashboard) } });
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
        EDIT TASK
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText className={classes.label}>
          To edit a Task, Please provide a new Task name and its description.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task Name"
          type="name"
          fullWidth
          onChange={handleName}
          value={taskName}
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
          label="Task Description"
          type="description"
          fullWidth
          onChange={handleDescription}
          value={taskDescription}
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
          disabled={disabled}
          onClick={handleEdit}
          variant="contained"
          color="secondary"
        >
          {loading ? <FacebookCircularProgress /> : "Edit"}
        </Button>
      </DialogActions>
      {error && <ErrorToast error={error} />}
    </Modal>
  );
};

export default EditTaskModal;
