import React from 'react'
import './Loader.css'

const Loader = ({color}) => {
  return (
    <div className='loader' style={{borderTop:"3px solid "+color}} ></div>
  )
}

export default Loader