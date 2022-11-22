import React from "react";
import Modal from "react-modal";
import PuffLoader from "react-spinners/PuffLoader";

import "./common.css";

export default function ModalSpinner(props) {
  return (
    <Modal
      isOpen={props.loading}
      className="spinner-modal"
      overlayClassName="transparent-overlay"
      appElement={document.getElementById("root")}
    >
      <PuffLoader loading={props.loading} color={"white"} size={100} />
    </Modal>
  );
}
