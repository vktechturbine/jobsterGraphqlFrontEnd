import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    jobs: [],
    loading: false,
    error: null,
};
export const getAllData = createAsyncThunk('applyAlljobs', async (_, thunkAPI) => {
    console.log(thunkAPI.getState().user.user.token)
    const graphqlQuery = {
        query:`
        {
            seekingJob {
              jobs {
                _id
                position
                company
                jobType
                jobLocation
                status
                createdBy
                createdAt
                updatedAt
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
    
    return result;
})
export const apply_Job = createAsyncThunk('appliedjob',async(job,thunkAPI) => {
    console.log(job);
    const graphqlQuery = {
        query:`
            mutation{
                aplyjobRequest(requestInput:{jobId:"${job._id}",jobOwner:"${job.createdBy}"})
                {
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
export const Applyjobs = createSlice({
    name: 'applyjobs',
    initialState,
    extraReducers: {
        [getAllData.pending]: (state) => {
            state.loading = true;
        },
        [getAllData.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action.payload.data.seekingJob.jobs)
            state.jobs = action.payload.data.seekingJob;
        },
        [getAllData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        },
        [apply_Job.pending]: (state) => {
            state.loading = true;
        },
        [apply_Job.fulfilled]: (state, action) => {
            state.loading = false;
            // state.jobs = action.payload;
            // console.log(action.payload);
            toast.success(action.payload.data.aplyjobRequest.message);
        },
        [apply_Job.rejected]: (state, action) => {
            state.loading = true;
            toast.error('not applied');
            // state.error = action.payload;
        }
    }
})

export default Applyjobs.reducer;