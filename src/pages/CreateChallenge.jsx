import { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackTests,
  SandpackCodeViewer,
  SandpackConsole,
  useSandpack,
  useActiveCode,
  SandpackStack,
  FileTabs,
} from "@codesandbox/sandpack-react";
import { Editor } from "@monaco-editor/react";
import { getFileLanguage } from "../utils/fileHelper";

function MonacoEditor({ setFiles }) {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const activeFile = sandpack.activeFile;

  console.log("active file : ", sandpack.activeFile);

  function handleUpdateCode(value) {
    updateCode(value || "");
    setFiles((currentFiles) => ({
      ...currentFiles,
      [`${activeFile}`]: { code: value },
    }));
  }

  return (
    <SandpackStack style={{ height: "100%", margin: 0 }}>
      {/* <FileTabs /> */}
      {/* <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}> */}
      <Editor
        height="100%"
        language={getFileLanguage(activeFile)}
        theme="vs-dark"
        key={activeFile}
        defaultValue={code}
        onChange={handleUpdateCode}
      />
      {/* </div> */}
    </SandpackStack>
  );
}

function CodeEditorWrapper({ setFiles }) {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const activeFile = sandpack.activeFile;

  function handleUpdateCode(value) {
    updateCode(value || "");
    setFiles((currentFiles) => ({
      ...currentFiles,
      [activeFile]: { code: code },
    }));
  }
  return (
    <SandpackCodeEditor
      showTabs
      showLineNumbers={true}
      showInlineErrors
      wrapContent
      closableTabs
      onChange={handleUpdateCode}
    />
  );

  // return (
  //   <Editor
  //    height="100%"
  //    defaultLanguage="javascript"
  //    defaultValue={code}
  //    onChange={value => handleUpdateCode(value)}
  //    key={activeFile}
  //    language={getFileLanguage(activeFile)}
  //    theme="vs-dark"
  //   />
  // )
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { defaultFilesWithTests, defaultMarkdown } from "../config/challenge";
import { client } from "../api/api-client";

export default function CreateChallenge() {
  const [files, setFiles] = useState(() => defaultFilesWithTests);
  const [markdown, setMardown] = useState(() => defaultMarkdown);
  const [fileName, setFileName] = useState("");
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("accessToken")
  );
  console.log("files : ", files);

  function handleAddFile() {
    const newFileName = fileName;
    setFiles((currentFiles) => {
      if (currentFiles.newFileName) {
        return currentFiles;
      } else {
        return { ...currentFiles, [newFileName]: `` };
      }
    });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const formBody = {};
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, property) => (formBody[property] = value));

    const reqBody = {
      title: formBody.title,
      challengeCategory: formBody.challengeCategory,
      difficultyLevel: formBody.difficultyLevel,
      description: markdown,
      files: JSON.stringify(files),
    };
    console.log("reqBody : ", reqBody);

    // send req to backend
    await client("challenges", { data: reqBody, token });
  }

  return (
    <div className="flex justify-center items-center bg-green-100 py-10">
      <div className="lg:w-[60%] md:w-[80%] w-[95%] shadow-xl p-6 rounded bg-green-200">
        <h1 className="text-2xl py-6 text-center font-semibold text-gray-600">
          Add New Challenge
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className="w-full flex flex-col justify-center align-center">
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text font-semibold text-gray-600 font-semibold text-gray-600">
                  Challenge Title
                </span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Type here"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-emerald-400  w-full"
              />
              {/* <label className="label">
            <span className="label-text font-semibold text-gray-600-alt">Bottom Left label</span>
            <span className="label-text font-semibold text-gray-600-alt">Bottom Right label</span>
          </label> */}
            </div>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text font-semibold text-gray-600">
                  Challenge Category
                </span>
              </label>
              <select
                name="challengeCategory"
                className="select select-bordered focus:outline-none focus:ring-2 focus:ring-emerald-400 "
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>UI</option>
                <option>Custom Hooks</option>
                <option>User Events</option>
                <option>Pattern</option>
              </select>
              {/* <label className="label">
            <span className="label-text font-semibold text-gray-600-alt">Alt label</span>
            <span className="label-text font-semibold text-gray-600-alt">Alt label</span>
          </label> */}
            </div>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text font-semibold text-gray-600">
                  Difficulty Level
                </span>
              </label>
              <select
                name="difficultyLevel"
                className="select select-bordered focus:outline-none focus:ring-2 focus:ring-emerald-400 "
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              {/* <label className="label">
            <span className="label-text font-semibold text-gray-600-alt">Alt label</span>
            <span className="label-text font-semibold text-gray-600-alt">Alt label</span>
          </label> */}
            </div>
          </div>

          <div className="w-full mb-2">
            <label className="label">
              <span className="label-text font-semibold text-gray-600">
                Description
              </span>
            </label>

            <div className=" mb-3">
              <Editor
                height="465px"
                width="100%"
                language="markdown"
                theme="vs-dark"
                defaultValue={markdown}
                onChange={(value) => setMardown(value)}
              />
            </div>
            <div className="border-2 border-emerald-400 overflow-y-scroll px-4 bg-base-100">
              <ReactMarkdown className="markdown" rehypePlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>

          <div className="w-full mb-2">
            <label className="label">
              <span className="label-text font-semibold text-gray-600">
                File Object
              </span>
            </label>
            <SandpackProvider
              template="react"
              theme="dark"
              files={files}
              options={{
                visibleFiles: [""],
                activeFile: "/App.js",
                readOnly: true,
              }}
            >
              <div className="form-control mb-3">
                <div className=" input-group">
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="e.g : /filename.ext"
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-800"
                  />
                  <button
                    className="btn bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none"
                    onClick={handleAddFile}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="">
                <SandpackLayout className="h-full">
                  <SandpackFileExplorer />
                  {/* <MonacoEditor setFiles={setFiles} /> */}
                  <CodeEditorWrapper setFiles={setFiles} />
                  {/* <SandpackPreview
                      showNavigator={true}
                      showOpenInCodeSandbox={false}
                    /> */}
                  {/* <SandpackTests /> */}
                  {/* <SandpackConsole /> */}
                </SandpackLayout>
              </div>
            </SandpackProvider>
          </div>

          <div className="flex justify-center items-center mt-6 w-full">
            <button
              type="submit"
              className="btn bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
