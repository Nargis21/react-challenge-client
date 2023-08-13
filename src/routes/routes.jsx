import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Challenges, { loadChallenges } from "../pages/Challenges";
import MyChallenges, {loadUserChallenges} from "../pages/MyChallenges";
import RequireAuth from "../utils/RequireAuth";
import ManageChallenges from "../pages/ManageChallenges";
import RequireAdmin from "../utils/RequireAdmin";
import Challenge, {loadChallenge} from "../pages/Challenge";
import CreateChallenge from "../pages/CreateChallenge";
import EditChallenge from "../pages/EditChallenge";

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
        children: [
          {
            index: true,
            element: <Challenges />,
            loader: loadChallenges
          },
          {
            path: ":id",
            element: <Challenge />,
            loader: loadChallenge
          }
        ]
      },
      {
        path: "/my-challenges",
        element: (
          <RequireAuth>
            <MyChallenges />
          </RequireAuth>
        ),
        loader: loadUserChallenges
      },
      {
        path: "/manage-challenges",
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                <RequireAdmin>
                  <ManageChallenges />
                </RequireAdmin>
              </RequireAuth>
            ),
            loader: loadChallenges
          },
          {
            path: "create",
            element: (
              <RequireAuth>
                <RequireAdmin>
                  <CreateChallenge />
                </RequireAdmin>
              </RequireAuth>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <RequireAuth>
                <RequireAdmin>
                  <EditChallenge />
                </RequireAdmin>
              </RequireAuth>
            ),
            loader: loadChallenge
          }
        ]
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
