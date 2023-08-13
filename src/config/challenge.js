export const defaultFilesWithTests = {
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

export const defaultMarkdown = `
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