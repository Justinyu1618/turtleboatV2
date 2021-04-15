import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import avatarExample from "../assets/images/avatar_example.png";
import "./ProjectView.scss";
import { NavLink } from "react-router-dom";

interface ProjectViewProps {}

const PROJECTS = [{ name: "Test Project" }];

const ProjectView: React.FC<ProjectViewProps> = ({}) => {
  const projects: any[] = [];
  PROJECTS.forEach((p) => {
    projects.push(
      <div className="project">
        <img src={avatarExample} />
        <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
          <h2>{p.name}</h2>
        </NavLink>
        <div className="project-meta">
          <p>
            <b> Created on</b>: March 29, 2020
          </p>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faPen} />
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div id="ProjectView">
      <div className="my-projects">My Projects</div>
      <div className="create-new-wrapper">
        <FontAwesomeIcon icon={faPlus} />
        <div className="create-new">Create New Project</div>
      </div>
      <div className="project-container">{projects}</div>
    </div>
  );
};

export default ProjectView;
