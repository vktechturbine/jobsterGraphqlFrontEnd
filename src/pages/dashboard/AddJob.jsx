import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import { toast } from "react-toastify";
import {
  clearValues,
  handleChange,
  createJob,
  editJob
} from "../../features/job/JobSlice";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOption,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const {user} = useSelector((store) => store.user);

  const dispatch = useDispatch();


  
  useEffect(() => {
    
    // console.log(isEditing);
    if(!isEditing)
    {
      dispatch(handleChange({name:'jobLocation',value:user.location}))
    }
  },[]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if(isEditing)
    {
      console.log(editJobId);
      
      dispatch(editJob({
        jobId:editJobId,
        job:{
          position,
          company,
          jobLocation,
          jobType,
          status,
        },
      })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  return (
    <main className="dashboardFormPage">
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <FormRowSelect
            name="jobType"
            labelText="job Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOption}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AddJob;
