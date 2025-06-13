import React,{ lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Loadable from './components/Loadable'
// const Login = Loadable(lazy(() => import('./pages/Login')));
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import MaterialInward from './pages/MaterialInward'
import AddAndEditClient from './pages/client/AddAndEditClient'
import Client from './pages/client/Client'
import AddOrEditMaterialInward from './pages/MaterialInward/AddOrEditMaterialInward'
import ProtectedRoute from './utils/ProtectedRoute'
import Jobs from './pages/Jobs'
import AssignJob from './pages/Jobs/AssignJob';
import JobProduction from './pages/JobProduction'
import ProductionProcess from './pages/JobProduction/ProductionProcess'
import JobFiling from './pages/JobFiling'
import FilingProcess from './pages/JobFiling/FilingProcess'
import JobDispatch from './pages/JobDispatch'
import DispatchProcess from './pages/JobDispatch/DispatchProcess'
import Floor from './pages/Floor'
import AddOrEditFloor from './pages/Floor/AddAndEdit'
import Shift from './pages/Shift'
import AddOrEditShift from './pages/Shift/AddAndEdit'
import Role from './pages/Role'
import AddOrEditRole from './pages/Role/AddAndEdit'
import User from './pages/User'
import AddOrEditUser from './pages/User/AddAndEdit'
import Unit from './pages/Units'
import AddOrEditUnit from './pages/Units/AddAndEdit'
import JobType from './pages/jobType'
import AddOrEditJobType from './pages/jobType/AddAndEdit'
import Material from './pages/Material'
import AddOrEditMaterial from './pages/Material/AddAndEdit'
import JobTypeMaterial from './pages/JobTypeMaterial'
import AddOrEditJobTypeMaterial from './pages/JobTypeMaterial/AddAndEdit'
import Inventory from './pages/Inventory'
import AddorEditInventory from './pages/Inventory/AddAndEdit'
import Cleaning from './pages/Cleaning'
import UpdateCleaning from './pages/Cleaning/UpdateCleaning'

import './App.css';


function App(): React.ReactElement {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
             <Route path="login" element={<Login/>} />
             <Route path="/" element={<Login/>} />
             <Route path="register" element={<Register/>} />
             <Route path="logout" element={<Logout/>} />
             <Route element={<ProtectedRoute />}>
                {/* <Route path="/home" element={<Home/>} /> */}
                <Route path="home" element={<Home/>} />
                <Route path="client" element={<Client/>} />
                <Route path="addClient" element={<AddAndEditClient/>} />
                <Route path="editClient" element={<AddAndEditClient/>} />
                <Route path="material_inward" element={<MaterialInward/>} />
                <Route path="add_material_inward" element={<AddOrEditMaterialInward/>} />
                <Route path="edit_material_inward" element={<AddOrEditMaterialInward/>} />
                <Route path="jobs" element={<Jobs/>} />
                <Route path="assign-job" element={<AssignJob/>} />
                <Route path="production_details" element={<JobProduction/>} />
                <Route path="production" element={<ProductionProcess/>} />
                <Route path="filing_details" element={<JobFiling/>} />
                <Route path="filing" element={<FilingProcess/>} />
                <Route path="dispatch_details" element={<JobDispatch/>} />
                <Route path="dispatch" element={<DispatchProcess/>} />
                <Route path="dispatch" element={<DispatchProcess/>} />
                <Route path="floor" element={<Floor/>} />
                <Route path="addFloor" element={<AddOrEditFloor/>} />
                <Route path="editFloor" element={<AddOrEditFloor/>} />
                <Route path="role" element={<Role/>} />
                <Route path="addRole" element={<AddOrEditRole/>} />
                <Route path="editRole" element={<AddOrEditRole/>} />
                <Route path="shift" element={<Shift/>} />
                <Route path="addShift" element={<AddOrEditShift/>} />
                <Route path="editShift" element={<AddOrEditShift/>} />
                <Route path="user" element={<User/>} />
                <Route path="addUser" element={<AddOrEditUser/>} />
                <Route path="editUser" element={<AddOrEditUser/>} />
                <Route path="unit" element={<Unit/>} />
                <Route path="addUnit" element={<AddOrEditUnit/>} />
                <Route path="editUnit" element={<AddOrEditUnit/>} />
                <Route path="jobType" element={<JobType/>} />
                <Route path="addJobType" element={<AddOrEditJobType/>} />
                <Route path="editJobType" element={<AddOrEditJobType/>} />
                <Route path="material" element={<Material/>} />
                <Route path="addMaterial" element={<AddOrEditMaterial/>} />
                <Route path="editMaterial" element={<AddOrEditMaterial/>} />
                <Route path="jobtype_material" element={<JobTypeMaterial/>} />
                <Route path="addJobTypeMaterial" element={<AddOrEditJobTypeMaterial/>} />
                <Route path="editJobTypeMaterial" element={<AddOrEditJobTypeMaterial/>} /> 
                <Route path="inventory" element={<Inventory/>} />
                <Route path="addInventory" element={<AddorEditInventory/>} />
                <Route path="editInventory" element={<AddorEditInventory/>} /> 
                <Route path="Cleaning" element={<Cleaning/>} />
                <Route path="updateCleaning" element={<UpdateCleaning/>} />
             </Route>
             
             <Route path="*" element={<NotFound/>} />
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
