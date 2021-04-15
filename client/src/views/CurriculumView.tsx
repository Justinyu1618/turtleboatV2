import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import CoursesApi from "../api/CoursesApi";
import ModuleTemplatesApi from "../api/ModuleTemplatesApi";
import { GameboardTemplateMap } from "../interfaces/module";
import CoursesView from "./CoursesView";
import ModuleBuilderView from "./ModuleBuilderView";
import ModulesView from "./ModulesView";

enum CurriculumTabs {
  templates,
  courses,
}
// import "./CurriculumView.scss";

interface CurriculumViewProps {}

const CurriculumView: React.FC<CurriculumViewProps> = ({}) => {
  const [currTempl, setCurrTempl] = useState<any | null>(null);
  const [newTempl, setNewTempl] = useState(false);
  const [modTempls, setModTempls] = useState([]);
  const [activeTab, setActiveTab] = useState<CurriculumTabs>(
    CurriculumTabs.templates
  );
  const [courseMap, setCourseMap] = useState<GameboardTemplateMap | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);

  const refreshData = () => {
    ModuleTemplatesApi.getModuleTemplates().then((resp) => {
      if (resp.data) {
        setModTempls(resp.data);
      }
    });

    CoursesApi.getCourseTemplates().then((resp) => {
      if (resp.data) {
        setCourseMap(resp.data[0].template_map);
        setCourseId(resp.data[0].id);
      }
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const updateCourseMap = (courseMap) => {
    setCourseMap(courseMap);
    console.log(courseMap);
    if (courseId !== null && courseMap) {
      CoursesApi.updateCourseMap(courseId, courseMap).catch((err) => {
        console.log("couldnt update coursemap! ", err);
      });
    }
  };

  return (
    <div id="CurriculumView">
      <Menu
        pointing
        secondary
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Menu.Item
          name="Module Templates"
          active={activeTab === CurriculumTabs.templates}
          onClick={() => {
            setActiveTab(CurriculumTabs.templates);
          }}
        />
        <Menu.Item
          name="Courses"
          active={activeTab === CurriculumTabs.courses}
          onClick={() => {
            setActiveTab(CurriculumTabs.courses);
          }}
        />
      </Menu>
      {activeTab === CurriculumTabs.templates ? (
        currTempl || newTempl ? (
          <ModuleBuilderView
            refresh={refreshData}
            setCurrTempl={setCurrTempl}
            setNewTempl={setNewTempl}
            templ={currTempl}
          />
        ) : (
          <ModulesView
            refresh={refreshData}
            modTempls={modTempls}
            setCurrTempl={setCurrTempl}
            setNewTempl={setNewTempl}
          />
        )
      ) : (
        <CoursesView
          templates={modTempls}
          courseMap={courseMap || {}}
          updateCourseMap={updateCourseMap}
        />
      )}
    </div>
  );
};

export default CurriculumView;
