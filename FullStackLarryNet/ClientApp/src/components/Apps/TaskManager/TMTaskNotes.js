import React from "react";

import TMTaskNote from "./TMTaskNote";

import "./TMTaskNotes.css";

export default function TMTaskNotes(props) {
  let taskNotesList = null;
  if (props.taskNotes) {
    taskNotesList = props.taskNotes.map((taskNote) => {
      return (
        <TMTaskNote
          key={taskNote._id}
          taskNote={taskNote}
          editTaskNote={props.editTaskNote}
          editable={taskNote.owner._id === props.userId}
        />
      );
    });
  }

  return (
    <div className="tmtasknotes">
      <div className="tmtasknotes-header">
        <div className="tmtasknotes-title">
          <h3>Notes</h3>
        </div>
        <div className="tmtasknotes-buttons">
          <button onClick={() => props.addTaskNote()}>Add Note</button>
        </div>
      </div>
      <div className="tmtasknotes-items">{taskNotesList}</div>
    </div>
  );
}
