import React from 'react'
import {SearchContainer} from '../../components/SearchContainer';
import { JobsContainer } from '../../components/JobsContainer';

// import {JobsContainer} from '../../components/JobsContainer'
const AllJobs = () => {
  return (
    <>
      <SearchContainer/>
      <JobsContainer/>
    </>
  )
}

export default AllJobs