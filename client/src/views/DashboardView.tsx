import React, { useEffect, useState } from "react";
import CoursesApi from "../api/CoursesApi";
import ModuleTemplatesApi from "../api/ModuleTemplatesApi";
import BackButton from "../components/BackButton";
import Gameboard from "../components/Gameboard";
import LeftbarNav from "../components/LeftbarNav";
import WonderSquare from "../components/WonderSquare";
import { GameboardTemplateMap } from "../interfaces/module";
import "./DashboardView.scss";

const DashboardView: React.FC = () => {
  const [courseMap, setCourseMap] = useState<GameboardTemplateMap | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    CoursesApi.getCourseTemplates().then((resp) => {
      if (resp.data) {
        setCourseMap(resp.data[0].template_map);
        setCourseId(resp.data[0].id);
      }
    });

    ModuleTemplatesApi.getModuleTemplates().then((resp) => {
      if (resp.data) {
        setModules(resp.data);
      }
    });
  }, []);

  return (
    <div id="DashboardView">
      <div className="LeftbarNav-container">
        <LeftbarNav />
      </div>
      <div className="Gameboard-container">
        <Gameboard courseMap={courseMap || {}} modules={modules} />
        <BackButton link="/projects" text="All projects" />
      </div>
    </div>
  );
};

export default DashboardView;
