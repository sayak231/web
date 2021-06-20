import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import FacebookCircularProgress from "./FacebookCircularProgress.jsx";
import ErrorToast from "./ErrorToast.jsx";
import { CREATE_TASK } from "../Queries.js";

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

const CreateTaskModal1 = ({
  getDash,
  loggedInUserId,
  members,
  open,
  close,
  dashboard,
}) => {
  const classes = useStyles();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      taskName.length < 3 ||
      taskDescription.length < 5 ||
      assignTo.length === 0
    ) {
      setDisabled(true);
    } else setDisabled(false);
  }, [taskName, taskDescription, assignTo]);

  const [createTask, { loading, error }] = useMutation(CREATE_TASK);

  const handleName = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAssign = (e) => {
    setAssignTo(e.target.value);
  };

  const handleCreate = async () => {
    try {
      const response = await createTask({
        variables: {
          name: taskName,
          description: taskDescription,
          assignTo: parseInt(assignTo),
          dashboard: parseInt(dashboard),
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
        CREATE TASK
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText className={classes.label}>
          To create a Task, Please provide a Task name and its description.
          Also, assign it to someone or yourself.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task Name"
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
          label="Task Description"
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

        <FormControl className={classes.formControl}>
          <InputLabel
            className={classes.label}
            id="demo-simple-select-helper-label"
          >
            Assign To
          </InputLabel>
          <Select
            classes={{
              root: classes.label,
              icon: classes.label,
            }}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={assignTo}
            onChange={handleAssign}
          >
            {members?.map(({ id, firstname }) => (
              <MenuItem key={`dropdown${id}${firstname}`} value={id}>
                {loggedInUserId === id ? "Me" : firstname}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className={classes.label}>
            Who should be doing this ?
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions className={classes.dialog}>
        <Button onClick={close} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={handleCreate}
          variant="contained"
          color="secondary"
        >
          {loading ? <FacebookCircularProgress /> : "Create"}
        </Button>
      </DialogActions>
      {error && <ErrorToast error={error} />}
    </Modal>
  );
};

export default CreateTaskModal1;
