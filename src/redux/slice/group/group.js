import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://yalli-back-end.onrender.com/v1/groups";

// Thunks
export const getGroupData = createAsyncThunk(
  "groups/getGroupData",
  async ({ page, size, title, country, categories }) => {
    const response = await axios.get(
      "https://yalli-back-end.onrender.com/v1/groups",
      {
        params: {
          page,
          size,
          title,
          country,
          category: categories.join(","),
        },
        headers: {
          accept: "*/*",
        },
      }
    );
    return response.data;
  }
);
export const getGroupDataById = createAsyncThunk(
  "groups/getGroupDataById",
  async (id) => {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  }
);

export const postGroupData = createAsyncThunk(
  "groups/postGroupData",
  async (newp) => {
    const response = await axios.post(baseURL, newp, {
      headers: { "Content-Type": "application/json" },
    });
    const existingGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    const updatedGroups = [...existingGroups, response.data];
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    return response.data;
  }
);

// Initial State
const persistedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
const initialState = {
  group: {
    id: 0,
    title: "",
    description: "",
    country: "",
    memberCount: 0,
    link: "",
    category: "",
    imageId: "",
  },
  groups: persistedGroups,
  loading: false,
  error: null,
};

// Slice
export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getGroupData, postGroupData, getGroupDataById),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(isFulfilled(getGroupData), (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addMatcher(isFulfilled(postGroupData), (state, action) => {
        state.groups.push(action.payload);
        state.loading = false;
      })
      .addMatcher(isFulfilled(getGroupDataById), (state, action) => {
        state.group = action.payload;
        state.loading = false;
      })
      .addMatcher(
        isRejected(getGroupData, postGroupData, getGroupDataById),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default groupSlice.reducer;
