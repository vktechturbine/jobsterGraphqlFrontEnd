import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { applications, selection_status } from '../../features/allJobs/applications';
// import { apply_Job } from '../../features/allJobs/applyjobSlice';
// import {JobsContainer} from '../../components/JobsContainer'
const Applications = () => {


    // const [datas,setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(applications())
       
    }, [])

    const data = useSelector((state) => {

        // setData(state.applyJob.jobs.jobs)
        // return state.applyJob;
        console.log(state);
        return state.applications.jobapplications;

    });


    console.log(data);
    /*    console.log(data?.map(dats => {
           console.log(dats.userName)
       }));  */

    const handleOptionChange = (e, userId, jobId) => {
        const jobSelectionStatus = {
            selectionRequest: e,
            userID: userId,
            jobID: jobId
        }
        dispatch(selection_status(jobSelectionStatus));
    };
    return (
        <table className='table'>
            <thead className='thead-dark'>
                <tr>
                    <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Candidate Name</th>
                    <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Candidate Email</th>
                    <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Candidate Location</th>
                    <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Job Position</th>
                    <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Job Location</th>
                    <th style={{ textAlign: "center", background: "#3d89f8" }} scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {data?.map(dats => (
                    <tr>
                        <td style={{ textAlign: "center" }}>{dats.userName}</td>
                        <td style={{ textAlign: "center" }}>{dats.userEmail}</td>
                        <td style={{ textAlign: "center" }}>{dats.userLocation}</td>
                        <td style={{ textAlign: "center" }}>{dats.jobPosition}</td>
                        <td style={{ textAlign: "center" }}>{dats.jobLocation}</td>
                        <td style={{ textAlign: "center" }}>
                            <select className="form-select form-select-sm mb-1" aria-label=".form-select-lg example" onChange={(e) => handleOptionChange(e.target.value, dats.userId, dats.jobId)}>
                                <option selected={dats.jobStatus === "Selected"} value={"Selected"}>Selected</option>
                                <option selected={dats.jobStatus === "Pending"} value={"Pending"}>Pending</option>
                                <option selected={dats.jobStatus === "Rejected"} value={"Rejected"}  >Rejected</option>
                               {/*  <option value="Selected">Selected</option>
                                <option value="Rejected">Rejected</option> */}
                            </select>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Applications;