import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 
import { createSlice } from '@reduxjs/toolkit';
const BASE_URL = 'https://yalli-back-end.onrender.com/v1/files';
const initialState={
  file:null,
  status:"idle",
  error:null
}

export const uploadImageFIle=createAsyncThunk(
  "files/uploadImage",
  async (file,{rejectWithValue})=>{
    const formData=new FormData();
    formData.append("file",file);
    try{
      const response=await axios.post(`${BASE_URL}/upload`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      
      return response.data
    }catch(error){
      return rejectWithValue(error.response.data)
    }
  }
) 

export const getImageFile = createAsyncThunk(
  "files/getImage",
  async (filename, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${filename}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const fileSlice=createSlice({
  name:"file",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(uploadImageFIle.pending,(state)=>{
      state.status="loading"
    })
    .addCase(uploadImageFIle.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.file = action.payload;  // Faylın Redux store-da saxlandığı yer
    })
    .addCase(uploadImageFIle.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(getImageFile.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getImageFile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.file = action.payload;
    })
    .addCase(getImageFile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  }
})

export default fileSlice.reducer