import {useState} from "react";
import "./App.scss";
import { RouterProvider, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import router from "./routes/Root";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  return <>
  {console.log(forServerError)}
  <ToastContainer/>
   <RouterProvider router={router} />
  </>
}

export default App
