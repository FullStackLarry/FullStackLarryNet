import React from "react";

import TMTask from "./TMTask";

import "./TMTasks.css";

export default function TMTasks(props) {
  let tasksList = null;
  if (props.tasks) {
    tasksList = props.tasks.map((task) => {
      return (
        <TMTask
          key={task._id}
          task={task}
          editTask={props.editTask}
          clickTask={props.clickTask}
          selected={props.currentTaskId === task._id}
          editable={
            task.owner === props.userId || task.assignedTo === props.userId
          }
        />
      );
    });
  }

  return (
    <div className="tmtasks">
      <div className="tmtasks-header">
        <div className="tmtasks-title">
          <h3>Tasks</h3>
        </div>
        <div className="tmtasks-buttons">
          <button onClick={() => props.addTask()}>Add Task</button>
        </div>
      </div>
      <div className="tmtasks-items">{tasksList}</div>
    </div>
  );
}
