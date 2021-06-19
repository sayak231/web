import React from "react";
import Task from "./Task.jsx";

const TaskBoard = ({ openCreateTaskModal, tasks, showCreateTask }) => {
  const toBeDone = tasks.filter((task) => {
    return task.status === 1;
  });

  const inProgress = tasks.filter((task) => {
    return task.status === 2;
  });

  const done = tasks.filter((task) => {
    return task.status === 3;
  });
  return (
    <>
      {showCreateTask && (
        <button onClick={openCreateTaskModal}>Create Task</button>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "85vw",
        }}
      >
        <div
          style={{
            overflowY: "auto",
            backgroundColor: "grey",
            height: "40vh",
            width: "20vw",
          }}
        >
          To be done
          {toBeDone.length > 0
            ? toBeDone.map((task, index) => (
                <Task task={task} key={`${task.id}${index}`} />
              ))
            : "No tasks to be done"}
        </div>
        <div
          style={{
            overflowY: "auto",
            backgroundColor: "grey",
            height: "40vh",
            width: "20vw",
          }}
        >
          In progress
          {inProgress.length > 0
            ? inProgress.map((task, index) => (
                <Task task={task} key={`${task.id}${index}`} />
              ))
            : "No tasks in progress"}
        </div>
        <div
          style={{
            overflowY: "auto",
            backgroundColor: "grey",
            height: "40vh",
            width: "20vw",
          }}
        >
          Done
          {done.length > 0
            ? done.map((task, index) => (
                <Task task={task} key={`${task.id}${index}`} />
              ))
            : "No tasks done"}
        </div>
      </div>
    </>
  );
};

export default TaskBoard;
