import React, { useState } from "react";
import axios from "axios";

import { APIUrl } from "../Data/api";
import { getToken } from "../Data/token";

import { displayDate } from "../Common/common";

import "./TMTask.css";

export default function TMTask(props) {
  const [ownerName, setOwnerName] = useState("");
  const token = getToken();

  axios
    .get(`${APIUrl()}users/${props.task.owner}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      setOwnerName(`${res.data.firstName} ${res.data.lastName}`);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div
      className="tmtask"
      data-selected={props.selected}
      onClick={() => props.clickTask(props.task._id)}
    >
      <h3>{`${props.task.name}`}</h3>
      <p>{`${props.task.description}`}</p>
      <div className="tmtask-status">
        <div className="tmtask-label">Status:</div>
        <div className="tmtask-info">{`${props.task.status}`}</div>
      </div>
      <div className="tmtask-status">
        <div className="tmtask-label">Assigned By:</div>
        <div className="tmtask-info">{`${ownerName}`}</div>
      </div>
      <div className="tmtask-dates">
        <div className="tmtask-label">Assigned:</div>
        <div className="tmtask-info">{`${displayDate(
          props.task.assignedDate
        )}`}</div>
        <div className="tmtask-label">Started:</div>
        <div className="tmtask-info">{`${displayDate(
          props.task.startedDate
        )}`}</div>
        <div className="tmtask-label">Completed:</div>
        <div className="tmtask-info">{`${displayDate(
          props.task.completedDate
        )}`}</div>
      </div>
      {props.editable && (
        <button onClick={() => props.editTask(props.task._id)}>Edit</button>
      )}
    </div>
  );
}
