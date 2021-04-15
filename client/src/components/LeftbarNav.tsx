import React, { useState } from "react";
import "./LeftbarNav.scss";

interface LeftbarNavProps {}

export enum LeftbarNavOptions {
  Home = "Home",
  FAQ = "FAQ",
  Resources = "Resources",
}

const OPTIONS = {
  [LeftbarNavOptions.Home]: { name: "Home" },
  [LeftbarNavOptions.FAQ]: { name: "FAQ" },
  [LeftbarNavOptions.Resources]: { name: "Resources" },
};

const LeftbarNav: React.FC<LeftbarNavProps> = ({}) => {
  const [currentOption, setCurrentOption] = useState<LeftbarNavOptions | null>(
    null
  );
  return (
    <div id="LeftbarNav">
      <div className="tab"></div>
      <div className="options-container">
        {Object.keys(OPTIONS).map((k) => (
          <div
            className="option"
            onClick={() => setCurrentOption(k as LeftbarNavOptions)}
          >
            {OPTIONS[k as LeftbarNavOptions].name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftbarNav;
