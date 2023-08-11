import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Challenges from "../pages/Challenges";
import MyChallenges from "../pages/MyChallenges";
import RequireAuth from "../utils/RequireAuth";
import ManageChallenges from "../pages/ManageChallenges";
import RequireAdmin from "../utils/RequireAdmin";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/challenges",
        element: <Challenges />,
      },
      {
        path: "/my-challenges",
        element: (
          <RequireAuth>
            <MyChallenges />
          </RequireAuth>
        ),
      },
      {
        path: "/manage-challenges",
        element: (
          <RequireAuth>
            <RequireAdmin>
              <ManageChallenges />
            </RequireAdmin>
          </RequireAuth>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
