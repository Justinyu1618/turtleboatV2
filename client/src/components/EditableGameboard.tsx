import React, { useEffect, useRef, useState } from "react";
import WonderSquare from "./WonderSquare";
import "./EditableGameboard.scss";
import WonderSquareGroup from "./WonderSquareGroup";
import Pillar from "./Pillar";
import { Dropdown, Icon } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameboardTemplateMap } from "../interfaces/module";

interface EditableGameboardProps {
  templates: any;
  handleUpdate: (group, coord, templId) => void;
  courseMap: GameboardTemplateMap;
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

const EditableGameboard: React.FC<EditableGameboardProps> = ({
  templates,
  handleUpdate,
  courseMap,
}) => {
  const [currGroup, setCurrGroup] = useState<number | undefined>(undefined);
  const [currSqCoord, setCurrSqCoord] = useState<string | undefined>(undefined);
  const [currSqRef, setCurrSqRef] = useState<HTMLDivElement | undefined>(
    undefined
  );
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const gameboardRef = useRef<HTMLDivElement | null>(null);

  const templDropdownOptions = templates.map(({ name, id }) => ({
    key: id,
    value: id,
    text: name,
  }));
  templDropdownOptions.unshift({ key: null, value: null, text: "No module" });

  const size = 71;
  useEffect(() => {
    if (currSqRef && gameboardRef && gameboardRef.current) {
      const sq = currSqRef.getBoundingClientRect();
      const parent = gameboardRef.current.getBoundingClientRect();
      setDropdownTop(sq.top - parent.top + size / 2);
      setDropdownLeft(sq.left - parent.left + size / 2);
    }
  }, [currSqRef, gameboardRef]);

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

  const handleSquareClick = (groupId: number, sqCoord: string, elem) => {
    setCurrGroup(groupId);
    setCurrSqCoord(sqCoord);
    setCurrSqRef(elem.current);
  };

  const handleDropdownSelect = (e, data) => {
    if (currGroup !== undefined && currSqCoord && data) {
      handleUpdate(currGroup, currSqCoord, data.value);
    }
    setCurrGroup(undefined);
    setCurrSqCoord(undefined);
    setCurrSqRef(undefined);
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
        groupLabel={"Group " + i}
        squareMap={courseMap[i]}
        onSqClick={(sqCoord: string, elem: HTMLDivElement) => {
          handleSquareClick(i, sqCoord, elem);
        }}
        activeSqCoord={i === currGroup && currSqCoord ? currSqCoord : ""}
        templates={templates}
      />
    );
  });

  return (
    <div id="EditableGameboard" ref={gameboardRef}>
      {currGroup !== undefined && currSqCoord != undefined && (
        <div
          className="dropdown-wrapper"
          style={{ top: dropdownTop, left: dropdownLeft }}
        >
          {/* <Icon name="close" /> */}
          <Dropdown
            placeholder="Select Country"
            fluid
            search
            selection
            open
            onBlur={() => {
              setCurrGroup(undefined);
              setCurrSqCoord(undefined);
              setCurrSqRef(undefined);
            }}
            onChange={handleDropdownSelect}
            options={templDropdownOptions}
          />
        </div>
      )}

      <div className="center-circle"></div>
      <div className="bordering-circle"></div>

      {pillars}
      {groups}
    </div>
  );
};

export default EditableGameboard;
