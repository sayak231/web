import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import TaskCard from "./TaskCard.jsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5),
    minHeight: "40vh",
    height: "50vh",
    width: "30vw",
    backgroundImage: "linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)",
  },
  taskPaper: {
    overflowY: "auto",
    height: "45vh",
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      border: "4px solid transparent",
      borderRadius: "8px",
      backgroundClip: "padding-box",
    },
    "&::-webkit-scrollbar": {
      width: "16px",
    },
  },
  statusHeader: {
    fontWeight: 500,
    height: "5vh",
    color: "white",
    textAlign: "center",
    backgroundImage: "linear-gradient(to bottom, #0066eb 21%, #7752ff 89%)",
    padding: "1vh 0",
    position: "sticky",
    top: "0",
    zIndex: 7,
  },
}));

const TaskContainer = ({
  status,
  tasks,
  loggedInUserId,
  creator,
  dashboard,
  getDash,
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant="h6" className={classes.statusHeader}>
        {status}
      </Typography>
      <Divider />
      {tasks.length > 0 ? (
        <Paper className={classes.taskPaper}>
          {tasks?.map((task) => (
            <TaskCard
              loggedInUserId={loggedInUserId}
              creator={creator}
              key={`task${task.id}`}
              task={task}
              dashboard={dashboard}
              getDash={getDash}
            />
          ))}
        </Paper>
      ) : (
        <Paper className={classes.taskPaper}>{`No Tasks ${status}`}</Paper>
      )}
    </Paper>
  );
};

export default TaskContainer;
