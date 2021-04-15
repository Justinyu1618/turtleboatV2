import React, { useEffect, useRef, useState } from "react";
import { serializeCoord } from "../utils";
import WonderSquare from "./WonderSquare";

interface WonderSquareGroupProps {
  coords: number[][];
  squareSize: number;
  style?: React.CSSProperties;
  squareMap?: any;
  groupLabel?: string;
  activeSqCoord?: string;
  onSqClick?: (coord, elem) => void;
  templates?: any;
}

const WonderSquareGroup: React.FC<WonderSquareGroupProps> = ({
  coords,
  squareSize,
  style,
  groupLabel,
  squareMap,
  activeSqCoord = "",
  onSqClick,
  templates,
}) => {
  const [squareRefs, setSquareRefs] = useState({});

  const step = 38;
  const group: any = [];

  const coordToTemplate = {};
  if (squareMap && templates) {
    coords.forEach((c) => {
      const templ = templates.filter(
        (templ) => templ.id === squareMap[serializeCoord(c)]
      );
      if (templ) {
        coordToTemplate[serializeCoord(c)] = templ[0];
      }
    });
  }

  console.log(coordToTemplate);
  for (const coord of coords) {
    group.push(
      <div
        className="ws-position-wrapper"
        style={{
          top: `${coord[0] * step + coord[1] * step}px`,
          left: `${coord[0] * step - coord[1] * step}px`,
        }}
      >
        <WonderSquare
          size={squareSize}
          onClick={
            onSqClick &&
            ((elem: HTMLDivElement) => {
              onSqClick(serializeCoord(coord), elem);
            })
          }
          active={serializeCoord(coord) === activeSqCoord}
          templ={coordToTemplate[serializeCoord(coord)]}
        />
      </div>
    );
  }
  return (
    <div style={style} className="wondersquare-group">
      {group}
    </div>
  );
};

export default WonderSquareGroup;
