import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyOptions } from "../Common/common";

import { APIUrl } from "../Data/api";
import httpStatus from "../Data/httpStatus";
import ModalSpinner from "../Common/ModalSpinner";

import "../Common/Auth.css";

export default function ValidateEmail(props) {
  const emailInput = useRef(null);
  const validationCodeInput = useRef(null);
  const [email, setEmail] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (props.email !== "") {
      setEmail(props.email);
      validationCodeInput.current.focus();
    } else {
      emailInput.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${APIUrl()}auth/validateemail`, {
        email: encodeURI(email),
        code: validationCode,
      })
      .then((res) => {
        if (res.status === httpStatus.NO_CONTENT) {
          setInfoMessage(
            "Email was successfully validated. You may now log in."
          );
        }
      })
      .catch((error) => {
        if (error.response)
          toast.error(
            `${error.response.statusText}: ${error.response.data.error}`,
            toastifyOptions
          );
        else toast.error(`${error}`, toastifyOptions);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth">
        <div className="auth-header">Validate Email</div>
        <div className="auth-detail">
          <div className="auth-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength="256"
              ref={emailInput}
            />
          </div>
          <div className="auth-group">
            <label>Validation Code</label>
            <input
              type="text"
              name="validationCode"
              placeholder="Enter validation code"
              value={validationCode}
              onChange={(e) => setValidationCode(e.target.value)}
              maxLength="20"
              ref={validationCodeInput}
            />
          </div>
          <div className="auth-buttons">
            <input type="submit" value="Validate" />
            <input
              type="button"
              value="Cancel"
              onClick={() => props.closeForm()}
            />
          </div>
          <Modal
            isOpen={infoMessage !== ""}
            contentLabel="Error"
            className="info-modal"
            overlayClassName="info-overlay"
            appElement={document.getElementById("root")}
          >
            <p>{infoMessage}</p>
            <div>
              <button
                onClick={() => {
                  setInfoMessage("");
                  props.openLogin(email);
                }}
              >
                Close
              </button>
            </div>
          </Modal>
          <ModalSpinner loading={loading} />
          <ToastContainer />
        </div>
      </div>
    </form>
  );
}
