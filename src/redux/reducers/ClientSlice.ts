import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'


export const addSupplier = createAsyncThunk(
  'client/addClient',
  async (userData:any,{ rejectWithValue }) => {
    try{
      let response = await api.post('/client/addClient',userData)
      return response.data; 
    }catch(error:any){
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: 'Network error' });
      }
    }  
  }
)

export const editSupplier = createAsyncThunk(
    'client/editClient',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/client/editClient',userData)
        return response.data; 
      }catch(error:any){
        if (error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: 'Network error' });
        }
      }  
    }
  )

  export const removeSupplier = createAsyncThunk(
    'client/removeClient',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/client/removeClient',userData)
        return response.data; 
      }catch(error:any){
        if (error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: 'Network error' });
        }
      }  
    }
  )


export const getSupplier = createAsyncThunk(
    'client/getClient',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/client/getClient?'+userData)
        return response.data; 
      }catch(error:any){
        if (error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: 'Network error' });
        }
      }  
    }
  )

  export const getAllSupplier = createAsyncThunk(
    'client/getAllClient',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/client/getAllClient')
        return response.data; 
      }catch(error:any){
        if (error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: 'Network error' });
        }
      }  
    }
  )



const clientSlice = createSlice({
  name: 'supplier',
  initialState: {
    isLoading : false,
    supplier : [],
    allSupplier : [],
    count : 0,
    message : {}
  },
  reducers : {
    addMessage: (state,action) => {
      state.message = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(addSupplier.fulfilled, (state, action) => {
      state.isLoading = false; 
    }).addCase(addSupplier.rejected, (state, action) => {
      state.isLoading = false; 
    }).addCase(addSupplier.pending, (state, action) => {
      state.isLoading = true; 
    }).addCase(getSupplier.fulfilled, (state, action) => {
        state.supplier = action.payload.data.client;
        state.count = action.payload.data.count;
        state.isLoading = false; 
    }).addCase(editSupplier.fulfilled, (state, action) => {
        state.isLoading = false; 
    }).addCase(removeSupplier.fulfilled, (state, action) => {
        state.isLoading = false; 
    }).addCase(getAllSupplier.fulfilled, (state, action) => {
       state.allSupplier = action.payload.data.client
       state.isLoading = false; 
    }) 
    
  },

});

export const { addMessage } = clientSlice.actions
export default clientSlice.reducer;