import { useState, useEffect } from "react"
import { SandpackProvider, 
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
  FileTabs
} from "@codesandbox/sandpack-react"
import { Editor } from "@monaco-editor/react"
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

function CodeEditorWrapper({ setFiles }){
  const {code, updateCode} = useActiveCode()
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
  )

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

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { defaultFilesWithTests, defaultMarkdown } from "../config/challenge";
import { client } from "../api/api-client";


export default function CreateChallenge(){

  const [files, setFiles] = useState(() => defaultFilesWithTests);
  const [markdown, setMardown] = useState(() => (defaultMarkdown))
  const [fileName, setFileName] = useState("")
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("accessToken")
  );
  console.log('files : ',files)

  function handleAddFile(){
    const newFileName = fileName
    setFiles(currentFiles => {
       if(currentFiles.newFileName){
        return currentFiles
       }else{
        return {...currentFiles, [newFileName]: ``}
       }
    })
  }

  async function handleFormSubmit(event){
    event.preventDefault()
    const formBody = {}
    const formData = new FormData(event.currentTarget)
    formData.forEach((value, property) => formBody[property] = value);

    const reqBody = {
      title: formBody.title,
      challengeCategory: formBody.challengeCategory,
      difficultyLevel: formBody.difficultyLevel,
      description: markdown,
      files: JSON.stringify(files)
    }
    console.log('reqBody : ', reqBody)

    // send req to backend
    await client('challenges', {data: reqBody, token})
  }

  return (
    <>
    <div>
      Create Challenge
    </div>

    <form onSubmit={handleFormSubmit}>
    <div className="w-full h-[500px]">
      <div className="max-w-lg mx-auto">
        <div className="w-full flex flex-col justify-center align-center">

          <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Challenge Title?</span>
          </label>
          <input name="title" type="text" placeholder="Type here" className="input input-bordered w-full" />
          {/* <label className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </label> */}
          </div>

          <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Challenge Category</span>
          </label>
          <select name="challengeCategory" className="select select-bordered">
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
          <select name="difficultyLevel" className="select select-bordered">
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
          </div>
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
        <SandpackProvider template="react" theme="dark" files={files}
      options={{ 
        visibleFiles: [""],
        activeFile: "/App.js",
        readOnly: true,
      }}
      >

        <div className="flex my-4 p-2">
          <div className="w-[100%] py-4 border-dashed border-2 border-sky-500">
            <div className="max-w-lg mx-auto">
              <div className="w-full flex flex-col justify-center align-center">
              <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Add File</span>
              </label>
              <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="e.g : /filename.ext" className="input text-slate-500 input-bordered w-full" />
              {/* <label className="label">
                <span className="label-text-alt">Bottom Left label</span>
                <span className="label-text-alt">Bottom Right label</span>
              </label> */}
              <div className="py-4">
               <button className="btn btn-sm btn-success" onClick={handleAddFile}>Add</button>
              </div>
              
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 py-4 h-[500px]">
        <SandpackLayout className="h-full">     
          <SandpackFileExplorer />
          {/* <MonacoEditor setFiles={setFiles} /> */}
          <CodeEditorWrapper setFiles={setFiles} />
          <SandpackPreview 
            showNavigator={true} 
            showOpenInCodeSandbox={false}
          />
          {/* <SandpackTests /> */}
          {/* <SandpackConsole /> */}
        </SandpackLayout>
        </div>

      </SandpackProvider>
      </div>
      </div>

      <div className="flex justify-center items-center">
        <button type="submit" className="btn btn-success">Submit</button>
      </div>

    </div>
    </form>
    </>
  )
}