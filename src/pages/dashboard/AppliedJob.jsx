
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { appliedApplications } from '../../features/allJobs/appliedapplications';
// import { apply_Job } from '../../features/allJobs/applyjobSlice';
// import {JobsContainer} from '../../components/JobsContainer'
const AppliedJobs = () => {


    // const [datas,setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appliedApplications())
        const fetchData = async () => {
            
            dispatch(appliedApplications())
        }
        fetchData();
        window.addEventListener('onload', fetchData); 
        // return () => {
        //     window.removeEventListener('beforeunload', fetchData); // Clean up the event listener when the component unmounts
        //   };
    }, [])

    const data = useSelector((state) => {

       
        console.log(state.appliedApplication.appliedjobapplications);
        return state.appliedApplication.appliedjobapplications;

    });

    console.log(data)

    /*    console.log(data?.map(dats => {
           console.log(dats.userName)
       }));  */


    return (
        <table className='table'>
        <thead className='thead-dark'>
            <tr>
                <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Position</th>
                <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Company</th>
                <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Location</th>
                <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Job Type</th>
                <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Job status</th>
            </tr>
        </thead>
        <tbody>
            {data?.map(dats => (
                <tr>
                    <td style={{ textAlign: "center" }}>{dats.position}</td>
                    <td style={{ textAlign: "center" }}>{dats.company}</td>
                    <td style={{ textAlign: "center" }}>{dats.location}</td>
                    <td style={{ textAlign: "center" }}>{dats.jobType}</td>
                    <td style={{ textAlign: "center" }}>{dats.jobStatus}</td>
                    
                </tr>
            ))}
        </tbody>
    </table>
    )
}

export default AppliedJobs;