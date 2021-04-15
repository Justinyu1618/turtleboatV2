import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TextArea, Button, Form } from "semantic-ui-react";
import ModuleTemplatesApi from "../api/ModuleTemplatesApi";
import BackButton from "../components/BackButton";
import { Module, ModuleItems } from "../interfaces/module";
import "./StudentModuleView.scss";
interface StudentModuleViewProps {
  match: any;
}

const StudentModuleView: React.FC<StudentModuleViewProps> = ({ match }) => {
  const id = match?.params?.id;
  const [module, setModule] = useState<Module | null>(null);
  useEffect(() => {
    if (id !== undefined) {
      ModuleTemplatesApi.getModuleTemplate(id).then((resp) => {
        setModule(resp.data);
        console.log(resp);
      });
    }
  }, []);

  const trimSpaces = (string: string) => {
    return string
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<");
  };

  const transformModule = (mod) => {
    const components = mod.body.map((item, i) => {
      switch (item.type) {
        case ModuleItems.Header:
          return (
            <div className="header">
              <h2 style={{ padding: "5px" }}>{item.text}</h2>
            </div>
          );
        case ModuleItems.Description:
          return (
            <div className="description">
              <p>{trimSpaces(trimSpaces(item.text))}</p>
            </div>
          );
        case ModuleItems.TextInput:
          return (
            <div className="textinput">
              <h5>{trimSpaces(item.title)}</h5>
              <p>{trimSpaces(item.description)}</p>
              <TextArea placeholder="Put your response here..." />
            </div>
          );
        case ModuleItems.FileUpload:
          return (
            <div className="fileupload">
              <h5>{trimSpaces(item.title)}</h5>
              <p>{trimSpaces(item.description)}</p>

              <Button
                className="upload-button"
                as="label"
                htmlFor={"fileupload-" + i}
                type="button"
              >
                Upload File
              </Button>
              <input type="file" id={"fileupload-" + i} hidden />
            </div>
          );
      }
    });
    return components;
  };

  return (
    <div id="StudentModuleView">
      <div className="module-container">
        <BackButton link="/dashboard" text="Dashboard" />
        <h1 className="module-title">{module?.name || ""}</h1>
        <div className="body-container">
          <Form>{module ? transformModule(module) : null}</Form>
        </div>
      </div>
    </div>
  );
};

export default StudentModuleView;
