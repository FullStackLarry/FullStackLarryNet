import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyOptions } from "../Common/common";

import { APIUrl } from "../Data/api";
import httpStatus from "../Data/httpStatus";
import { saveToken } from "../Data/token";
import ModalSpinner from "../Common/ModalSpinner";

import "../Common/Auth.css";

export default function Login(props) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [formData, setFormData] = useState({
    email: props.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.email) passwordRef.current.focus();
    else emailRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(`${APIUrl()}auth/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.status === httpStatus.OK) {
          saveToken(res.data.token);
          props.loadUser();
        }
      })
      .catch((error) => {
        if (!error.response) toast.error(`${error.message}`, toastifyOptions);
        else
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
        <div className="auth-header">Login</div>
        <div className="auth-detail">
          <div className="auth-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              maxLength="256"
              ref={emailRef}
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
              maxLength="20"
              ref={passwordRef}
            />
          </div>
          <div className="auth-buttons">
            <input type="submit" value="Login" />
            <button onClick={() => props.closeForm()}>Cancel</button>
          </div>
          <div className="auth-extra-buttons">
            <input
              type="button"
              value="Register"
              onClick={() => {
                props.openRegister();
              }}
            />
            <p>If you have not registered.</p>
            <input
              type="button"
              value="Send Validation Email"
              onClick={() => props.openEmail()}
            />
            <p>If you have not received your validation email.</p>
            <input
              type="button"
              value="Validate Email"
              onClick={() => props.openValidate()}
            />
            <p>If you have not validated your email.</p>
          </div>
          <ModalSpinner loading={loading} />
          <ToastContainer />
        </div>
      </div>
    </form>
  );
}
