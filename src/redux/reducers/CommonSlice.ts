import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'


export const getJobType = createAsyncThunk(
    'getJobType',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/get-job-type')
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

  export const getIncharge = createAsyncThunk(
    'getIncharge',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getIncharge?'+userData)
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

  export const getAllFloor = createAsyncThunk(
    'getAllFloor',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getAllFloor')
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

  export const getAllShift = createAsyncThunk(
    'getAllShift',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getAllShift')
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

  export const addFloor = createAsyncThunk(
    'client/addFloor',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/floor/add',userData)
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

  export const updateFloor = createAsyncThunk(
    'client/updateFloor',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/common/floor/update',userData)
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

  export const getFloor = createAsyncThunk(
    'getFloor',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/floor/get?'+userData)
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

  export const removeFloor = createAsyncThunk(
    'client/removeFloor',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/floor/remove',userData)
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

  export const addShift = createAsyncThunk(
    'client/addShift',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/shift/add',userData)
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

  export const updateShift = createAsyncThunk(
    'client/updateShift',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/common/shift/update',userData)
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

  export const getShift = createAsyncThunk(
    'getShift',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/shift/get?'+userData)
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

  
  export const removeShift = createAsyncThunk(
    'client/removeShift',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/shift/remove',userData)
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

  export const addRole = createAsyncThunk(
    'addRole',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/role/add',userData)
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

  export const updateRole = createAsyncThunk(
    'updateRole',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/common/role/update',userData)
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

  export const getRole = createAsyncThunk(
    'getRole',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/role/get?'+userData)
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

  export const getAllRole = createAsyncThunk(
    'getAllRole',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getAllRole')
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

  export const addUser = createAsyncThunk(
    'addUser',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/user/add',userData)
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

  export const updateUser = createAsyncThunk(
    'updateUser',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/common/user/update',userData)
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

  export const getUser = createAsyncThunk(
    'getUser',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/user/get?'+userData)
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

  
  export const removeUser = createAsyncThunk(
    'removeUser',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/user/remove',userData)
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

  export const addUnit = createAsyncThunk(
    'addUnit',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/unit/addUnit',userData)
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

  export const updateUnit = createAsyncThunk(
    'updateUnit',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/unit/updateUnit',userData)
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

  export const getUnit = createAsyncThunk(
    'getUnit',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/unit/getUnit?'+userData)
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

  export const addMaterial = createAsyncThunk(
    'addMaterial',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/materials/addMaterial',userData)
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

  export const updateMaterial = createAsyncThunk(
    'updateMaterial',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/materials/updateMaterial',userData)
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

  export const getMaterials = createAsyncThunk(
    'getMaterials',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/materials/getMaterials?'+userData)
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


  export const addJobTypes = createAsyncThunk(
    'addJobTypes',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/jobType/job-types',userData)
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

  export const updateJobType = createAsyncThunk(
    'updateJobType',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/jobType/job-types',userData)
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

  export const getJobTypes = createAsyncThunk(
    'getJobTypes',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/jobType/job-types?'+userData)
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

  export const getAllUnit = createAsyncThunk(
    'getAllUnit',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getAllUnit')
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
  
  export const getAllMaterial = createAsyncThunk(
    'getAllMaterial',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getAllMaterial')
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

  export const addJobTypeMaterial = createAsyncThunk(
    'addJobTypeMaterial',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/addJobTypeMaterial',userData)
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

  export const updateJobTypeMaterial = createAsyncThunk(
    'updateJobTypeMaterial',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/common/updateJobTypeMaterial',userData)
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

  export const getJobTypeMaterial = createAsyncThunk(
    'getJobTypeMaterial',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getJobTypeMaterial?'+userData)
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

  export const addInventory = createAsyncThunk(
    'addInventory',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.post('/common/addInventory',userData)
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

  export const updateInventory = createAsyncThunk(
    'updateInventory',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.put('/common/updateInventory',userData)
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

  export const getInventory = createAsyncThunk(
    'getInventory',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getInventory?'+userData)
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

  export const getJobTypeMaterialList = createAsyncThunk(
    'getJobTypeMaterialList',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getJobTypeMaterialList?'+userData)
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

  export const getJobTypeMaterialDataList = createAsyncThunk(
    'getJobTypeMaterialDataList',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getJobTypeMaterialDataList?'+userData)
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

  export const getAllClient = createAsyncThunk(
    'getAllClient',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getAllClient')
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

  export const getDashboardJob = createAsyncThunk(
    'getDashboardJob',
    async (userData:any,{ rejectWithValue }) => {
      try{
        let response = await api.get('/common/getDashboardJob?'+userData)
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

  
  

  
const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isLoading : false,
    getJobType : [],
    inchargeList : [],
    floorList : [],
    shiftList : [],
    count : 0,
    floor : [],
    floorCount :0,
    shift : [],
    shiftCount :0,
    role : [],
    allRole : [],
    roleCount :0,
    user : [],
    userCount :0,
    unit : [],
    unitCount :0,
    materials : [],
    materialsCount : 0,
    jobType : [],
    unitList : [],
    materialList : [],
    jobTypeCount : 0,
    jobTypeMaterial : [],
    jobTypeMaterialCount : 0,
    inventory : [],
    jobTypeMaterialList : [],
    jobTypeMaterialDataList : [],
    clientList : [],
    inventoryCount :0,
    dashboardJob : [],
    dashboardJobCount : 0,
    message : {}
  },
  reducers : {
    addMessage: (state,action) => {
      state.message = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getJobType.fulfilled, (state, action) => {
        state.getJobType = action.payload.data.job;
        state.isLoading = false; 
    }).addCase(getIncharge.fulfilled, (state, action) => {
      state.inchargeList = action.payload.data;
      state.isLoading = false; 
    }).addCase(getAllFloor.fulfilled, (state, action) => {
      state.floorList = action.payload.data;
      state.isLoading = false; 
    }).addCase(getAllShift.fulfilled, (state, action) => {
      state.shiftList = action.payload.data;
      state.isLoading = false; 
    }).addCase(getFloor.fulfilled, (state, action) => {
      state.floor = action.payload.data.floor;
      state.floorCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getShift.fulfilled, (state, action) => {
      state.shift = action.payload.data.shift;
      state.shiftCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getRole.fulfilled, (state, action) => {
      state.shift = action.payload.data.role;
      state.shiftCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getAllRole.fulfilled, (state, action) => {
      state.allRole = action.payload.data;
      state.isLoading = false; 
    }).addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.userCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getUnit.fulfilled, (state, action) => {
      state.unit = action.payload.data.units;
      state.unitCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getMaterials.fulfilled, (state, action) => {
      state.materials = action.payload.data.materials;
      state.materialsCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getJobTypes.fulfilled, (state, action) => {
      state.jobType = action.payload.data.job;
      state.jobTypeCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getAllUnit.fulfilled, (state, action) => {
      state.unitList = action.payload.data;
      state.isLoading = false; 
    }).addCase(getAllMaterial.fulfilled, (state, action) => {
      state.materialList = action.payload.data;
      state.isLoading = false; 
    }).addCase(getJobTypeMaterial.fulfilled, (state, action) => {
      state.jobTypeMaterial = action.payload.data.result;
      state.jobTypeMaterialCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getInventory.fulfilled, (state, action) => {
      state.inventory = action.payload.data.inventory;
      state.inventoryCount = action.payload.data.count;
      state.isLoading = false; 
    }).addCase(getJobTypeMaterialList.fulfilled, (state, action) => {
      state.jobTypeMaterialList = action.payload.data;
      state.isLoading = false; 
    }).addCase(getJobTypeMaterialDataList.fulfilled, (state, action) => {
      state.jobTypeMaterialDataList = action.payload.data;
      state.isLoading = false; 
    }).addCase(getAllClient.fulfilled, (state, action) => {
      state.clientList = action.payload.data;
      state.isLoading = false; 
    }).addCase(getDashboardJob.fulfilled, (state, action) => {
      state.dashboardJob = action.payload.data.dashboardJob;
      state.dashboardJobCount = action.payload.data.count;
      state.isLoading = false; 
    })

    
   
    
  },
  
});

export const { addMessage } = commonSlice.actions
export default commonSlice.reducer;