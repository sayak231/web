import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import TaskContainer from "./TaskContainer.jsx";
import { CHANGE_TASK_STATUS } from "../Queries";
import { getErrorMessage } from "../utils/getError";
import ErrorToast from "../components/ErrorToast.jsx";

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
  },
}));

const TaskBoard = ({ tasks, loggedInUserId, creator, dashboard, getDash }) => {
  const classes = useStyles();

  const [dragId, setDragId] = useState(-1);

  const [
    changeTaskStatus,
    { loading: changeTaskStatusLoading, error: changeTaskStatusError },
  ] = useMutation(CHANGE_TASK_STATUS);

  const [columns, setColumns] = useState({
    "To Do": tasks.filter((task) => task.status === 1),
    "In progress": tasks.filter((task) => task.status === 2),
    Done: tasks.filter((task) => task.status === 3),
  });

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    setDragId(draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;
    const startColumn = columns[start];
    const finishColumn = columns[finish];

    if (startColumn === finishColumn) {
      const newTasks = Array.from(startColumn);
      newTasks.splice(source.index, 1);
      newTasks.splice(
        destination.index,
        0,
        startColumn.find((task) => task.id === draggableId)
      );

      const newColumn = {
        ...columns,
        [start]: newTasks,
      };

      setColumns(newColumn);
      return;
    }

    const startTasks = Array.from(startColumn);
    startTasks.splice(source.index, 1);

    const finishTasks = Array.from(finishColumn);
    finishTasks.splice(
      destination.index,
      0,
      startColumn.find((task) => task.id === draggableId)
    );
    setColumns({
      ...columns,
      [start]: startTasks,
      [finish]: finishTasks,
    });

    try {
      const postStatus =
        finish === "In progress" ? 2 : finish === "To Do" ? 1 : 3;

      await changeTaskStatus({
        variables: {
          id: parseInt(draggableId),
          status: postStatus,
          dashboard: parseInt(dashboard),
        },
      });
    } catch (error) {
      finishTasks.splice(destination.index, 1);
      startTasks.splice(
        source.index,
        0,
        startColumn.find((task) => task.id === draggableId)
      );
      setColumns({
        ...columns,
        [start]: startTasks,
        [finish]: finishTasks,
      });
      console.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className={classes.box} component="div" m={1}>
        <TaskContainer
          loggedInUserId={loggedInUserId}
          creator={creator}
          tasks={columns["To Do"]}
          dashboard={dashboard}
          getDash={getDash}
          status={"To Do"}
          loading={changeTaskStatusLoading}
          draggableId={dragId}
        />
        <TaskContainer
          loggedInUserId={loggedInUserId}
          creator={creator}
          tasks={columns["In progress"]}
          dashboard={dashboard}
          getDash={getDash}
          status={"In progress"}
          loading={changeTaskStatusLoading}
          draggableId={dragId}
        />
        <TaskContainer
          loggedInUserId={loggedInUserId}
          creator={creator}
          tasks={columns["Done"]}
          dashboard={dashboard}
          getDash={getDash}
          status={"Done"}
          loading={changeTaskStatusLoading}
          draggableId={dragId}
        />
      </Box>
      {changeTaskStatusError && (
        <ErrorToast error={getErrorMessage(changeTaskStatusError)} />
      )}
    </DragDropContext>
  );
};

export default TaskBoard;
