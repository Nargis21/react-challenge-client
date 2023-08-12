import { useState } from "react"
import { SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview,
  SandpackFileExplorer,
  SandpackTests,
  SandpackCodeViewer,
  SandpackConsole
} from "@codesandbox/sandpack-react"
import { Editor } from "@monaco-editor/react"

const reactTemplateFiles = {
    "/styles.css": {
      code: `body {
    font-family: sans-serif;
    -webkit-font-smoothing: auto;
    -moz-font-smoothing: auto;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: auto;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
  
  h1 {
    font-size: 1.5rem;
  }`,
  },
  "/App.js": {
      code: `export default function App() {
  return <h1>Hello world</h1>
}
`,
    },
    "/index.js": {
      code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
    },
    "/public/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    },
    "/package.json": {
      code: JSON.stringify({
        dependencies: {
          react: "^18.0.0",
          "react-dom": "^18.0.0",
          "react-scripts": "^5.0.0",
        },
        main: "/index.js",
      }),
    },
}

// const templateFileForSandbox = {
//   ...reactTemplateFiles, 
//   "/package.json": JSON.stringify({reactTemplateFiles["/package.json"].code})
// }

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
`
function changeFileObject(fileObj){
  const fileKeys = fileObj.keys()
  let str = `
  const fileObject = { 
  `
  fileKeys?.map(key => {
    str = str + `"${key}": {code: \` ${fileObj[key].code} \`},\n`
  })
  str = str + `
  }
  `
  console.log('str : ', str)
}

const js = `
const fileObject = { 
  "/styles.css": {code: \`${reactTemplateFiles["/styles.css"].code}\`},
  "/App.js": {code: \`${reactTemplateFiles["/App.js"].code}\`},
  "/index.js": {code: \`${reactTemplateFiles["/index.js"].code}\`},
  "/public/index.html": {code: \`${reactTemplateFiles["/public/index.html"].code}\`},
  "/package.json": {code: \`${reactTemplateFiles["/package.json"].code}\`},
}
`

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


export default function CreateChallenge(){

  const [description, setDescription] = useState("")
  const [files, setFiles] = useState(() => reactTemplateFiles);
  const [markdown, setMardown] = useState(() => (testMarkdown))
  console.log('files : ',)

  

  return (
    <>
    <div>
      Create Challenge
    </div>

    <div className="w-full h-[500px]">
      <div className="max-w-lg mx-auto">
        <form className="w-full flex flex-col justify-center align-center">

          <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Challenge Title?</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full" />
          {/* <label className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </label> */}
          </div>

          <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Challenge Category</span>
          </label>
          <select className="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>UI</option>
            <option>Custom Hooks</option>
            <option>User Events</option>
            <option>Pattern</option>
          </select>
          {/* <label className="label">
            <span className="label-text-alt">Alt label</span>
            <span className="label-text-alt">Alt label</span>
          </label> */}
          </div>

          <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Difficulty Level</span>
          </label>
          <select className="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          {/* <label className="label">
            <span className="label-text-alt">Alt label</span>
            <span className="label-text-alt">Alt label</span>
          </label> */}
          </div>

          <div>
            
          </div>


          </form>
      </div>

      <div className="w-full mx-auto my-6">
        <div>Description</div>
        <div className="flex h-[500px] p-2">
          <div className="w-[50%] border-dashed border-2 border-sky-500 overflow-y-scroll">
           <ReactMarkdown className="markdown" rehypePlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
          <div className="w-[50%] border-dashed border-2 border-sky-500">
          <Editor
            height="465px"
            width="100%"
            language="markdown"
            theme="vs-dark"
            defaultValue={markdown}
            onChange={(value) => setMardown(value)}
          />
          </div>
        </div>
      </div>

      <div>
      <div className="w-full mx-auto my-6">
        <div>File Object</div>
        <SandpackProvider template="react" theme="dark" files={reactTemplateFiles}
      options={{ 
        visibleFiles: [""],
        activeFile: "/App.js",
        readOnly: true,
      }}
      >

        <div className="flex h-[500px] p-2">
          <div className="w-[100%] border-dashed border-2 border-sky-500">
          <Editor
            height="465px"
            width="100%"
            language="javascript"
            theme="vs-dark"
            defaultValue={js}
            onChange={(value) => setMardown(value)}
          />
          </div>
        </div>
     
        <SandpackLayout >     
          <SandpackFileExplorer />
          <SandpackCodeEditor 
          showTabs
          showLineNumbers={true}
          showInlineErrors
          wrapContent
          closableTabs
          />
          {/* <SandpackCodeViewer /> */}
          <SandpackPreview 
            showNavigator={true} 
            showOpenInCodeSandbox={false}
          />
          {/* <SandpackTests /> */}
          {/* <SandpackConsole /> */}
        </SandpackLayout>
      </SandpackProvider>
      </div>
      </div>

    </div>

    </>
  )
}