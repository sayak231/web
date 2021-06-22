import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import TaskContainer from "./TaskContainer.jsx";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
  },
}));

const TaskBoard = ({ tasks, loggedInUserId, creator, dashboard, getDash }) => {
  const classes = useStyles();
  return (
    <Box className={classes.box} component="div" m={1}>
      <TaskContainer
        loggedInUserId={loggedInUserId}
        creator={creator}
        tasks={tasks.filter((task) => task.status === 1)}
        dashboard={dashboard}
        getDash={getDash}
        status={"To Do"}
      />
      <TaskContainer
        loggedInUserId={loggedInUserId}
        creator={creator}
        tasks={tasks.filter((task) => task.status === 2)}
        dashboard={dashboard}
        getDash={getDash}
        status={"In progress"}
      />
      <TaskContainer
        loggedInUserId={loggedInUserId}
        creator={creator}
        tasks={tasks.filter((task) => task.status === 3)}
        dashboard={dashboard}
        getDash={getDash}
        status={"Done"}
      />
    </Box>
  );
};

export default TaskBoard;
