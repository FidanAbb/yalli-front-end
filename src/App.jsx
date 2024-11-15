import "./App.scss";
import { RouterProvider, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import router from "./routes/Root";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {

  return <>
  <ToastContainer/>
   <RouterProvider router={router} />;
  </>
}

export default App;
