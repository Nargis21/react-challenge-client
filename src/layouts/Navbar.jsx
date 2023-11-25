import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
import useAdmin from "../hooks/useAdmin";
import { FaReact } from "react-icons/fa";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/challenges">Challenges</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/my-challenges">My Challenges</Link>
          </li>
        </>
      )}
      {user && admin && (
        <>
          <li>
            <Link to="/manage-challenges">Manage Challenges</Link>
          </li>
        </>
      )}

      <li>
        {user ? (
          <button
            onClick={handleLogout}
            className="border border-white rounded-lg px-4 py-2 hover:bg-white ml-2"
          >
            Logout <PiSignOutBold></PiSignOutBold>
          </button>
        ) : (
          <Link
            to="/login"
            className="border border-white rounded-lg px-4 py-2 bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 ml-2"
          >
            Login <PiSignInBold></PiSignInBold>
          </Link>
        )}
      </li>
    </>
  );
  return (
    <div className="navbar bg-gradient-to-r from-green-400 to-emerald-400 lg:px-6 md:px-4 sm:px-2 shadow-lg sticky top-0 z-10">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow text-gray-800 bg-green-200 rounded w-52 font-bold"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className=" hidden lg:flex">
          <div className="flex items-center">
            <h1 className="normal-case text-2xl font-thin text-slate-800 flex items-center gap-2">
              <FaReact className="text-3xl"></FaReact>
              <span className="font-bold">React</span> Challenge
            </h1>
          </div>
        </Link>
      </div>

      <div className="navbar-end ">
        <ul className="menu menu-horizontal px-1 hidden lg:flex text-gray-800 font-semibold text-[16px]">
          {menuItems}
        </ul>
        <Link to="/" className=" lg:hidden">
          <div className="flex items-center">
            <h1 className="normal-case text-2xl font-thin text-slate-800 flex items-center gap-2">
              <FaReact className="text-3xl"></FaReact>
              <span className="font-bold">React</span> Challenge
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
