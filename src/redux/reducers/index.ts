import authSlice  from "./AuthSlice";
import ClientSlice from "./ClientSlice"
import materialSlice from "./materialSlice";
import commonSlice from "./CommonSlice";

import { combineReducers } from 'redux';

const rootReducer = {
  auth : authSlice,
  client : ClientSlice,
  clientMaterial : materialSlice,
  common : commonSlice,
};

export default combineReducers(rootReducer);
  