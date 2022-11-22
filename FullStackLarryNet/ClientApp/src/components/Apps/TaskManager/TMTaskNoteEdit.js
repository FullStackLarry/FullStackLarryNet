import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyOptions } from "../Common/common";

import { APIUrl } from "../Data/api";
import httpStatus from "../Data/httpStatus";
import ModalSpinner from "../Common/ModalSpinner";

import "../Common/common.css";
import "../Common/Auth.css";
import { getToken } from "../Data/token";

export default function TMTaskNoteEdit(props) {
  const noteRef = useRef(null);
  const [note, setNote] = useState(props.taskNote.note);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    noteRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const token = getToken();

    const enteredDate = new Date();

    const body = {
      task: props.taskNote.task,
      enteredDate: `${enteredDate.toLocaleDateString()} ${enteredDate.toLocaleTimeString()}`,
      note: note,
    };

    if (props.taskNote._id) {
      body._id = props.taskNote._id;
      axios
        .put(`${APIUrl()}TM/tasknotes`, body, {
          headers: { Authorization: token },
        })
        .then((res) => {
          if (res.status === httpStatus.OK) {
            props.loadTaskNotes();
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
        .post(`${APIUrl()}TM/tasknotes`, body, {
          headers: { Authorization: token },
        })
        .then((res) => {
          if (res.status === httpStatus.CREATED) {
            props.loadTaskNotes();
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth">
        <div className="auth-header">Edit Note</div>
        <div className="auth-detail">
          <div className="auth-group">
            <label>Note</label>
            <textarea
              name="note"
              placeholder="Enter task note"
              value={note}
              rows="5"
              maxLength="200"
              onChange={(e) => {
                setNote(e.target.value);
              }}
              ref={noteRef}
            />
          </div>
          <div className="auth-info">{`${
            note ? 200 - note.length : 200
          } chars left`}</div>
          <div className="auth-buttons">
            <input type="submit" value="Save" disabled={note === ""} />
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
