import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Dashboard, Error, Landing, Register} from "./pages/main";
import { ToastContainer } from "react-toastify";

/* Apply job */
import ApplyJob from "./pages/dashboard/ApplyJob";
import Applications from "./pages/dashboard/Applications";
import AppliedJobs from "./pages/dashboard/AppliedJob";

import  {SharedLayout,Stats, AllJobs,AddJob, Profile } from './pages/dashboard/main';
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

 
  
  return (
   
    <BrowserRouter>

      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
                                    <SharedLayout/>
                                  </ProtectedRoute>}>
                                    
          <Route index element={<Stats/>} />
          <Route path="all-jobs" element={<AllJobs/>}/>
          <Route path="add-job" element={<AddJob/>}/>
          <Route path="profile"  element={<Profile/>}/>

          <Route path="seeking_jobs" element={<ApplyJob/>}/>
          <Route path="jobs_Applications" element={<Applications/>}/>
          <Route path="appliedApplications" element={<AppliedJobs/>}/>
        </Route>
        <Route path="landing" element={<Landing/>} />
        <Route path="register" element={<Register/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
