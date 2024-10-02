import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Mentor from "../pages/Mentor/Mentor";
import Qrup from "../pages/Qrup/Group";
import Event from "../pages/Event/Event";
import Auth from "../pages/Auth/index"
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/mentor",
    element: <Mentor />,
  },

  {
    path: "/qrup",
    element: <Qrup />,
  },
  {
    path: "/event",
    element: <Event />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },

]);
export default Router;
