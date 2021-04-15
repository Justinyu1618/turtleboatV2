import { template } from "lodash";
import React, { useRef, useState } from "react";
import { Popup } from "semantic-ui-react";
import "./WonderSquare.scss";

export const WONDERSQ_SIZE_RATIO = 1.42;

interface WonderSquareProps {
  size: number;
  active?: boolean;
  content?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (ref) => void;
  templ?: any;
  activeOnHover?: boolean;
}

const WonderSquare: React.FC<WonderSquareProps> = ({
  size,
  active = false,
  content,
  style,
  onClick,
  templ,
  activeOnHover = false,
}) => {
  const [hover, setHover] = useState(false);
  const sqRef = useRef(null);
  const newSize = size / WONDERSQ_SIZE_RATIO;
  const margin = 9 + size * (1 - 1 / WONDERSQ_SIZE_RATIO);

  const wonderSquare = (
    <div
      className="wonder-square"
      style={{
        width: `${newSize}px`,
        height: `${newSize}px`,
        pointerEvents: "all",
        borderColor: active ? "rgb(80, 171, 255)" : "#fff",
        backgroundColor: templ ? "#fff" : "lightgrey",
        ...style,
      }}
      onClick={
        onClick &&
        (() => {
          onClick(sqRef);
        })
      }
    ></div>
  );
  return (
    <div
      className="wonder-square-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: "none",
      }}
      ref={sqRef}
    >
      {templ ? (
        <Popup content={templ.name} trigger={wonderSquare} />
      ) : (
        wonderSquare
      )}
      <div
        className="ws-content"
        style={{ pointerEvents: "none" }}
        onClick={
          onClick &&
          (() => {
            onClick(sqRef);
          })
        }
      >
        {content ? content : <a>?</a>}
      </div>
    </div>
  );
};

export default WonderSquare;
