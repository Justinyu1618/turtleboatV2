import React, { useState } from "react";
import WonderSquare from "./WonderSquare";
import "./Gameboard.scss";
import WonderSquareGroup from "./WonderSquareGroup";
import Pillar from "./Pillar";
import { GameboardTemplateMap } from "../interfaces/module";
import { Redirect } from "react-router-dom";

interface GameboardProps {
  courseMap: GameboardTemplateMap;
  modules: any;
}

// number of wonder squares layers
export const BoardDepth = 3;

const PILLARS = [
  { name: "Pillar" },
  { name: "Pillar" },
  { name: "Pillar" },
  { name: "Pillar" },
];

const PILLAR_STYLES = [
  { left: "50%", transform: "translateX(-50%)" },
  {
    right: "0%",
    top: "50%",
    transform: "translate(0%, -50%)",
  },
  { bottom: "0%", left: "50%", transform: "translate(-50%, 0%)" },
  { top: "50%", transform: "translateY(-50%)" },
];

const GROUP_STYLES = [
  { left: "21%", top: "15%" },
  { right: "33%", top: "15%" },
  { right: "40%", bottom: "46%" },
  { left: "28%", bottom: "46%" },
];

const leftToRight = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [1, 1],
  [2, 1],
];
const rightToLeft = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
];

const Gameboard: React.FC<GameboardProps> = ({ courseMap, modules }) => {
  const [redirect, setRedirect] = useState<string>("");

  const size = 71;

  const pillars: any[] = [];
  PILLARS.forEach((pil, i) => {
    pillars.push(
      <Pillar
        style={{
          position: "absolute",
          ...PILLAR_STYLES[i],
        }}
        text={pil.name}
        size={size * 2}
      />
    );
  });

  const getModForSq = (groupId, coord, modules) => {
    const mod = modules.filter((mod) => mod.id === courseMap[groupId][coord]);
    return mod[0] || null;
  };

  const groups: any[] = [];
  GROUP_STYLES.forEach((groupStyle, i) => {
    groups.push(
      <WonderSquareGroup
        squareSize={size}
        coords={i % 2 == 0 ? leftToRight : rightToLeft}
        style={{
          position: "absolute",
          ...groupStyle,
        }}
        key={i}
        squareMap={courseMap[i]}
        onSqClick={(sqCoord, elem) => {
          const mod = getModForSq(i, sqCoord, modules);
          console.log(mod);
          if (mod) {
            setRedirect(`/module/${mod.id}`);
          }
        }}
        templates={modules}
      />
    );
  });

  return (
    <>
      {redirect !== "" ? (
        <Redirect push to={redirect} />
      ) : (
        <div id="Gameboard">
          <div className="center-circle"></div>
          <div className="bordering-circle"></div>

          {pillars}
          {groups}
        </div>
      )}
    </>
  );
};

export default Gameboard;
