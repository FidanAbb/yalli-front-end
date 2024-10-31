// import { createContext, useContext, useEffect, useState } from "react";
// import { createSlice, createAsyncThunk, configureStore, combineReducers } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// const initialState: {
//   user: any,
//   error: string | undefined,
//   loaded: boolean
// } = {
//   user: {},
//   error: undefined,
//   loaded: false,
// };

// const fetchUser = createAsyncThunk("users/fetchUser", async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

//   if (!response.ok) {
//     throw new Error("some error happened");
//   }

//   return response.json();
// });

// const updateUser = createAsyncThunk('users/updateUser', async (payload) => {
//     const [ userId, name] = payload;
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/" + userId, {
//     method: "PUT",
//     headers: {
//       'Content-Type': "application/json"
//     },
//     body: JSON.stringify({
//       name
//     })
//   });

//   if (!response.ok) {
//     throw new Error("some error happened");
//   }

//   return response.json();
// })

// const userSlice = createSlice({
//   initialState,
//   name: "users",
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchUser.pending, (state) => {
//       state.loaded = false;
//     });

//     builder.addCase(fetchUser.rejected, (state, action) => {
//       state.loaded = true;
//       state.error = action.error.message;
//     });

//     builder.addCase(fetchUser.fulfilled, (state, action) => {
//       state.loaded = true;
//       state.user = action.payload;
//     });

//     builder.addCase(updateUser.pending, (state) => {
//       state.loaded = false;
//     });

//     builder.addCase(updateUser.rejected, (state, action) => {
//       state.loaded = true;
//       state.error = action.error.message;
//     });

//     builder.addCase(updateUser.fulfilled, (state, action) => {
//       state.loaded = true;
//       state.user = action.payload;
//     });
    
//   },
// });

// const reducer = combineReducers({
//   user: userSlice.reducer,
// });

// const store = configureStore({
//   reducer,
// });

// export type RootState = ReturnType<typeof store.getState>

// function useUser() {
//   const [] 
//   dispatch(fetchUser())
//   const { error, loaded, user } = useSelector((store: RootState) => store.user);
//   return { error, loaded, user };
// }

// function MainComponent() {
//   const []
//   const { error, loaded, user } = useUser();

//   if (!loaded) {
//     return <>Loading</>;
//   }
//   if (error) {
//     return <>{error}</>;
//   }

//   return <>{user.id}
//     <button onClick={
//       () => {
//         updateUser
//       }
//     }></button>
//   </>;
// }
