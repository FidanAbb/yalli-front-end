import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://yalli-back-end.onrender.com/v1/groups";

export const getGroupData = createAsyncThunk(
  "groups/getGroupData",
  async () => {
    const response = await axios.get(baseURL);
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
  async (newp, { dispatch }) => {
    const response = await axios.post(baseURL, newp, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${yourToken}`,
      },
    });
    // Update local storage
    const existingGroups = JSON.parse(localStorage.getItem('groups') || '[]');
    const updatedGroups = [...existingGroups, response.data];
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    return response.data;
  }
);

const persistedGroups = JSON.parse(localStorage.getItem('groups') || '[]');

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
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroupData.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(getGroupData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postGroupData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postGroupData.fulfilled, (state, action) => {
        state.groups.push(action.payload);
        state.loading = false;
      })
      .addCase(postGroupData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGroupDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroupDataById.fulfilled, (state, action) => {
        state.group = action.payload;
        state.loading = false;
      })
      .addCase(getGroupDataById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default groupSlice.reducer;
