import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import BarCharts from './BarChart';
import AreaCharts from './AreaChart';
const ChartsContainer = () => {
    const[barChart,setBarChart] = useState(true);
    const { monthlyApplications } = useSelector((store) => store.allJobs);
    const data = monthlyApplications;
    console.log(monthlyApplications)

  return (
    <main className='chartContainer'>
        <h4>Monthly Applications</h4>
        {/* <AreaCharts data={data}/> */}
        <button type='button' onClick={() => setBarChart(!barChart)}>{barChart ? 'Area Chart' : 'BarChart'}</button>
        {barChart ?<BarCharts data={data}/>: <AreaCharts data={data}/>}
    </main>
  )
}

export default ChartsContainer