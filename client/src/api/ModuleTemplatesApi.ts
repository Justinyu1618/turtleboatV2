import Request from "./Request";

class ModuleTemplatesApi {
  static newModuleTemplate(data) {
    return new Request("/module_templates/new_template", {
      method: "POST",
      data: data,
      headers: { "content-type": "application/json" },
    });
  }

  static updateModuleTemplate(data) {
    return new Request("/module_templates/update_template", {
      method: "POST",
      data: data,
      headers: { "content-type": "application/json" },
    });
  }

  static getModuleTemplates() {
    return new Request("/module_templates/get_templates");
  }

  static getModuleTemplate(id) {
    return new Request("/module_templates/get_template", {
      method: "POST",
      data: { id },
      headers: { "content-type": "application/json" },
    });
  }

  static removeModuleTemplate(id) {
    return new Request("/module_templates/remove_template", {
      method: "POST",
      data: { id },
      headers: { "content-type": "application/json" },
    });
  }
}

export default ModuleTemplatesApi;
