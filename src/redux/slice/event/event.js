import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://yalli-back-end.onrender.com/v1/events";

export const getEventData = createAsyncThunk(
  "events/getEventData",
  async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${userInfo.access-token}`,
      },
    });
    return response.data;
  }
);

export const getEventDataById = createAsyncThunk(
  "events/getEventDataById",
  async (id) => {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  }
);

export const postEventData = createAsyncThunk(
  "events/postEventData",
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
  event: {
    id: 0,
    title: "",
    data: "",
    country: "",
    link: "",
  },
  events: [],
  loading: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventData.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(getEventData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postEventData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postEventData.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.loading = false;
      })
      .addCase(postEventData.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(getEventDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventDataById.fulfilled, (state, action) => {
        state.event = action.payload;
        state.loading = false;
      })
      .addCase(getEventDataById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = eventSlice.actions;

export default eventSlice.reducer;
