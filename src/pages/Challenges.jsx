import React, { useState } from "react";
import { client } from "../api/api-client";
import { getAllChallenges } from "../api/api";
import { defer, useLoaderData, Await, useNavigate } from "react-router-dom";

export const loadChallenges = async ({ params }) => {
  const challenges = await getAllChallenges();
  return defer({ challenges });
};

const filesWithTests = {
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
return <h1>Doggy Directory</h1>
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
  "/tests/setup.js": {
    code: `
    import {expect, afterEach} from 'vitest'
    import {cleanup} from '@testing-library/react'
    import matchers from '@testing-library/jest-dom/matchers'

    expect.extend(matchers)

    afterEach(() => {
      cleanup();
    })
    `,
  },
  "/tests/App.test.jsx": {
    code: `
    import {render, screen} from '@testing-library/react'
    import App from '../App.js'
    import '@testing-library/jest-dom/extend-expect';

      test('renders headline', () => {
        render(<App />);
      
        expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
      })
    
    `,
  },
  "/add.ts": {
    code: `export const add = (a,b) => a + b;`,
  },
  "/package.json": {
    code: JSON.stringify({
      scripts: {
        start: "react-scripts start",
      },
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0",
        "react-scripts": "^5.0.0",
        "@testing-library/jest-dom": "^5.17.0",
        "@testing-library/react": "^14.0.0",
        jsdom: "^22.1.0",
        vitest: "^0.33.0",
      },
      main: "/index.js",
    }),
  },
};

const Challenges = () => {
  const navigate = useNavigate();
  const { challenges } = useLoaderData();
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("accessToken"),
  );

  async function handleNewChallenge() {
    const challengeFiles = {
      title: "test challenge 2",
      challengeCategory: "UI",
      description: "create a button with Click text",
      difficultyLevel: "Easy",
      files: JSON.stringify(filesWithTests),
    };
    console.log("token : ", token);
    await client("challenges", { data: challengeFiles, token });
  }

  return (
    <>
      <div>List of Challenges</div>

      <div>
        <div>Create Challenge</div>
        <div>
          <button className="btn" onClick={handleNewChallenge}>
            Add New Challenge
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Difficulty level</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {challenges?.success &&
              challenges?.data.map((challenge) => (
                <tr
                  key={challenge._id}
                  onClick={() => navigate(`/challenges/${challenge._id}`)}
                  className="cursor-pointer"
                >
                  <td>{challenge.title}</td>
                  <td>{challenge.challengeCategory}</td>
                  <td>{challenge.difficultyLevel}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Challenges;
