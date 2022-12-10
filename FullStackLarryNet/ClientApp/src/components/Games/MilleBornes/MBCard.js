import React from "react";

import "./MBCard.css";

export default function MBCard(props) {
  return <div className="mbcard" data-value={props.cardType}></div>;
}
