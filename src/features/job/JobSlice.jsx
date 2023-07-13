import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { flushSync } from "react-dom";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
// import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { createJobThunk, deleteJobThunk, editJobThunk } from './JobThunk.jsx';
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOption: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};
export const createJob = createAsyncThunk("job/createJob",createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob',deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob',editJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      // getUserFromLocalStorage();
      // console.log();
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob:(state,{payload}) => {
      return {...state,isEditing:true,...payload};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        toast.error(payload);
      }).addCase(deleteJob.pending,(state) => {
        state.isLoading = true;
      }).addCase(deleteJob.fulfilled,(state,action) => {
        state.isLoading = false;
        toast.success(action.payload.data.deleteJobRequest.message);
      }).addCase(deleteJob.rejected,(state,{payload}) => {
        state.isLoading = false;
        toast.error(payload);
      }).addCase(editJob.pending,(state) => {
        state.isLoading = true;
      }).addCase(editJob.fulfilled,(state,action) => {
        state.isLoading = false;
        toast.success(action.payload.data.updateJobRequest.message);
      }).addCase(editJob.rejected,(state,{payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
  },
});
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
