import Lottie from "react-lottie";
import banner from "../assets/home.json";
import react from "../assets/react.json";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: banner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: react,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate = useNavigate();
  return (
    <div className="flex lg:flex-row flex-col gap-6 justify-evenly py-10 items-center bg-green-100 h-screen">
      <div>
        <div className="chat chat-start ml-10 " data-aos="fade-right">
          <div className="chat-bubble bg-gradient-to-r from-emerald-300 to-green-300 lg:text-6xl md:text-4xl text-2xl font-bold text-white leading-normal">
            <div className="p-4 ">
              <h1>Take a Challenge on</h1>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">React</span>

                <Lottie
                  options={defaultOptions2}
                  // height={60}
                  width={80}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="chat chat-end mt-4 cursor-pointer "
          onClick={() => navigate(`/challenges`)}
        >
          <div className="chat-bubble bg-gradient-to-r from-emerald-300 to-green-300 ">
            <h1 className="p-2 text-white font-bold text-xl">Explore Now</h1>
          </div>
        </div>
      </div>

      <div className="">
        <Lottie
          className=""
          options={defaultOptions}
          height={500}
          width={700}
        />
      </div>
    </div>
  );
};

export default Home;
