import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "../slice/group/group";
import eventReducer from "../slice/event/event";
import userReducer from "../slice/user/user";
import fileReducer from "../slice/file/file";
export const store = configureStore({
  reducer: {
    groups: groupReducer,
    events: eventReducer,
    users: userReducer,
    file: fileReducer,
  },
});
