import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import TaskContainer from "./TaskContainer.jsx";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
  },
}));

const TaskBoard = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box} component="div" m={1}>
      <TaskContainer status={"To Do"} />
      <TaskContainer status={"In progress"} />
      <TaskContainer status={"Done"} />
    </Box>
  );
};

export default TaskBoard;
