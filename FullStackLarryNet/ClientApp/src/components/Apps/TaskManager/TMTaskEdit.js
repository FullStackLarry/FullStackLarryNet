import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyOptions } from "../Common/common";

import { getToken } from "../Data/token";
import { APIUrl } from "../Data/api";
import httpStatus from "../Data/httpStatus";
import ModalSpinner from "../Common/ModalSpinner";

import { convertDate, displayDate } from "../Common/common";

import "../Common/common.css";
import "../Common/Auth.css";

export default function TMTaskEdit(props) {
  const statuses = ["Not Started", "Started", "Completed"];

  const [name, setName] = useState(props.task.name);
  const nameRef = useRef(null);
  const [description, setDescription] = useState(props.task.description);
  const descriptionRef = useRef(null);
  const [status, setStatus] = useState(props.task.status);
  const statusRef = useRef(null);
  const [assignedDate, setAssignedDate] = useState(
    convertDate(props.task.assignedDate)
  );
  const [startedDate, setStartedDate] = useState(
    convertDate(props.task.startedDate)
  );
  const [completedDate, setCompletedDate] = useState(
    convertDate(props.task.completedDate)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.user._id === props.task.owner) nameRef.current.focus();
    else statusRef.current.focus();
  }, []);

  const statusOptions = statuses.map((s) => {
    return (
      <option key={s} value={s}>
        {s}
      </option>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const token = getToken();

    let body = {
      owner: props.task.owner,
      assignedTo: props.task.assignedTo,
      name: name,
      description: description,
      status: status,
      assignedDate: displayDate(assignedDate),
      startedDate: displayDate(startedDate),
      completedDate: displayDate(completedDate),
    };

    if (props.task._id) {
      body._id = props.task._id;
      axios
        .put(`${APIUrl()}TM/tasks`, body, {
          headers: { Authorization: token },
        })
        .then((res) => {
          if (res.status === httpStatus.OK) {
            props.loadTasks();
            setLoading(false);
            props.closeForm();
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            toast.error(
              `${error.response.statusText}: ${error.response.data.error}`,
              toastifyOptions
            );
          } else {
            toast.error(`${error}`, toastifyOptions);
          }
        });
    } else {
      axios
        .post(`${APIUrl()}TM/tasks`, body, {
          headers: { Authorization: token },
        })
        .then((res) => {
          if (res.status === httpStatus.CREATED) {
            props.loadTasks();
            setLoading(false);
            props.closeForm();
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            toast.error(
              `${error.response.statusText}: ${error.response.data.error}`,
              toastifyOptions
            );
          } else {
            toast.error(error, toastifyOptions);
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth">
        <div className="auth-header">{`${
          !props.task._id ? "New" : "Edit"
        } Task`}</div>
        <div className="auth-detail">
          <div className="auth-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter task name"
              minLength="1"
              maxLength="30"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={nameRef}
              disabled={props.task.owner !== props.user._id}
            />
          </div>
          <div className="auth-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter task description"
              rows="5"
              maxLength="200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              ref={descriptionRef}
              disabled={props.task.owner !== props.user._id}
            />
            <div className="auth-info">{`${
              description ? 200 - description.length : 200
            } chars left`}</div>
          </div>
          <div className="auth-group">
            <label>Status</label>
            <select
              name="status"
              value={props.task.status}
              onChange={(e) => setStatus(e.target.value)}
              ref={statusRef}
            >
              {statusOptions}
            </select>
          </div>
          <div className="auth-group">
            <label>Assigned Date</label>
            <input
              type="date"
              name="assignedDate"
              value={assignedDate}
              onChange={(e) => setAssignedDate(e.target.value)}
            />
          </div>
          <div className="auth-group">
            <label>Started Date</label>
            <input
              type="date"
              name="startedDate"
              value={startedDate}
              onChange={(e) => setStartedDate(e.target.value)}
            />
          </div>
          <div className="auth-group">
            <label>Completed Date</label>
            <input
              type="date"
              name="completedDate"
              value={completedDate}
              onChange={(e) => setCompletedDate(e.target.value)}
            />
          </div>
          <div className="auth-buttons">
            <input type="submit" value="Save" disabled={name === ""} />
            <input
              type="button"
              value="Cancel"
              onClick={() => props.closeForm()}
            />
          </div>
          <ModalSpinner loading={loading} />
          <ToastContainer />
        </div>
      </div>
    </form>
  );
}
