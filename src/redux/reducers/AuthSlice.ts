import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'


interface CreateUserArgs {
  firstName:string,
  lastName:string,
  email: string;
  password: string;
}

interface AsyncThunkConfig {
  rejectValue: any;
}

export const createUser = createAsyncThunk<any, CreateUserArgs, AsyncThunkConfig>(
  'auth/register',
  async (userData,{ rejectWithValue }) => {
    try{
      let response = await api.post('/auth/register',userData)
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

export const login = createAsyncThunk(
  'users/login',
  async (userData:any,{ rejectWithValue }) => {
    try{
      let response = await api.post('/auth/login',userData)
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

export const logout = createAsyncThunk(
  'users/logout',
  async (userData,{ dispatch, rejectWithValue }) => {
    try{
      let response = await api.post('/auth/logout',userData)
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

export const verifyToken = createAsyncThunk(
  'users/verify',
  async (token,{ dispatch, rejectWithValue }) => {
    try{
      let response = await api.get('/auth/verify-token')
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading : false,
    user : {},
    message : {}
  },
  reducers : {
    addMessage: (state,action) => {
      state.message = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false; 
    }).addCase(createUser.rejected, (state, action) => {
      state.isLoading = false; 
    }).addCase(createUser.pending, (state, action) => {
      state.isLoading = true; 
    }).addCase(verifyToken.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.isLoading = false;
    }).addCase(logout.fulfilled, (state, action) => {
      state.user = {};
      state.isLoading = false; 
    });
    
    ;
  },

});

export const { addMessage } = authSlice.actions
export default authSlice.reducer;