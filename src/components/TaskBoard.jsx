import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import TaskContainer from "./TaskContainer.jsx";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
  },
}));

const TaskBoard = ({ tasks }) => {
  const classes = useStyles();
  console.log("tasks", tasks);
  return (
    <Box className={classes.box} component="div" m={1}>
      <TaskContainer
        tasks={tasks.filter((task) => task.status === 1)}
        status={"To Do"}
      />
      <TaskContainer
        tasks={tasks.filter((task) => task.status === 2)}
        status={"In progress"}
      />
      <TaskContainer
        tasks={tasks.filter((task) => task.status === 3)}
        status={"Done"}
      />
    </Box>
  );
};

export default TaskBoard;
