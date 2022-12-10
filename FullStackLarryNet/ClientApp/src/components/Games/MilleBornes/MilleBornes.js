import React from "react";

import MBCard from "./MBCard";

import { MBCardType } from "./MBUtils";

import "../common/GameStyles.css";
import "./MilleBornes.css";

function MilleBornes(props) {
  return (
    <div className="millebornes">
      <h2>Mille Bornes</h2>
      <div className="millebornes-cards">
        <MBCard cardType={MBCardType.BLANK} />
        <MBCard cardType={MBCardType.DISTANCE_25} />
        <MBCard cardType={MBCardType.DISTANCE_50} />
        <MBCard cardType={MBCardType.DISTANCE_75} />
        <MBCard cardType={MBCardType.DISTANCE_100} />
        <MBCard cardType={MBCardType.DISTANCE_200} />
        <MBCard cardType={MBCardType.HAZARD_ACCIDENT} />
        <MBCard cardType={MBCardType.HAZARD_FLAT_TIRE} />
        <MBCard cardType={MBCardType.HAZARD_OUT_OF_GAS} />
        <MBCard cardType={MBCardType.HAZARD_SPEED_LIMIT} />
        <MBCard cardType={MBCardType.HAZARD_STOP} />
        <MBCard cardType={MBCardType.REMEDY_END_OF_SPEED_LIMIT} />
        <MBCard cardType={MBCardType.REMEDY_GASOLINE} />
        <MBCard cardType={MBCardType.REMEDY_GO} />
        <MBCard cardType={MBCardType.REMEDY_REPAIRS} />
        <MBCard cardType={MBCardType.REMEDY_SPARE_TIRE} />
        <MBCard cardType={MBCardType.SAFETY_DRIVING_ACE} />
        <MBCard cardType={MBCardType.SAFETY_EXTRA_TANK} />
        <MBCard cardType={MBCardType.SAFETY_PUNTURE_PROOF} />
        <MBCard cardType={MBCardType.SAFETY_RIGHT_OF_WAY} />
      </div>
    </div>
  );
}

export default MilleBornes;
