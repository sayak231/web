import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import TaskCard from "./TaskCard.jsx";

const useStyles = makeStyles(() => ({
  paper: {
    margin: "1vh 1.5vw",
    minHeight: "40vh",
    height: "50vh",
    width: "30vw",
    backgroundImage: "linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)",
  },
  taskPaper: {
    height: "100%",
    textAlign: "center",
    paddingTop: "auto",
    backgroundColor: "transparent",
  },
  taskPaper1: {
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
    transition: "background-color 0.2s ease",
    backgroundImage: "linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)",
  },
  taskPaper2: {
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
    transition: "background-color 0.2s ease",
    backgroundColor: "yellow",
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
  loading,
  draggableId,
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant="h6" className={classes.statusHeader}>
        {status}
      </Typography>
      <Divider />
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <Paper
            className={
              snapshot.isDraggingOver ? classes.taskPaper2 : classes.taskPaper1
            }
            innerRef={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks?.map((task, index) => (
              <TaskCard
                loggedInUserId={loggedInUserId}
                creator={creator}
                key={`task${task.id}`}
                task={task}
                dashboard={dashboard}
                getDash={getDash}
                index={index}
                taskLoading={loading}
                draggableId={draggableId}
              />
            ))}
            {provided.placeholder}
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <Paper
                className={classes.taskPaper}
              >{`No Tasks ${status.toLowerCase()}`}</Paper>
            )}
          </Paper>
        )}
      </Droppable>
    </Paper>
  );
};

export default TaskContainer;
