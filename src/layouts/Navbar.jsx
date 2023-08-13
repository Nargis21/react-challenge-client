import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
import useAdmin from "../hooks/useAdmin";
import react from "../assets/react.json";
import Lottie from "react-lottie";

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
          <button onClick={handleLogout} className="">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </>
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: react,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className=" hidden lg:flex">
          <div className="flex items-center">
            {/* <img src={logo} alt="Logo" className="w-[50px] mr-2" /> */}
            <Lottie options={defaultOptions} height={60} width={60} />
            <h1 className="normal-case text-2xl font-thin">
              <span className="font-bold">React</span> Challenge
            </h1>
          </div>
        </Link>
      </div>

      <div className="navbar-end ">
        <ul className="menu menu-horizontal px-1 hidden lg:flex text-gray-700 font-semibold text-[16px]">
          {menuItems}
        </ul>
        <Link to="/" className=" lg:hidden">
          <div className="flex items-center">
            {/* <img src={logo} alt="Logo" className="w-[50px]" /> */}
            <h1 className="normal-case text-2xl font-thin">
              <span className="font-bold">React</span> Challenge
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
