import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Form,
  Button,
  Dropdown,
  TextArea,
  Label,
  Icon,
} from "semantic-ui-react";
import ContentEditable from "react-contenteditable";
import {
  getBlankModuleItem,
  Module,
  ModuleBody,
  ModuleItems,
} from "../interfaces/module";
import "./ModuleBuilderView.scss";
import lodash from "lodash";
import ModuleTemplatesApi from "../api/ModuleTemplatesApi";
import BackButton from "../components/BackButton";

interface ModuleBuilderViewProps {
  templ: any;
  setCurrTempl: (templ) => void;
  setNewTempl: (templ) => void;
  refresh: () => void;
}

const addOptions = [
  {
    key: "header",
    text: "Header",
    value: ModuleItems.Header,
    icon: "header",
  },
  {
    key: "description",
    text: "Description",
    value: ModuleItems.Description,
    icon: "paragraph",
  },
  {
    key: "textinput",
    text: "TextInput",
    value: ModuleItems.TextInput,
    icon: "text cursor",
  },
  {
    key: "fileupload",
    text: "File Upload",
    value: ModuleItems.FileUpload,
    icon: "file",
  },
];

const ModuleBuilderView: React.FC<ModuleBuilderViewProps> = ({
  templ,
  setCurrTempl,
  setNewTempl,
  refresh,
}) => {
  const [moduleBody, setModuleBody] = useState<ModuleBody>(templ?.body || []);
  const [title, setTitle] = useState<string>(templ?.name || "Untitled Module");
  const [saved, setSaved] = useState(true);

  const updateItem = (ind: number, updates: any) => {
    const item = moduleBody[ind];
    const itemCopy = lodash.cloneDeep(item);
    Object.entries(updates).forEach(([k, v]) => {
      //@ts-ignore
      if (itemCopy[k] !== undefined) {
        //@ts-ignore
        itemCopy[k] = v;
      }
    });
    setModuleBody([
      ...moduleBody.slice(0, ind),
      itemCopy,
      ...moduleBody.slice(ind + 1),
    ]);
  };

  const removeItem = (ind: number) => {
    setModuleBody([...moduleBody.slice(0, ind), ...moduleBody.slice(ind + 1)]);
  };

  const trimSpaces = (string: string) => {
    return string
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<");
  };

  const handleContentEdit = (e: any) => {
    if (e.currentTarget && e.target) {
      if (saved) {
        setSaved(false);
      }
      const index = parseInt(e.currentTarget.dataset.index);
      const key = e.currentTarget.dataset.key;
      const value = e.currentTarget.innerText;
      updateItem(index, { [key]: value });
    }
  };

  const handleFileUpload = (e: any) => {
    if (e.currentTarget && e.target) {
      if (saved) {
        setSaved(false);
      }
      const index = parseInt(e.currentTarget.dataset.index);
      const key = e.currentTarget.dataset.key;
      const value = e.currentTarget.innerText;
      updateItem(index, { [key]: value });
    }
  };

  const handleTitleEdit = (e: any) => {
    if (e.target) {
      setTitle(e.target.value);
      if (saved) {
        setSaved(false);
      }
    }
  };

  const pasteAsPlainText = (event: any) => {
    event.preventDefault();

    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  const disableNewlines = (event: any) => {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  const onDelete = (ind) => {
    setModuleBody([...moduleBody.slice(0, ind), ...moduleBody.slice(ind + 1)]);
  };

  const itemComponents = moduleBody.map((item, i) => {
    switch (item.type) {
      case ModuleItems.Header:
        return (
          <div key={i} className="item-wrapper">
            <Icon
              className="close-icon"
              onClick={() => onDelete(i)}
              name="close"
            />
            <div className="header">
              <h2>
                <ContentEditable
                  onPaste={pasteAsPlainText}
                  onKeyPress={disableNewlines}
                  onChange={handleContentEdit}
                  html={item.text}
                  data-index={i}
                  data-key={"text"}
                  style={{ padding: "5px" }}
                />
              </h2>
            </div>
          </div>
        );
      case ModuleItems.Description:
        return (
          <div key={i} className="item-wrapper">
            <Icon
              className="close-icon"
              onClick={() => onDelete(i)}
              name="close"
            />
            <div className="description">
              <p>
                <ContentEditable
                  onPaste={pasteAsPlainText}
                  onChange={handleContentEdit}
                  html={item.text}
                  data-index={i}
                  data-key={"text"}
                />
              </p>
            </div>
          </div>
        );
      case ModuleItems.TextInput:
        return (
          <div key={i} className="item-wrapper">
            <Icon
              className="close-icon"
              onClick={() => onDelete(i)}
              name="close"
            />
            <div className="textinput">
              <h5>
                <ContentEditable
                  onPaste={pasteAsPlainText}
                  onKeyPress={disableNewlines}
                  onChange={handleContentEdit}
                  html={item.title}
                  data-index={i}
                  data-key={"title"}
                />
              </h5>
              <p>
                <ContentEditable
                  onPaste={pasteAsPlainText}
                  onChange={handleContentEdit}
                  html={item.description}
                  data-index={i}
                  data-key={"description"}
                />
              </p>
              <TextArea
                disabled
                placeholder="Student's response goes here..."
              />
            </div>
          </div>
        );
      case ModuleItems.FileUpload:
        return (
          <div key={i} className="item-wrapper">
            <Icon
              className="close-icon"
              onClick={() => onDelete(i)}
              name="close"
            />
            <div className="fileupload">
              <h5>
                <ContentEditable
                  onPaste={pasteAsPlainText}
                  onKeyPress={disableNewlines}
                  onChange={handleContentEdit}
                  html={item.title}
                  data-index={i}
                  data-key={"title"}
                />
              </h5>
              <p>
                <ContentEditable
                  onPaste={pasteAsPlainText}
                  onChange={handleContentEdit}
                  html={item.description}
                  data-index={i}
                  data-key={"description"}
                />
              </p>
              {/* <Form> */}
              {/* <Form.Field> */}
              <Button
                className="upload-button"
                as="label"
                htmlFor={"fileupload-" + i}
                type="button"
              >
                Upload File
              </Button>
              <input type="file" id={"fileupload-" + i} hidden />
              {/* </Form.Field> */}
              {/* <Button type="submit">Upload</Button>
              </Form> */}
            </div>
          </div>
        );
    }
  });

  const handleDropdown = (event: any, data: any) => {
    if (data.value) {
      const newMod = getBlankModuleItem(data.value);
      if (newMod) {
        setModuleBody([...moduleBody, newMod]);
      }
    }
  };

  const handleSubmit = () => {
    const data = {
      id: templ ? templ.id : "",
      template: {
        name: title,
        body: moduleBody,
      },
    };
    ModuleTemplatesApi.newModuleTemplate(data).then(() => {
      setSaved(true);
      refresh();
    });
  };

  return (
    <div id="ModuleBuilderView">
      <div className="module-container">
        <BackButton
          link=""
          onClick={() => {
            setCurrTempl(null);
            setNewTempl(false);
          }}
          text="All modules"
        />
        {!saved && <p style={{ color: "grey" }}>Changes not saved</p>}
        <h1 className="module-title">
          <ContentEditable
            onPaste={pasteAsPlainText}
            onKeyPress={disableNewlines}
            onChange={handleTitleEdit}
            html={title}
          />
        </h1>
        <div className="body-container">
          <Form>{itemComponents}</Form>
        </div>
        <div className="button-container">
          <div className="add-button">
            <Dropdown
              text="Add item..."
              icon="plus"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header content="Items" />
                <Dropdown.Menu scrolling>
                  {addOptions.map((option) => (
                    <Dropdown.Item onClick={handleDropdown} {...option} />
                  ))}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="save-button">
            <Button onClick={handleSubmit} positive>
              Save Module
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleBuilderView;
