import "./App.scss";
import { RouterProvider } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import router from "./routes/Root";
import { ToastContainer } from "react-toastify";

function App() {
  return <>
  <ToastContainer/>
  
   <RouterProvider router={router} />;
  </>
}

export default App;
