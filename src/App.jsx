import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BF from "./utils/Bugfender";

const App = () => {
  BF.log('App Created')
  return (
    <div>
      <MainLayout></MainLayout>
      <ToastContainer position="bottom-right" theme="dark"></ToastContainer>
    </div>
  );
};

export default App;
