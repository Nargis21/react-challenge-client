import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { Bugfender } from '@bugfender/sdk';

Bugfender.init({
    appKey: import.meta.env.VITE_bugfender_app_key,
    // apiURL: 'https://api.bugfender.com',
    // baseURL: 'https://dashboard.bugfender.com',
    // overrideConsoleMethods: true,
    // printToConsole: true,
    // registerErrorHandler: true,
    // logBrowserEvents: true,
    // logUIEvents: true,
    // version: '',
    // build: '',
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
