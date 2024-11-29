import { createBrowserRouter, useLocation } from "react-router-dom";
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
import ProfileInfo from "../pages/Profile/Components/ProfileInfo";
import Groups from "../components/mentor/main/Groups";
import Members from "../components/mentor/main/Members";
import Events from "../components/mentor/main/Events";
import Mentors from "../components/mentor/main/Mentors";
import GroupEdit from "../pages/GroupEdit/GroupEdit";
import Main from "../components/groupDetail/main/Main";
import { PrivateRoute } from "../PrivateRoute";
import { HideAfterRegisterRoute } from "../components/Private/AfterRegister";
import { HideAfterChangePass } from "../components/Private/AfterChangePass";

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
    element: <PrivateRoute />, 
    children: [
      { path: "", element: <Profile /> },
      { path: ":section", element: <Profile /> },
    ],
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
    path: "/members",
    element: <Members />,
  },
  {
    path: "/mentors",
    element: <Mentors />,
  },
  {
    path: "/mentor/:id",
    element: <MentorDetail />,
  },
  {
    path:"/main",
    element:<Main />
  },
  {
    path: "/qrup",
    element: <Qrup />,
  },
  {
    path: "/groups",
    element: <Groups />,
  },
  {
    path: "/qrup/:id",
    element: <GroupDetail />,
  },
  {
    path: "/group-edit/:groupID/:sectionGroup",
    element: <GroupEdit />,
  },
  {
    path: "/event",
    element: <Event />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <HideAfterRegisterRoute />,
    children: [
      { path: "/confirm-email", element: <ConfirmEmail /> },
    ],
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
    element: <ForgotPass />,
  },

  {
    path: "/success",
    element: <Success />,
  },
  {
    element: <HideAfterChangePass />,
    children: [
      { path: "/reset-password", element: <ResetPass /> },
    ],
  },
  {
    path: "/event/:id",
    element: <EventDetail />,
  },
])
export default Router
