import { Suspense, useState } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";
import { getChallengeById } from "../api/api";
import * as React from "react";
import Split from "react-split";
import "./Challenge.css";
import { client } from "../api/api-client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackTests,
  SandpackCodeViewer,
  SandpackConsole,
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { Editor } from "@monaco-editor/react";
import Tabs, { TabContent } from "../components/Tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getFileLanguage } from "../utils/fileHelper";
import { toast } from "react-toastify";

export const loadChallenge = async ({ params }) => {
  const challengeId = params.id;
  const challenge = await getChallengeById(challengeId);
  return defer({ challenge });
};

const someJSCodeExample = `
  // The source (has been changed) is https://github.com/facebook/react/issues/5465#issuecomment-157888325

  const CANCELATION_MESSAGE = {
    type: 'cancelation',
    msg: 'operation is manually canceled',
  };

  function makeCancelable(promise) {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(val => hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val));
      promise.catch(reject);
    });

    return (wrappedPromise.cancel = () => (hasCanceled_ = true), wrappedPromise);
  }

  export default makeCancelable;
`;
const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;
const testMarkdown = `
## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using dangerouslySetInnerHTML
* Lets you define your own components (to render MyHeading instead of h1)
* Has a lot of plugins

## Table of contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
This section is replaced by an actual table of contents.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[rehype-highlight](https://github.com/rehypejs/rehype-highlight).
`;

function MonacoEditor({ setFiles }) {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const activeFile = sandpack.activeFile;

  function handleUpdateCode(value) {
    updateCode(value || "");
    setFiles((currentFiles) => ({
      ...currentFiles,
      [`${activeFile}`]: { code: value },
    }));
  }

  return (
    <SandpackStack style={{ height: "100%", margin: 0 }}>
      <FileTabs />
      {/* <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}> */}
      <Editor
        height="100%"
        language={getFileLanguage(activeFile)}
        theme="vs-dark"
        key={activeFile}
        defaultValue={code}
        onChange={(value) => handleUpdateCode(value)}
      />
      {/* </div> */}
    </SandpackStack>
  );
}

const Challenge = () => {
  const { challenge } = useLoaderData();
  const [enableSaveButton, setEnableSaveButton] = useState(true);
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("accessToken")
  );
  const [files, setFiles] = useState(() => JSON.parse(challenge.data.files));
  const [showConsole, setShowConsole] = useState(true);
  const [showConsoleOnRight, setShowConsoleOnRight] = useState(true);
  const [allTabs, setAllTabs] = useState([
    {
      tabName: "Challenge Description",
      content: (
        <ReactMarkdown className="markdown" rehypePlugins={[remarkGfm]}>
          {challenge?.data?.description}
        </ReactMarkdown>
      ),
    },
    {
      tabName: "Preview",
      content: <SandpackPreview showNavigator />,
    },
    {
      tabName: "Console",
      content: <SandpackConsole />,
    },
  ]);
  const [activeTab, setActiveTab] = useState(allTabs[0]);

  async function handleSaveChallenge() {
    setEnableSaveButton(false);
    const updatedChallengeData = {
      challengeId: challenge.data.challengeId ?? challenge.data._id,
      title: challenge.data.title,
      description: challenge.data.description,
      challengeCategory: challenge.data.challengeCategory,
      difficultyLevel: challenge.data.difficultyLevel,
      files: JSON.stringify(files),
    };
    const data = await client("user/challenge", {
      data: updatedChallengeData,
      token,
    });
    if (data !== (undefined | null)) {
      setEnableSaveButton(true);
      toast.success("Challenge Saved");
    } else {
      toast.error("Failed to save");
    }
  }

  if (!challenge.success) {
    return <div>Error while fetching challenge data</div>;
  }
  return (
    <>
      <SandpackProvider
        template="react"
        theme="dark"
        files={files}
        options={{
          visibleFiles: ["package.json", "/public/index.html"],
          activeFile: "/App.js",
          readOnly: true,
        }}
      >
        <SandpackLayout>
          <div className="main_container">
            <div className="header_section">Header</div>
            <div className="main_section">
              <Split
                className="container"
                sizes={[50, 50]}
                minSize={0}
                expandToMin={false}
                gutterSize={5}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={1}
                direction="horizontal"
                cursor="col-resize"
              >
                <div className="description">
                  <Split
                    className="vertical_container"
                    sizes={[70, 30]}
                    minSize={10}
                    expandToMin={false}
                    gutterSize={5}
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    direction="vertical"
                    cursor="row-resize"
                  >
                    <div>
                      <Tabs
                        allTabs={allTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                      />
                      <TabContent activeTab={activeTab} />
                    </div>
                    <div className="preview">
                      <SandpackPreview showNavigator={true} />
                    </div>
                  </Split>
                </div>
                <div className="editor_and_test">
                  <Split
                    className="vertical_container"
                    sizes={[70, 30]}
                    minSize={10}
                    expandToMin={false}
                    gutterSize={5}
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    direction="vertical"
                    cursor="row-resize"
                  >
                    <div>
                      <div className="section_header console_header">
                        <div>javascript</div>
                        <div>
                          <button
                            className="btn btn-success btn-xs"
                            onClick={handleSaveChallenge}
                            disabled={!enableSaveButton}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="editor_container">
                        <MonacoEditor setFiles={setFiles} />
                        {/* <Editor 
            height="100%"
            theme="vs-dark"
            defaultLanguage="javascript" 
            defaultValue={someJSCodeExample}
          /> */}
                      </div>
                    </div>
                    <div className="test_section">
                      <div>
                        <SandpackTests
                          showNavigator
                          style={{ height: "100%", padding: "5px" }}
                        />
                      </div>
                    </div>
                  </Split>
                </div>
              </Split>
            </div>
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
};

export default Challenge;
