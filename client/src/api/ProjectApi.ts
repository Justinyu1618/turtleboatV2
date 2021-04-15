import Request from "./Request";

class ProjectsApi {
  static newProject(data) {
    return new Request("/projects/new_project", {
      method: "POST",
      data: data,
      headers: { "content-type": "application/json" },
    });
  }

  static updateProject(data) {
    return new Request("/projects/update_project", {
      method: "POST",
      data: data,
      headers: { "content-type": "application/json" },
    });
  }

  static getProjects() {
    return new Request("/projects/getProjects");
  }

  static updateMembers(data) {
    return new Request("/projects/updateMembers", {
      method: "POST",
      data: data,
      headers: { "content-type": "application/json" },
    });
  }
}

export default ProjectsApi;
