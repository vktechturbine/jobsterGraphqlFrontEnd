import React from 'react'

const JobInfo = ({icon,text}) => {
  return (
    <main className='jobInfos'>
        <span className='icon'>{icon}</span>
        <span className='text'>{text}</span>
    </main>
  )
}

export default JobInfo