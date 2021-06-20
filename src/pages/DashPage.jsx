import React, { useState, useEffect } from "react";
import MemberTab from "./MemberTab.jsx";
import TaskBoard from "./TaskBoard.jsx";
import CreateTaskModal from "../components/CreateTaskModal.jsx";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ME_, CREATE_TASK } from "../Queries.js";

const DashPage = ({ getDash, loading, error, data }) => {
  const [selectedMember, setSelectedMember] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [getMe, { data: userData }] = useLazyQuery(ME_, {
    fetchPolicy: "cache-only",
  });
  const [createTaskForAnyone] = useMutation(CREATE_TASK);
  const loggedInUserId = userData?.me.id;
  useEffect(() => {
    if (data && data.getDashboardDetails) {
      getMe();
      if (selectedMember === -1) setSelectedMember(members[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log("Dashboard error", error);
    return <div>Error!</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  const { id, name, description, creator_id, members } =
    data.getDashboardDetails;
  const getSelectedMembersTasks = () => {
    const memberSelected =
      members.length > 0 && members !== undefined
        ? members.find(({ id }) => {
            return id === selectedMember;
          })
        : { tasks_assigned: [] };
    return memberSelected !== undefined ? memberSelected.tasks_assigned : [];
  };

  const showCreateTask = (() => {
    // eslint-disable-next-line
    if (loggedInUserId == creator_id || loggedInUserId !== selectedMember)
      return false;
    // eslint-disable-next-line
    else if (loggedInUserId == selectedMember) return true;
  })();

  const openCreateTaskModal = () => {
    setShowModal(true);
  };

  const closeCreateTaskModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ width: "85vw" }}>
      <h1 style={{ textAlign: "center" }}>{name}</h1>
      <h4 style={{ textAlign: "center" }}>{description}</h4>
      {/*eslint-disable-next-line */}
      {loggedInUserId == creator_id && (
        <div>
          <button onClick={openCreateTaskModal}>Create Task</button>
        </div>
      )}
      <MemberTab
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        members={members}
      />
      <TaskBoard
        showCreateTask={showCreateTask}
        tasks={getSelectedMembersTasks()}
        openCreateTaskModal={openCreateTaskModal}
      />
      <CreateTaskModal
        selectedMember={selectedMember}
        isDashboardOwner={showCreateTask}
        close={closeCreateTaskModal}
        getDash={getDash}
        loggedInUserId={loggedInUserId}
        dashboard={id}
        members={members}
        createTaskForAnyone={createTaskForAnyone}
        show={showModal}
      />
    </div>
  );
};

export default DashPage;
