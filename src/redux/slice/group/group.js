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
  async (newp) => {
    const response = await axios.post(baseURL, newp, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${yourToken}`,
      },
    });
    return response.data;
  }
);

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
  groups: [],
  loading: false,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
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
      });

    builder
      .addCase(postGroupData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postGroupData.fulfilled, (state, action) => {
        state.groups.push(action.payload);
        state.loading = false;
      })
      .addCase(postGroupData.rejected, (state) => {
        state.loading = false;
      });
    builder
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

export const {} = groupSlice.actions;

export default groupSlice.reducer;
