export enum ModuleItems {
  Header = "header",
  Description = "description",
  TextInput = "textinput",
  FileUpload = "fileupload",
}

interface HeaderBody {
  type: ModuleItems.Header;
  text: string;
}

interface DescriptionBody {
  type: ModuleItems.Description;
  text: string;
}

interface TextInputBody {
  type: ModuleItems.TextInput;
  title: string;
  description: string;
  charLimit: number | null;
  body: {
    text: string;
  };
}

interface FileUploadBody {
  type: ModuleItems.FileUpload;
  title: string;
  description: string;
  fileTypes: string[];
  body: {
    fileUrl: string;
  };
}

export type ModuleBody = (
  | HeaderBody
  | DescriptionBody
  | TextInputBody
  | FileUploadBody
)[];

export interface Module {
  body: ModuleBody;
  id: number;
  name: string;
}

export function getBlankModuleItem(type: ModuleItems) {
  switch (type) {
    case ModuleItems.Header:
      return {
        type: ModuleItems.Header,
        text: "Header",
      } as HeaderBody;
    case ModuleItems.Description:
      return {
        type: ModuleItems.Description,
        text: "Insert description here...",
      } as DescriptionBody;
    case ModuleItems.TextInput:
      return {
        type: ModuleItems.TextInput,
        title: "Text input Title",
        description: "Text input description...",
        charLimit: null,
        body: {
          text: "",
        },
      } as TextInputBody;
    case ModuleItems.TextInput:
      return {
        type: ModuleItems.TextInput,
        title: "Text input title",
        description: "Text input description...",
        charLimit: null,
        body: {
          text: "",
        },
      } as TextInputBody;
    case ModuleItems.FileUpload:
      return {
        type: ModuleItems.FileUpload,
        title: "File upload title",
        description: "File upload description...",
        fileTypes: [".txt", ".docx", ".doc", ".pdf"],
        body: {
          fileUrl: "",
        },
      } as FileUploadBody;
  }
}

export interface GameboardTemplateMap {
  [groupId: number]: {
    [sqCoord: string]: number;
  };
}
