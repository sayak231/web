import React, { useState, useEffect } from "react";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "./Modal.jsx";

const CreateTaskModal = ({
  loggedInUserId,
  dashboard,
  members,
  createTaskForAnyone,
  show,
  getDash,
  close,
  isDashboardOwner,
  selectedMember,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignTo, setAssignTo] = useState(members[0].id);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (
      taskName.length < 3 ||
      taskDescription.length < 4 ||
      assignTo.length === 0
    ) {
      setDisable(true);
    } else setDisable(false);
  }, [taskName, taskDescription, assignTo]);

  const handleSave = async () => {
    try {
      const response = await createTaskForAnyone({
        variables: {
          name: taskName,
          description: taskDescription,
          assignTo: isDashboardOwner
            ? parseInt(selectedMember)
            : parseInt(assignTo),
          dashboard: parseInt(dashboard),
        },
      });
      if (response && response.data) {
        console.log("response.data", response.data);
        getDash({ variables: { id: parseInt(dashboard) } });
        close();
      }
    } catch (e) {
      console.error("error", e);
    }
  };
  return (
    <Modal isOpen={show}>
      <ModalHeader>
        <h3>This is modal header</h3>
        <button
          onClick={close}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </ModalHeader>
      <ModalBody>
        <input
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter Task name"
        />
        <input
          type="text"
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter Task description"
        />
        {!isDashboardOwner && (
          <select onChange={(e) => setAssignTo(e.target.value)}>
            {members.map(({ id, firstname }) => (
              <option key={`dropdown${id}${firstname}`} value={id}>
                {loggedInUserId == id ? "Me" : firstname}
              </option>
            ))}
          </select>
        )}
      </ModalBody>
      <ModalFooter>
        <button onClick={close} type="button" className="btn btn-secondary">
          Close
        </button>
        <button
          disabled={disable}
          type="button"
          onClick={handleSave}
          className="btn btn-primary"
        >
          Save changes
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskModal;
