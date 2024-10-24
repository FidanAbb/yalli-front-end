import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Mentor from "../pages/Mentor/Mentor";
import Qrup from "../pages/Qrup/Group";
import Event from "../pages/Event/Event";
// import Auth from "../pages/Auth/index"
import Member from "../pages/Member/Member";
import GroupDetail from "../pages/groupDetail/GroupDetail";
import ForgotPass from "../pages/forgotpass";
import ConfirmEmail from "../pages/ConfirmEmail";
import Success from "../pages/success";
import ResetPass from "../pages/ResetPass";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import EventDetail from "../pages/Event/EventDetail";
import MentorDetail from "../pages/Mentor/MentorDetail";

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
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/member",
    element: <Member />,
  },
  {
    path: "/mentor",
    element: <Mentor />,
  },
  {
    path: "/mentor/:id",
    element: <MentorDetail />,
  },

  {
    path: "/qrup",
    element: <Qrup />,
  },
  {
    path: "/qrup/:id",
    element: <GroupDetail />,
  },
  {
    path: "/event",
    element: <Event />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/auth",
  //   element: <Auth />,
  // },
  {
    path: "/forgot-password",
    element: <ForgotPass/>,
  },
  {
    path: "/confirm-email",
    element: <ConfirmEmail/>,
  },
  {
    path: "/success",
    element: <Success/>,
  },
  {
    path: "/reset-password",
    element: <ResetPass/>,
  },
  {
    path: "/event/:id",
    element: <EventDetail />,
  },

]);
export default Router;
