
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllData ,apply_Job} from '../../features/allJobs/applyjobSlice';
// import { apply_Job } from '../../features/allJobs/applyjobSlice';
// import {JobsContainer} from '../../components/JobsContainer'
const ApplyJob = () => {


    // const [datas,setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllData())
    }, [])

    const data = useSelector((state) => {
        // console.log(state)
        // setData(state.applyJob.jobs.jobs)
        // return state.applyJob;
        return state.applyJob.jobs.jobs;
        // console.log();

    });


    return (

        <div className='mainContainerapp'>
            {/* <h1>Hello</h1>
            <button onClick={() => dispatch(getAllData())}>get User</button> */}
            { data?.map((job) => (
                <div className='applyjob'>
                <div className='firstHead'>
                    <div className='iconhead'>P</div>
                    <div className='h1head'><h1>{job.position}</h1></div>
                </div>
                <hr />
                <div className='secondHead'>
                    <div className='content1'>
                        <div className='icon1'><img src='https://cdn-icons-png.flaticon.com/128/2776/2776067.png' /></div>
                        <div className='head1'><h3>{job.jobLocation}</h3></div>
                    </div>
                    <div className='content1'>
                        <div className='icon1'><img src='https://cdn-icons-png.flaticon.com/128/3054/3054457.png' /></div>
                        <div className='head1'><h3>{job.createdAt.slice(0,10)}</h3></div>
                    </div>
                    <div className='content1'>
                        <div className='icon1'><img src='https://cdn-icons-png.flaticon.com/128/5776/5776871.png' /></div>
                        <div className='head1'><h3>{job.jobType}</h3></div>
                    </div>
                </div>
                <button className='btn' onClick={() => dispatch(apply_Job(job))}>ApplyJob</button>
            </div>

            )) }
            



        </div>

    )
}

export default ApplyJob;