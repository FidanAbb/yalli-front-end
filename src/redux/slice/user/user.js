import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://yalli-back-end-7v7d.onrender.com/v1/users";

export const getUserData = createAsyncThunk("users/getUserData", async () => {
  const response = await axios.get(baseURL);
  return response.data;
});
console.log(getUserData);

export const getUserDataById = createAsyncThunk(
  "users/getUsersDataById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data; // Make sure the response data structure is as expected
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postUserData = createAsyncThunk(
  "users/postUserData",
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

export const patchUserData = createAsyncThunk(
  "users/patchUserData",
  async ({ id, updatedData }) => {
    const response = await axios.patch(`${baseURL}/${id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

const initialState = {
  user: {
    id: 0,
    fullName: "",
    email: "",
    birthDate: "",
    country: "",
    city: "",
    profilePictureUrl: "",
    socialMediaAccounts: {
      additionalProp1: "",
      additionalProp2: "",
      additionalProp3: "",
    },
    updatedAt: "",
  },
  users: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(postUserData.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(getUserDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDataById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserDataById.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(patchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(patchUserData.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(patchUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
