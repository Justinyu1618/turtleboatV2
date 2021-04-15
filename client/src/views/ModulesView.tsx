import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ModuleTemplatesApi from "../api/ModuleTemplatesApi";
import "./ModulesView.scss";

interface ModulesViewProps {
  modTempls: any;
  setCurrTempl: (templ) => void;
  setNewTempl: (templ) => void;
  refresh: () => void;
}

const ModulesView: React.FC<ModulesViewProps> = ({
  modTempls,
  setCurrTempl,
  setNewTempl,
  refresh,
}) => {
  return (
    <div id="ModulesView">
      <div className="create-new-wrapper">
        <FontAwesomeIcon icon={faPlus} />
        <div
          className="create-new"
          onClick={() => {
            setNewTempl(true);
          }}
        >
          Create New Template
        </div>
      </div>
      <div className="project-container">
        {modTempls.map((templ) => {
          const { id, body, name } = templ;
          return (
            <div className="project">
              {/* <img src={avatarExample} /> */}
              {/* <NavLink to="/dashboard" style={{ textDecoration: "none" }}> */}
              <h2>{name || "Untitled Module"}</h2>
              {/* </NavLink> */}
              <div className="project-meta">
                <p>
                  <b> Created on</b>: March 29, 2020
                </p>
                <div
                  className="icon-wrapper"
                  onClick={() => {
                    setCurrTempl(templ);
                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </div>
                <div
                  className="icon-wrapper"
                  onClick={() => {
                    ModuleTemplatesApi.removeModuleTemplate(id).then(() => {
                      refresh();
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModulesView;
