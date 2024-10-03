import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://yalli-back-end.onrender.com/v1/groups";

export const postGroupData = createAsyncThunk(
  "groups/postGroupData",
  async (newp) => {
    const response = await axios.post(baseURL, newp);
    return response.data;
  }
);

const initialState = {
  location: {
    id: 0,
    data: {
      title: "",
      description: "",
      country: "",
      memberCount: 0,
      link: "",
      category: "",
    },
    image: "",
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
  },
});

export const {} = groupSlice.actions;

export default groupSlice.reducer;
