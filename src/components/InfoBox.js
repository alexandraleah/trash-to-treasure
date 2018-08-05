import React from 'react';
import Path from 'path';
export default function InfoBox(props) {
  return (
    <div className="infoBox">
      <h1>The treasure</h1>
      <div>
        <img src={props.currentTreasure.imageURL} />
      </div>
      <p>
        Location: {props.currentTreasure.lat}, {props.currentTreasure.lng}
      </p>

      <p> Date seen: {props.currentTreasure.date}</p>
    </div>
  );
}
