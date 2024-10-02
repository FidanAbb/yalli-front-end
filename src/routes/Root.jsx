import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Mentor from "../pages/Mentor/Mentor";
// import Qrup from "../pages/Qrup/Qrup";
// import Event from "../pages/Event/Event";
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

//   {
//     path: "/qrup",
//     element: <Qrup />,
//   },
//   {
//     path: "/event",
//     element: <Event />,
//   },
]);
export default Router;
