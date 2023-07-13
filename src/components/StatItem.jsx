import React from 'react'

const StatItem = ({count,title,icon,color,bcg}) => {
    
    return (
    <main className='StatItem' style={{borderBottom: `4px solid ${color}`}}>
        <header>
            <span className='count' style={{color:color}}>{count}</span>
            <span className='icon'style={{color:color,backgroundColor:bcg}}>{icon}</span>
        </header>
        <h5 className='title' style={{color:color}}>{title}</h5>
    </main>
  )
}

export default StatItem