import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
