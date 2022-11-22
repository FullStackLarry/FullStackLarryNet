import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyOptions } from "../Common/common";

import { APIBase, APIUrl } from "../Data/api";
import { getToken } from "../Data/token";

import "../Common/Auth.css";

export default function TMUserSettings(props) {
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [avatarUrls, setAvatarUrls] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarList, setAvatarList] = useState(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  useEffect(() => {
    const token = getToken();
    axios
      .get(`${APIUrl()}users/avatars/list`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setAvatarUrls(res.data.avatarList);
        setAvatarUrl(props.user.avatarUrl);
      })
      .catch((error) => {
        if (!error.response) toast.error(`${error.message}`, toastifyOptions);
        else
          toast.error(
            `${error.response.statusText}: ${error.response.data.error}`,
            toastifyOptions
          );
      });
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    if (avatarUrls) {
      const list = avatarUrls.map((a, i) => {
        const tempUrl = a.toString();
        return (
          <div
            key={i}
            className="avatar-item"
            onClick={() => handleAvatarClick(i)}
            data-selected={tempUrl === avatarUrl}
            style={{
              backgroundImage: `url(${APIBase() + tempUrl})`,
            }}
          ></div>
        );
      });
      setAvatarList(list);
    }
  }, [avatarUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = getToken();

    axios
      .put(
        `${APIUrl()}users`,
        { firstName: firstName, lastName: lastName, avatarUrl: avatarUrl },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        props.closeForm();
        props.loadUser();
      })
      .catch((error) => {
        if (!error.response) toast.error(`${error.message}`, toastifyOptions);
        else
          toast.error(
            `${error.response.statusText}: ${error.response.data.error}`,
            toastifyOptions
          );
      });
  };

  const handleAvatarClick = (i) => {
    setAvatarUrl(avatarUrls[parseInt(i)]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth">
        <div className="auth-header">User Settings</div>
        <div className="auth-detail">
          <div className="auth-group">
            <label>First Name</label>
            <input
              type="text"
              ref={firstNameRef}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="auth-group">
            <label>Last Name</label>
            <input
              type="text"
              ref={lastNameRef}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="avatar-list">{avatarList}</div>
          <div className="auth-buttons">
            <input type="submit" value="Save" />
            <input
              type="button"
              value="Cancel"
              onClick={() => props.closeForm()}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </form>
  );
}
