import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Button from "@material-ui/core/Button";
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

import CircularProgress from "@material-ui/core/CircularProgress";
import FacebookCircularProgress from "./FacebookCircularProgress.jsx";
import ErrorToast from "./ErrorToast.jsx";
import { GET_ALL_USERS, ADD_MEMBER } from "../Queries.js";
import { getErrorMessage } from "../utils/getError";

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
  circularProgress: {
    color: theme.palette.spinner.main,
  },
  spinner: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AddMembersModal = ({ open, close, dashboard, getDash }) => {
  const classes = useStyles();

  const [member, setMember] = useState("");

  const {
    loading: getAllUsersLoading,
    error: getAllUsersError,
    data: allUsers,
  } = useQuery(GET_ALL_USERS, {
    fetchPolicy: "cache-first",
  });

  const [addMember, { loading: addMemberLoading, error: addMemberError }] =
    useMutation(ADD_MEMBER, {
      variables: { id: parseInt(dashboard), memberId: parseInt(member) },
    });

  const handleMember = (e) => {
    setMember(e.target.value);
  };

  const handleAddMember = async () => {
    try {
      const response = await addMember();
      if (response && response.data) {
        getDash({ variables: { id: parseInt(dashboard) } });
        close();
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  if (getAllUsersLoading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress className={classes.circularProgress} />
      </div>
    );
  }

  if (getAllUsersError) {
    return <ErrorToast error={getErrorMessage(getAllUsersError)} />;
  }

  return (
    <Modal
      disableBackdropClick
      open={open}
      onClose={close}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className={classes.dialog} id="form-dialog-title">
        ADD MEMBER
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText className={classes.label}>
          Select a member to include in your Dashboard to speed up your project.
        </DialogContentText>
        <FormControl className={classes.formControl}>
          <InputLabel
            className={classes.label}
            id="demo-simple-select-helper-label"
          >
            Member
          </InputLabel>
          <Select
            classes={{
              root: classes.label,
              icon: classes.label,
            }}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={member}
            onChange={handleMember}
          >
            {allUsers?.getAllUsers.map(({ id, firstname, lastname }) => (
              <MenuItem key={`dropdown${id}${firstname}`} value={id}>
                {firstname} {lastname}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className={classes.label}>
            Add a member to your Dashboard
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions className={classes.dialog}>
        <Button onClick={close} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button
          // disabled={disabled}
          onClick={handleAddMember}
          variant="contained"
          color="secondary"
        >
          {addMemberLoading ? <FacebookCircularProgress /> : "ADD"}
        </Button>
      </DialogActions>
      {addMemberError && <ErrorToast error={getErrorMessage(addMemberError)} />}
    </Modal>
  );
};

export default AddMembersModal;
