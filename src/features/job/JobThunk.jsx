// import { useDispatch } from "react-redux";
import CustomFetch from "../../utils/axios"
import { clearValues } from "./JobSlice";
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice'

const authHeader = (thunkAPI) => {
  console.log(thunkAPI.getState().user.user.token)
    return {
      headers: {
        Authorization: 'Bearer '+ thunkAPI.getState().user.user.token,
      },
    };
  };

  
export const createJobThunk = async(job,thunkAPI) => {
 
  const graphqlQuery = {
    query:`
      mutation{
        createJob(jobInput: {company: "${job.company}",jobLocation:"${job.jobLocation}",jobType: "${job.jobType}",position: "${job.position}",status:"${job.status}"}) {
          company
          position
          _id
          status
          updatedAt
          jobLocation
          jobType
          createdBy
          createdAt
        }
      }
    `
  }
    try{
        const resp = await CustomFetch.post('/graphql',JSON.stringify(graphqlQuery),{
          headers:{
            Authorization: 'Bearer ' + thunkAPI.getState().user.user.token,
            'Content-Type':'application/json',
          },

        });
        thunkAPI.dispatch(clearValues());
        return resp.data;
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

export const deleteJobThunk = async(jobId,thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    const graphqlQuery = {
      query:`
        mutation{
          deleteJobRequest(deleteJobInput:{jobId:"${jobId}"}){
            message
          }
        }
      `
    }
    try{
      const resp = await CustomFetch.post('/graphql',JSON.stringify(graphqlQuery),{
        headers:{
          Authorization: 'Bearer ' + thunkAPI.getState().user.user.token,
          'Content-Type':'application/json',
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return resp.data;
    }catch(error){
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  };
  export const editJobThunk = async({jobId,job},thunkAPI)=>{
    console.log(job)
    const graphqlQuery = {
      query:`
        
          mutation{
            updateJobRequest(jobId:"${jobId}",updateJobInput:{position:"${job.position}",company:"${job.company}",jobLocation:"${job.jobLocation}",jobType:"${job.jobType}",status:"${job.status}"}){
              message
            }
          }
        
      `
    }
    try{
      console.log(thunkAPI)
      const resp = await CustomFetch.post('/graphql', JSON.stringify(graphqlQuery),{
        headers: {
          Authorization: 'Bearer '+ thunkAPI.getState().user.user.token,
          'Content-Type':'application/json'
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    }catch(error)
    {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    } 
  }