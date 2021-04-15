import React, { useState } from "react";
import EditableGameboard from "../components/EditableGameboard";
import { GameboardTemplateMap } from "../interfaces/module";
import { serializeCoord } from "../utils";
interface CoursesViewProps {
  templates: any;
  courseMap: GameboardTemplateMap;
  updateCourseMap: (courseMap) => void;
}

const CoursesView: React.FC<CoursesViewProps> = ({
  templates,
  courseMap,
  updateCourseMap,
}) => {
  const handleCourseMapUpdate = (
    group: number,
    coord: string,
    templId: number
  ) => {
    const newGroup = courseMap?.[group] || {};
    newGroup[coord] = templId;
    updateCourseMap({ ...courseMap, [group]: newGroup });
  };

  return (
    <div id="CoursesView">
      <EditableGameboard
        handleUpdate={handleCourseMapUpdate}
        templates={templates}
        courseMap={courseMap}
      />
    </div>
  );
};

export default CoursesView;
