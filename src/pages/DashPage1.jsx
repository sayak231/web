import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CircularProgress from "@material-ui/core/CircularProgress";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import ErrorToast from "../components/ErrorToast.jsx";
import ScrollableTabsButtonAuto from "../components/ScrollableTabsButtonAuto.jsx";
import CreateTaskModal1 from "../components/CreateTaskModal1.jsx";
import { getErrorMessage } from "../utils/getError";
import { ME_ } from "../Queries.js";
import AddMembersModal from "../components/AddMembersModal.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "70vw",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    boxShadow: "none",
    textTransform: "uppercase",
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
  },
  paperCreateTask: {
    padding: theme.spacing(2),
    textAlign: "left",
    boxShadow: "none",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
  },
  paperEditAndDeleteTask: {
    padding: theme.spacing(2),
    textAlign: "right",
    boxShadow: "none",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
  },
  button: {
    margin: theme.spacing(1),
    backgroundImage: "linear-gradient(to bottom, #0066eb 21%, #7752ff 89%)",
  },
  tabContainer: {
    height: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    backgroundColor: "transparent",
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

const DashPage1 = ({
  getDash,
  getDashboardLoading,
  getDashboardError,
  getDashboardData,
  handleDelete,
  deleteDashboardLoading,
  getDashboardsLoading,
}) => {
  const classes = useStyles();

  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [editCreateTask, setEditCreateTask] = useState(false);
  const [addMembers, setAddMembers] = useState(false);

  const { data: userData } = useQuery(ME_, {
    fetchPolicy: "cache-only",
  });
  const loggedInUserId = userData?.me.id;

  const { id, name, description, creator_id, members } = getDashboardData;
  console.log("hhh", getDashboardData, members);

  const openCreateTaskModal = () => {
    setOpenCreateTask(true);
  };

  const closeCreateTaskModal = () => {
    setOpenCreateTask(false);
  };

  const openEditTaskModal = () => {
    setEditCreateTask(true);
  };

  const closeEditTaskModal = () => {
    setEditCreateTask(false);
  };

  const openAddMembersModal = () => {
    setAddMembers(true);
  };

  const closeAddMemberskModal = () => {
    setAddMembers(false);
  };

  if (getDashboardLoading || deleteDashboardLoading || getDashboardsLoading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress className={classes.circularProgress} />
      </div>
    );
  }

  if (getDashboardError) {
    return <ErrorToast error={getErrorMessage(getDashboardError)} />;
  }
  return (
    <>
      <div className={classes.root}>
        {!getDashboardData ? (
          "Create a dashboard"
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h4">{name}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h6">{description}</Typography>
              </Paper>
            </Grid>
            {parseInt(loggedInUserId) === creator_id && (
              <>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paperCreateTask}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.button}
                      onClick={openCreateTaskModal}
                      startIcon={<NoteAddIcon />}
                    >
                      Create Task
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paperEditAndDeleteTask}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.button}
                      onClick={openAddMembersModal}
                      startIcon={<SupervisedUserCircleIcon />}
                    >
                      Add Members
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.button}
                      //   onClick={openCreateTaskModal}
                      startIcon={<EditIcon />}
                    >
                      Edit Dashboard
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.button}
                      onClick={handleDelete}
                      startIcon={<DeleteForeverIcon />}
                    >
                      Delete Dashboard
                    </Button>
                  </Paper>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Paper className={classes.tabContainer}>
                <ScrollableTabsButtonAuto members={members} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
      <CreateTaskModal1
        getDash={getDash}
        loggedInUserId={loggedInUserId}
        members={members}
        open={openCreateTask}
        close={closeCreateTaskModal}
        dashboard={id}
      />
      <AddMembersModal
        getDash={getDash}
        open={addMembers}
        close={closeAddMemberskModal}
        dashboard={id}
      />
    </>
  );
};

export default DashPage1;
