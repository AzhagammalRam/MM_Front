import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'


export const addMaterialInward = createAsyncThunk(
  'material/add',
  async (userData:any,{ rejectWithValue }) => {
    try{
      let response = await api.post('/materialInward/add',userData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
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

export const editMaterialInwardr = createAsyncThunk(
    'material/edit',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/materialInward/edit',userData)
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

  export const removeMaterialInward = createAsyncThunk(
    'material/remove',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/materialInward/remove',userData)
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

  
export const getMaterialInward = createAsyncThunk(
    'materialInward/get',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/materialInward/get?'+userData)
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

  export const getJobs = createAsyncThunk(
    'materialInward/getJobs',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/materialInward/jobs?'+userData)
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

  export const getProduction = createAsyncThunk(
    'materialInward/getProduction',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/materialInward/getProduction?'+userData)
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

  
  export const assignJob = createAsyncThunk(
    'materialInward/assignJob',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/materialInward/assignJob',userData)
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

  export const assignFiling = createAsyncThunk(
    'materialInward/assignFiling',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/materialInward/assignFiling',userData)
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

  export const forwardJob = createAsyncThunk(
    'materialInward/forwardJob',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/materialInward/forwardJob',userData)
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
  
  export const getFiling = createAsyncThunk(
    'materialInward/getFiling',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/materialInward/getFiling?'+userData)
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

  export const toDispatch = createAsyncThunk(
    'materialInward/toDispatch',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/materialInward/toDispatch',userData)
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

  export const forwardFiling = createAsyncThunk(
    'materialInward/forwardFiling',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/materialInward/forwardFiling',userData)
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

  export const getDispatch = createAsyncThunk(
    'materialInward/getDispatch',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/materialInward/getDispatch')
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

  export const getDashboard = createAsyncThunk(
    'materialInward/getDashboard',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/materialInward/getDashboard')
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

  export const getCleaning = createAsyncThunk(
    'materialInward/getCleaning',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/materialInward/getCleaning')
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

  export const updateCeaning = createAsyncThunk(
    'materialInward/updateCeaning',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/materialInward/updateCeaning',userData)
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

  export const updateDispatch = createAsyncThunk(
    'materialInward/updateDispatch',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/materialInward/updateDispatch',userData)
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

  export const updateProduction = createAsyncThunk(
    'materialInward/updateProduction',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/materialInward/updateProduction',userData)
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


const materialSlice = createSlice({
  name: 'material',
  initialState: {
    isLoading : false,
    materialInward : [],
    jobs : [],
    production : [],
    filing : [],
    dispatch : [],
    cleaning : [],
    dashboardDetails : {},
    count : 0,
    jobsCount : 0,
    productionCount : 0,
    filingCount : 0,
    dispatchCount : 0,
    cleaningCount : 0,
    message : {}
  },
  reducers : {
    addMessage: (state,action) => {
      state.message = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(addMaterialInward.fulfilled, (state, action) => {
      state.isLoading = false; 
    }).addCase(getMaterialInward.fulfilled, (state, action) => {
        state.materialInward = action.payload.data.materialInward;
        state.count = action.payload.data.count;
        state.isLoading = false; 
    }).addCase(editMaterialInwardr.fulfilled, (state, action) => {
        state.isLoading = false; 
    }).addCase(removeMaterialInward.fulfilled, (state, action) => {
        state.isLoading = false; 
    }).addCase(getJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.data.jobs;
      state.jobsCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getProduction.fulfilled, (state, action) => {
      state.production = action.payload.data.production;
      state.productionCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getFiling.fulfilled, (state, action) => {
      state.filing = action.payload.data.filing;
      state.filingCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getDispatch.fulfilled, (state, action) => {
      state.dispatch = action.payload.data.dispatch;
      state.dispatchCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getDashboard.fulfilled, (state, action) => {
      state.dashboardDetails = action.payload.data;
      state.isLoading = false; 
    }).addCase(getCleaning.fulfilled, (state, action) => {
      state.cleaning = action.payload.data.cleaning;
      state.cleaningCount = action.payload.data.count;
      state.isLoading = false; 
    })
    
  },  

});

export const { addMessage } = materialSlice.actions
export default materialSlice.reducer;