import React from "react";

import { APIBase } from "../Data/api";

import "./TMAssignee.css";

export default function TMAssignee(props) {
  return (
    <div
      className="tmassignee"
      data-selected={props.selected}
      onClick={() => props.clickAssignee(props.assignee._id)}
    >
      <img src={`${APIBase()}${props.assignee.avatarUrl}`} alt="Avatar" />
      <span>{`${props.assignee.firstName} ${props.assignee.lastName} (${props.assignee.email})`}</span>
    </div>
  );
}
