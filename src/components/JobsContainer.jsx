import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';


import Job from '../components/Job';
import PageBtnContainer from './PageBtnContainer';
export const JobsContainer = () => {
    const {jobs, isLoading,page,totalJobs,numOfPages,search,searchStatus,searchType,sort} = useSelector((store) => store.allJobs);
    
    //   console.log(pages)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllJobs());
    },[page,search,searchStatus,searchType,sort])
    if(isLoading)
    {
        return(
            <main className='jobsContainer'>
               <Loading center/>
            </main>
        )
    }
    if(jobs.length === 0)
    {
        return(
            <main className='jobsContainer'>
                <h2>No jobs to display...</h2>
            </main>
        );
    }
  return (
    <main className='jobsContainer'>
        <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
        <div className='jobs'>
            {jobs.map((job) =>{
                return <Job key={job._id}{...job}/>
            })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
    </main>
  )
}

