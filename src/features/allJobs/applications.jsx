import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    jobapplications: [],
    loading: false,
    error: null,
};

export const applications = createAsyncThunk('applications', async (_, thunkAPI) => {
    console.log(thunkAPI.getState().user.user.token)
    const graphqlQuery = {
        query:`
            {
                showAnotheruserApplication {
                    applicationOtherUser {
                      userName
                      userEmail
                      userLocation
                      jobPosition
                      jobLocation
                      jobStatus
                      userId
                      jobId
                    }
                  }
            }
        `
    }
    const response = await fetch('https://jobsterbackend-ozel.onrender.com/graphql',{
    method:'POST',
    body:JSON.stringify(graphqlQuery), 
    headers: {
            Authorization: 'Bearer ' + thunkAPI.getState().user.user.token,
            "Content-Type":"application/json"
        },
    });
    const result = await response.json();
    console.log(result.data.showAnotheruserApplication.applicationOtherUser)
    return result;
})
export const selection_status = createAsyncThunk('selection_status',async(job,thunkAPI) => {
  
   console.log(job)
   const graphqlQuery = {
    query:`
        mutation{
            applicationRequest(applicationRequestInput:{jobId:"${job.jobID}",selectionRequestId:"${job.selectionRequest}",userId:"${job.userID}"}){
                message
            }
        }
    `
   }
     const response = await fetch('https://jobsterbackend-ozel.onrender.com/graphql',{
        method:'POST',
        body:JSON.stringify(graphqlQuery),
        headers:{
            Authorization: 'Bearer ' + thunkAPI.getState().user.user.token,
            "Content-Type":"application/json"
        }
    })
    const result = response.json();
    return result;
    
}) 

export const Addapplication = createSlice({
    name: 'applyjobsS',
    initialState,
    extraReducers: {
        [applications.pending]: (state) => {
            state.loading = true;
        },
        [applications.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.jobapplications = action.payload.data?.showAnotheruserApplication?.applicationOtherUser;
            state.loading = false;
           
            
        },
        [applications.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        },
        [selection_status.pending]: (state) => {
            state.loading = true;
        },
        [selection_status.fulfilled]: (state, action) => {
            state.loading = false;
            // state.jobs = action.payload;
            // console.log(action.payload);
            toast.success(action.payload?.data?.applicationRequest?.message);
        },
        [selection_status.rejected]: (state, action) => {
            state.loading = true;
            toast.error('not applied');
            // state.error = action.payload;
        }
       
    }
})

export default Addapplication.reducer;