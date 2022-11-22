import React, { useState } from "react";

import TMAssignee from "./TMAssignee";

import "./TMAssignees.css";

export default function TMAssignees(props) {
  const [assigneeEmail, setAssigneeEmail] = useState("");

  let assigneesList = null;
  if (props.assignees) {
    assigneesList = props.assignees.map((assignee) => {
      return (
        <TMAssignee
          key={assignee._id}
          assignee={assignee}
          clickAssignee={props.clickAssignee}
          selected={props.currentAssigneeId === assignee._id}
        />
      );
    });
  }

  const handleAssigneeEmailChange = (e) => {
    setAssigneeEmail(e.target.value);
  };

  return (
    <div className="tmassignees">
      <div className="tmassignees-header">
        <div className="tmassignees-title">
          <h3>Assignees</h3>
        </div>
        <div className="tmassignees-input">
          <input
            type="text"
            name="assigneeEmail"
            placeholder="Enter assignee email"
            value={assigneeEmail}
            onChange={handleAssigneeEmailChange}
            maxLength="256"
          />
          <button
            onClick={() => props.addAssignee(assigneeEmail)}
            disabled={assigneeEmail === ""}
          >
            Add Assignee
          </button>
        </div>
      </div>
      <div className="tmassignees-items">{assigneesList}</div>
    </div>
  );
}
