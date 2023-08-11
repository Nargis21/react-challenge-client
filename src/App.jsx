import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <MainLayout></MainLayout>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
