import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react'

import CustomFetch , {checkForUnauthorizedResponse} from '../../utils/axios';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialFiltersState = {
    search:'',
    searchStatus:'all',
    searchType:'all',
    sort:'latest',
    searchOptions:['latest','oldest','a-z','z-a'],
};
const initialState = {
    isLoading : false,
    jobs :[],
    totalJobs:0,
    numOfPages:1,
    page:1,
    stats:{},
    monthlyApplications:[],
    ...initialFiltersState,
};
export const getAllJobs = createAsyncThunk('allJobs/getJobs',async(_, thunkAPI) => {
    console.log(thunkAPI.getState().allJobs);
   
    const {page,search,searchStatus,searchType,sort} = thunkAPI.getState().allJobs;
    console.log(typeof page)
    const graphqlQuery = {
        query:`
        query FetchJobs($page:Int!,$search:String!,$status:String!,$type:String!,$sort:String!){
            jobs(searchJobInput:{page:$page,search:$search,status:$status,type:$type,sort:$sort}){
                jobs {
                    _id
                    position
                    company
                    jobLocation
                    jobType
                    createdBy
                    status
                    createdAt
                    updatedAt
                  }
                  numbofJobs
                  totalJobs
            }
        }
        `,variables:{
            page:parseInt(page),
            search:search,
            status:searchStatus,
            type:searchType,
            sort:sort
        }
    }
   
    /* let url = `job/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
    if(search){
        url = url + `&search=${search}`;
    } */
    try{
        // console.log(thunkAPI.getState().user.user.token);
        const resp = await CustomFetch.post('/graphql',JSON.stringify(graphqlQuery),{
            headers:{
                Authorization: 'Bearer '+ thunkAPI.getState().user.user.token,
                 'Content-Type': 'application/json',
            },
        });
        
        return resp.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})
export const showStats = createAsyncThunk('allJobs/showStats',async(_,thunkAPI) => {
   const graphqlQuery  = {
    query:`
   { stats{
        defaultStats {
            declined
            interview
            pending
          }
          monthlyApplications {
            count
            date
          }
    }}
    `
   }
    try{
        const resp = await CustomFetch.post('/graphql',JSON.stringify(graphqlQuery),{
            headers:{
                Authorization: 'Bearer '+ thunkAPI.getState().user.user.token,
                'Content-Type':'application/json',
            }
        });
        
        return resp.data;
    }catch(error)
    {
        // return thunkAPI.rejectWithValue(error.response.data.msg);
        return  checkForUnauthorizedResponse(error,thunkAPI);
    }
})
const allJobsSlice = createSlice({
    name:'alllJobs',
    initialState,
    reducers:{
        showLoading:(state) => {
            state.isLoading = true;
        },
        hideLoading :(state) => {
            state.isLoading = false;
        },
        handleChange:(state,{payload:{name,value}}) =>{
            state.page = 1;
            state[name] = value;
        },
        clearFilters:(state) => {
            return{
                ...state,...initialFiltersState
            };
        },
        changePage:(state,{payload}) =>{
            
            state.page = payload;
        },
        clearAllJobsState: () => {
            return initialState;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getAllJobs.pending,(state) => {
            state.isLoading = true;
        }).addCase(getAllJobs.fulfilled,(state,{payload}) => {
            state.isLoading = false;
            console.log(payload);
            state.jobs = payload.data.jobs.jobs;
            state.numOfPages = payload.data.jobs.numbofJobs;
            state.totalJobs = payload.data.jobs.totalJobs;
        }).addCase(getAllJobs.rejected,(state,{payload}) => {
            state.isLoading = false;
            toast.error(payload);
        }).addCase(showStats.pending,(state) => {
            state.isLoading = true;
            console.log('still loading')
        }).addCase(showStats.fulfilled,(state,{payload}) => {
            state.isLoading = false;
            state.stats = payload.data.stats.defaultStats;
            state.monthlyApplications = payload.data.stats.monthlyApplications;
        }).addCase(showStats.rejected,(state,{payload}) => {
            state.isLoading = false;
            
            toast.error(payload);
        })
    }
})
export const {showLoading,hideLoading,handleChange,clearFilters,changePage,clearAllJobsState} = allJobsSlice.actions;
export default allJobsSlice.reducer