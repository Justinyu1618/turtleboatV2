import { GameboardTemplateMap } from "../interfaces/module";
import Request from "./Request";

class CoursesApi {
  static newCourseTemplate(data) {
    return new Request("/courses/new_course", {
      method: "POST",
      data: data,
      headers: { "content-type": "application/json" },
    });
  }

  static getCourseTemplates() {
    return new Request("/courses/get_courses");
  }

  static updateCourseMap(id: number, map: GameboardTemplateMap) {
    return new Request("/courses/update_template_map", {
      method: "POST",
      data: { id, map },
      headers: { "content-type": "application/json" },
    });
  }
}

export default CoursesApi;
