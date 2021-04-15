import React, { useState } from "react";
import WonderSquare from "./WonderSquare";
import PillarSvg from "../assets/images/pillar.svg";
import NoteSvg from "../assets/images/note.svg";
import "./Pillar.scss";

interface PillarProps {
  size: number;
  text: string;
  style?: React.CSSProperties;
}

const Pillar: React.FC<PillarProps> = ({ size, text, style }) => {
  const innerContent = (
    <div className="content">
      <img src={PillarSvg} />
      <h2>{text}</h2>
      <img src={NoteSvg} />
    </div>
  );
  return (
    <div className="pillar" style={style}>
      <WonderSquare
        style={{ backgroundColor: "#50ABFF" }}
        size={size}
        content={innerContent}
      />
    </div>
  );
};

export default Pillar;
