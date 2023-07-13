import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    appliedjobapplications: [],
    loading: false,
    error: null,
};

export const appliedApplications = createAsyncThunk('applications', async (_, thunkAPI) => {
    console.log(thunkAPI.getState().user.user.token)
    const graphqlQuery = {
        query:`
            {
                appliedJobs {
                    userAppliedJobs {
                      company
                      jobStatus
                      jobType
                      location
                      position
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
    console.log(result)
    return result;
})

export const AddApppliedJobs = createSlice({
    name: 'appliedApplications',
    initialState,
    extraReducers: {
        [appliedApplications.pending]: (state) => {
            state.loading = true;
        },
        [appliedApplications.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.appliedjobapplications = action.payload.data?.appliedJobs?.userAppliedJobs;
            state.loading = false;
        },
        [appliedApplications.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        },
       
    }
})

export default AddApppliedJobs.reducer;