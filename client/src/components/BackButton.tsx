import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface BackButtonProps {
  text: string;
  link: string;
  onClick?: any;
}

const style: React.CSSProperties = {
  position: "absolute",
  top: "20px",
  left: "30px",
  fontSize: "16px",
};

const linkStyle: React.CSSProperties = {
  cursor: "pointer",
  textDecoration: "none",
  color: "black",
};

const BackButton: React.FC<BackButtonProps> = ({ text, link, onClick }) => {
  const body = [
    <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faAngleLeft} />,
    text,
  ];

  return (
    <div style={style}>
      {onClick ? (
        <a
          onClick={() => {
            onClick();
          }}
          style={linkStyle}
        >
          {body}
        </a>
      ) : (
        <Link style={linkStyle} to={link}>
          {body}
        </Link>
      )}
    </div>
  );
};

export default BackButton;
