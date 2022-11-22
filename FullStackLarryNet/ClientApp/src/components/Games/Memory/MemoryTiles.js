import React from "react";

import "./MemoryTiles.css";

function MemoryTiles(props) {
  const gridTiles = props.tiles.map((tile, index) => {
    return (
      <div
        key={index}
        className="memory-tile"
        data-value={tile.toString()}
        data-disabled={props.changing.toString()}
        onClick={() => props.clickHandler(index)}
      ></div>
    );
  });

  return (
    <div>
      <div className="memory-tiles">{gridTiles}</div>
    </div>
  );
}

export default MemoryTiles;
