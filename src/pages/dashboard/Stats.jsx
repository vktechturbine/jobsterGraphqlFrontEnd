import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showStats } from '../../features/allJobs/allJobsSlice';
import Loading from '../../components/Loading';
import StatsContainer from '../../components/StatsContainer';
import ChartsContainer from '../../components/ChartsContainer';

const Stats = () => {
  const {isLoading,monthlyApplications} = useSelector((store) => store.allJobs);
  console.log(monthlyApplications)
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(showStats());
  },[]);
  if(isLoading){
    return <Loading center />
  }
  return(
    <>
      <StatsContainer />
      <ChartsContainer />
    </>
  );
}

export default Stats;