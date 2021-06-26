import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CircularProgress from "@material-ui/core/CircularProgress";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import Box from "@material-ui/core/Box";

import ErrorToast from "../components/ErrorToast.jsx";
import ScrollableTabsButtonAuto from "../components/ScrollableTabsButtonAuto.jsx";
import CreateTaskModal1 from "../components/CreateTaskModal1.jsx";
import { getErrorMessage } from "../utils/getError";
import { ME_, GET_ALL_USERS } from "../Queries.js";
import AddMembersModal from "../components/AddMembersModal.jsx";
import EditDashboardModal from "../components/EditDashboardModal.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "70vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    height: "7%",
    paddingTop: "10px",
    textAlign: "center",
    boxShadow: "none",
    textTransform: "uppercase",
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
  },
  paperCreateTask: {
    textAlign: "left",
    boxShadow: "none",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
  },
  paperEditAndDeleteTask: {
    textAlign: "right",
    boxShadow: "none",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    marginLeft: "auto",
  },
  buttonContainer: {
    width: "100%",
    height: "10%",
    display: "inline-flex",
    backgroundColor: "transparent",
    padding: "0 2vh",
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
  const [editDashboard, setEditDashboard] = useState(false);
  const [addMembers, setAddMembers] = useState(false);
  const [localCreateTask, setLocalCreateTask] = useState(false);

  const { data: userData } = useQuery(ME_, {
    fetchPolicy: "cache-only",
  });
  const {
    loading: getAllUsersLoading,
    error: getAllUsersError,
    data: allUsers,
  } = useQuery(GET_ALL_USERS, {
    fetchPolicy: "cache-first",
  });
  const loggedInUserId = userData?.me.id;

  const { id, name, description, creator_id, members, creator } =
    getDashboardData;

  const openCreateTaskModal = () => {
    if (parseInt(loggedInUserId) !== creator_id) {
      setLocalCreateTask(true);
      setOpenCreateTask(true);
    }
    setOpenCreateTask(true);
  };

  const closeCreateTaskModal = () => {
    if (parseInt(loggedInUserId) !== creator_id) {
      setLocalCreateTask(false);
      setOpenCreateTask(false);
    }
    setOpenCreateTask(false);
  };

  const openEditDashboardModal = () => {
    setEditDashboard(true);
  };

  const closeEditDashboardModal = () => {
    setEditDashboard(false);
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
          <>
            <Paper className={classes.paper}>
              <Typography variant="h5">{name}</Typography>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="subtitle1">{description}</Typography>
            </Paper>
            {parseInt(loggedInUserId) === creator_id && (
              <Paper
                component="div"
                className={classes.buttonContainer}
                elevation={0}
              >
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
                    onClick={openEditDashboardModal}
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
              </Paper>
            )}
            <Paper className={classes.tabContainer}>
              <ScrollableTabsButtonAuto
                creator={creator_id}
                loggedInUserId={loggedInUserId}
                members={members}
                open={openCreateTaskModal}
                dashboard={id}
                getDash={getDash}
              />
            </Paper>
          </>
        )}
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {getDashboardData &&
              `© Created by ${creator.firstname} ${creator.lastname}`}
          </Typography>
        </Box>
      </div>
      <CreateTaskModal1
        getDash={getDash}
        loggedInUserId={loggedInUserId}
        members={members}
        open={openCreateTask}
        close={closeCreateTaskModal}
        dashboard={id}
        localCreateTask={localCreateTask}
      />
      <AddMembersModal
        getDash={getDash}
        open={addMembers}
        close={closeAddMemberskModal}
        dashboard={id}
        getAllUsersLoading={getAllUsersLoading}
        getAllUsersError={getAllUsersError}
        allUsers={allUsers}
      />
      <EditDashboardModal
        open={editDashboard}
        close={closeEditDashboardModal}
        id={id}
        getDash={getDash}
        name={name}
        description={description}
      />
    </>
  );
};

export default DashPage1;
