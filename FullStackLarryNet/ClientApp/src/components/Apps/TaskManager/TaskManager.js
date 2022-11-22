import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

import Login from "../Auth/Login";
import Register from "../Auth/Register";
import SendEmail from "../Auth/SendEmail";
import ValidateEmail from "../Auth/ValidateEmail";
import UserSettings from "../Auth/UserSettings";
import { getToken, deleteToken } from "../Data/token";
import TMMenuBar from "./TMMenuBar";
import TMAssignees from "./TMAssignees";
import TMTasks from "./TMTasks";
import TMTaskEdit from "./TMTaskEdit";
import TMTaskNotes from "./TMTaskNotes";
import TMTaskNoteEdit from "./TMTaskNoteEdit";
import { APIUrl } from "../Data/api";
import httpStatus from "../Data/httpStatus";

import "../Common/common.css";
import "./TaskManager.css";
import { toast } from "react-toastify";
import { convertDate } from "../Common/common";

function TaskManager() {
  const [user, setUser] = useState(null);
  const [assignees, setAssignees] = useState(null);
  const [currentAssigneeId, setCurrentAssigneeId] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [taskNotes, setTaskNotes] = useState(null);
  const [editTaskNote, setEditTaskNote] = useState(null);

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [passEmail, setPassEmail] = useState("");
  const [validateOpen, setValidateOpen] = useState(false);
  const [userSettingsOpen, setUserSettingsOpen] = useState(false);
  const [taskEditOpen, setTaskEditOpen] = useState(false);
  const [taskNoteEditOpen, setTaskNoteEditOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const openLogin = (loginEmail) => {
    if (loginEmail) setPassEmail(loginEmail);
    else setPassEmail("");
    setUser(null);
    setRegisterOpen(false);
    setEmailOpen(false);
    setValidateOpen(false);
    setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  const logout = () => {
    deleteToken();
    openLogin();
  };

  const openRegister = () => {
    setLoginOpen(false);
    setEmailOpen(false);
    setValidateOpen(false);
    setRegisterOpen(true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  const openEmail = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    setValidateOpen(false);
    setEmailOpen(true);
  };

  const closeEmail = () => {
    setEmailOpen(false);
  };

  const openValidate = (validationEmail) => {
    if (validationEmail) setPassEmail(validationEmail);
    else setPassEmail("");
    setLoginOpen(false);
    setEmailOpen(false);
    setRegisterOpen(false);
    setValidateOpen(true);
  };

  const closeValidate = () => {
    setValidateOpen(false);
  };

  const openUserSettings = () => {
    setUserSettingsOpen(true);
  };

  const closeUserSettings = () => {
    setUserSettingsOpen(false);
  };

  const closeTaskEdit = () => {
    setTaskEditOpen(false);
  };

  const closeTaskNoteEdit = () => {
    setTaskNoteEditOpen(false);
  };

  // Load user at start
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    const token = getToken();
    if (token) {
      axios
        .get(`${APIUrl()}users`, { headers: { Authorization: token } })
        .then((res) => {
          if (res.status === httpStatus.OK) {
            setUser(res.data);
            setLoginOpen(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === httpStatus.FORBIDDEN) {
              setLoginOpen(true);
            } else {
              setErrorMessage(
                `${error.response.statusText}: ${error.response.data.error}`
              );
            }
          } else {
            setErrorMessage(error);
          }
        });
    } else {
      setLoginOpen(true);
    }
  };

  // Load assignees when user changes
  const stringUser = JSON.stringify(user);
  useEffect(() => {
    if (!user) {
      setAssignees(null);
      setCurrentAssigneeId(null);
      return;
    }

    const token = getToken();
    if (token) {
      axios
        .get(`${APIUrl()}TM/assignees`, { headers: { Authorization: token } })
        .then((res) => {
          if (
            res.status === httpStatus.OK ||
            res.status === httpStatus.NO_CONTENT
          ) {
            if (res.status === httpStatus.OK) setAssignees([user, ...res.data]);
            else setAssignees([user]);
            setCurrentAssigneeId(user._id);
            setLoginOpen(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === httpStatus.FORBIDDEN) {
              setLoginOpen(true);
            } else {
              setErrorMessage(
                `${error.response.statusText}: ${error.response.data.error}`
              );
            }
          } else {
            setErrorMessage(error);
          }
        });
    } else {
      setLoginOpen(true);
    }
  }, [user, stringUser]);

  const handleAddAssignee = (assigneeEmail) => {
    const token = getToken();
    if (token) {
      axios
        .post(
          `${APIUrl()}TM/assignees`,
          { email: encodeURI(assigneeEmail) },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          if (res.status === httpStatus.CREATED) {
            loadUser();
          }
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(
              `${error.response.statusText}: ${error.response.data.error}`
            );
          } else {
            setErrorMessage(error);
          }
        });
    } else {
      setLoginOpen(true);
    }
  };

  const handleAssigneeClick = (assigneeId) => {
    setCurrentTaskId(null);
    setCurrentAssigneeId(assigneeId);
  };

  //  Load tasks when assignee changes
  useEffect(() => {
    loadTasks();
  }, [currentAssigneeId]);

  const loadTasks = () => {
    if (!currentAssigneeId) {
      setTasks(null);
      setCurrentTaskId(null);
      return;
    }

    const token = getToken();
    if (token) {
      axios
        .get(`${APIUrl()}TM/tasks/${currentAssigneeId}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          if (res.status === httpStatus.OK) {
            setTasks(res.data);
            if (res.data.length > 0) setCurrentTaskId(res.data[0]._id);
          }
        })
        .catch((error) => {
          if (error.response) {
            toast.error(
              `${error.response.statusText}: ${error.response.data.error}`
            );
          } else {
            toast.error(`${error}`);
          }
        });
    }
  };

  const handleEditTask = (taskId) => {
    let task;
    if (taskId === null) {
      task = {
        _id: null,
        owner: user._id,
        assignedTo: currentAssigneeId,
        name: "",
        desciption: "",
        status: "Not Started",
        assignedDate: convertDate(Date.now()),
        startedDate: "",
        completedDate: "",
      };
    } else {
      task = tasks.find((t) => t._id === taskId);
    }
    setEditTask(task);
    setTaskEditOpen(true);
  };

  const handleAddTask = () => {
    handleEditTask(null);
  };

  const handleTaskClick = (taskId) => {
    setCurrentTaskId(taskId);
  };

  // Load task notes when task changes
  useEffect(() => {
    loadTaskNotes();
  }, [currentTaskId, stringUser]);

  const loadTaskNotes = () => {
    if (!currentTaskId) {
      setTaskNotes(null);
      return;
    }

    const token = getToken();
    if (token) {
      axios
        .get(`${APIUrl()}TM/tasknotes/${currentTaskId}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          if (res.status === httpStatus.OK) {
            setTaskNotes(res.data);
          }
        })
        .catch((error) => {
          if (error.response) {
            toast.error(
              `${error.response.statusText}: ${error.response.data.error}`
            );
          } else {
            toast.error(`${error}`);
          }
        });
    }
  };

  const handleEditTaskNote = (taskNoteId) => {
    let taskNote;
    if (taskNoteId === null) {
      taskNote = {
        _id: null,
        task: currentTaskId,
        ownerId: user._id,
        note: "",
      };
    } else {
      taskNote = taskNotes.find((t) => t._id === taskNoteId);
    }
    setEditTaskNote(taskNote);
    setTaskNoteEditOpen(true);
  };

  const handleAddTaskNote = () => {
    handleEditTaskNote(null);
  };

  return (
    <div className="task-manager">
      <div className="task-manager-menu-bar">
        <TMMenuBar
          user={user}
          loggedIn={user !== null}
          openUserSettings={openUserSettings}
          openLogin={openLogin}
          logout={logout}
        />
      </div>
      {user && (
        <div className="task-manager-group">
          <TMAssignees
            assignees={assignees}
            currentAssigneeId={currentAssigneeId}
            addAssignee={handleAddAssignee}
            clickAssignee={handleAssigneeClick}
          />
          <TMTasks
            userId={user._id}
            tasks={tasks}
            currentTaskId={currentTaskId}
            addTask={handleAddTask}
            editTask={handleEditTask}
            clickTask={handleTaskClick}
          />
          <TMTaskNotes
            userId={user._id}
            taskNotes={taskNotes}
            addTaskNote={handleAddTaskNote}
            editTaskNote={handleEditTaskNote}
          />
        </div>
      )}
      <Modal
        isOpen={loginOpen}
        contentLabel="Log In"
        className="auth-modal"
        overlayClassName="auth-overlay"
        appElement={document.getElementById("root")}
      >
        <Login
          email={passEmail}
          loadUser={loadUser}
          openRegister={openRegister}
          openEmail={openEmail}
          openValidate={openValidate}
          closeForm={closeLogin}
        />
      </Modal>
      <Modal
        isOpen={registerOpen}
        contentLabel="Register"
        className="auth-modal"
        overlayClassName="auth-overlay"
        appElement={document.getElementById("root")}
      >
        <Register openValidate={openValidate} closeForm={closeRegister} />
      </Modal>
      <Modal
        isOpen={emailOpen}
        contentLabel="Send Validation Email"
        className="auth-modal"
        overlayClassName="auth-overlay"
        appElement={document.getElementById("root")}
      >
        <SendEmail openValidate={openValidate} closeForm={closeEmail} />
      </Modal>
      <Modal
        isOpen={validateOpen}
        contentLabel="Validate Email"
        className="auth-modal"
        overlayClassName="auth-overlay"
        appElement={document.getElementById("root")}
      >
        <ValidateEmail
          email={passEmail}
          openLogin={openLogin}
          closeForm={closeValidate}
        />
      </Modal>
      <Modal
        isOpen={userSettingsOpen}
        contentLabel="User Settings"
        className="auth-modal"
        overlayClassName="auth-overlay"
        appElement={document.getElementById("root")}
      >
        <UserSettings
          user={user}
          loadUser={loadUser}
          closeForm={closeUserSettings}
        />
      </Modal>
      <Modal
        isOpen={taskEditOpen}
        contentLabel="Edit Task"
        className="auth-modal"
        overlayClassName="auth-overlay"
        appElement={document.getElementById("root")}
      >
        <TMTaskEdit
          user={user}
          task={editTask}
          closeForm={closeTaskEdit}
          loadTasks={loadTasks}
        />
      </Modal>
      <Modal
        isOpen={taskNoteEditOpen}
        contentLabel="Edit Task Note"
        className="auth-modal"
        overlayClassName="auth-overlay"
        appElement={document.getElementById("root")}
      >
        <TMTaskNoteEdit
          taskNote={editTaskNote}
          closeForm={closeTaskNoteEdit}
          loadTaskNotes={loadTaskNotes}
        />
      </Modal>
      <Modal
        isOpen={errorMessage !== ""}
        contentLabel="Error"
        className="error-modal"
        overlayClassName="error-overlay"
        appElement={document.getElementById("root")}
      >
        <p>{errorMessage}</p>
        <div>
          <button onClick={() => setErrorMessage("")}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default TaskManager;
