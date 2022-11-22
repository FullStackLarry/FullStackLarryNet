import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyOptions } from "../Common/common";

import { APIUrl } from "../Data/api";
import httpStatus from "../Data/httpStatus";
import ModalSpinner from "../Common/ModalSpinner";

import "../Common/common.css";
import "../Common/Auth.css";

export default function Register(props) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const body = {
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      password: formData.password,
    };

    axios
      .post(`${APIUrl()}auth/Register`, body)
      .then((res) => {
        if (res.status === httpStatus.CREATED) {
          setInfoMessage(
            `Your account has been registered. A validation code has been sent to ${emailRef.current.value}.` +
              ` Please check your SPAM folder if you do not receive it.` +
              ` Enter the code on the next screen to validate.`
          );
        }
      })
      .catch((error) => {
        toast.error(
          `${error.response.statusText}: ${error.response.data.error}`,
          toastifyOptions
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth">
        <div className="auth-header">Register</div>
        <div className="auth-detail">
          <div className="auth-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              minLength="6"
              maxLength="256"
              ref={emailRef}
            />
          </div>
          <div className="auth-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              minLength="1"
              maxLength="30"
              ref={firstNameRef}
            />
          </div>
          <div className="auth-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              minLength="1"
              maxLength="30"
              ref={lastNameRef}
            />
          </div>
          <div className="auth-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              minLength="1"
              maxLength="20"
            />
          </div>
          <div className="auth-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-type password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              minLength="1"
              maxLength="20"
            />
            {passwordError !== "" && (
              <div className="auth-error">{passwordError}</div>
            )}
          </div>
          <div className="auth-buttons">
            <input
              type="submit"
              value="Register"
              disabled={formData.password === "" || passwordError !== ""}
            />
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
                  props.openValidate(emailRef.current.value);
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
