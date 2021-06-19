import React from "react";

const MemberTab = ({ selectedMember, setSelectedMember, members }) => {
  return (
    <ul className="nav nav-tabs">
      {members.map(({ id, firstname }) => (
        <li
          key={id}
          onClick={() => setSelectedMember(id)}
          className={`name-tab nav-link ${
            selectedMember === id ? "active" : ""
          }`}
        >
          {firstname}
        </li>
      ))}
    </ul>
  );
};

export default MemberTab;
