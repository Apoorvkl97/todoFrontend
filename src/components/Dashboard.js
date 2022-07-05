import React from 'react'
import './Dashboard.css'
import Panel from './Panel'
import Board from './Board'

const Dashboard = () => {
  return (
    <>
        {localStorage.getItem('userId') && 
        <div className='dashboard'>
            <Panel />
            <Board />
        </div>}
    </>
  )
}

export default Dashboard