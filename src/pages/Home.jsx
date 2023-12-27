import Lottie from "react-lottie";
import banner from "../assets/home.json";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { BsFire } from "react-icons/bs";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: banner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // bg - green - 100;

  const navigate = useNavigate();
  return (
    <div className="flex lg:flex-row flex-col gap-6 justify-evenly py-10 items-center bg-slate-900 h-screen">
      <div>
        <div className="chat chat-start lg:ml-10 ml-4" data-aos="fade-right">
          <div className="chat-bubble bg-gradient-to-r from-emerald-400 to-green-400 lg:text-6xl md:text-4xl text-2xl font-bold text-white leading-normal">
            <div className="p-4">
              <h1>Take a Challenge on</h1>

              <p className="text-slate-800 flex items-center gap-2 mt-4">
                React <BsFire></BsFire>
              </p>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="chat chat-end mt-4 cursor-pointer "
          onClick={() => navigate(`/challenges`)}
        >
          <div className="chat-bubble bg-gradient-to-r from-green-400 to-emerald-400 ">
            <h1 className="p-2 text-white font-bold text-xl underline flex gap-2 items-center">
              Explore Now
              <FaAngleDoubleRight className="text-slate-800 text-2xl"></FaAngleDoubleRight>
            </h1>
          </div>
        </div>
      </div>

      <div data-aos="zoom-in">
        <Lottie options={defaultOptions} height={500} width={700} />
      </div>
    </div>
  );
};

export default Home;
