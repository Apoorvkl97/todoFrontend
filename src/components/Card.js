import React,{useState} from 'react'
import './Card.css'

const Card = ({title,description,itemId,perform,cardClick}) => {
    
    const dragStart = (e) => {
        localStorage.setItem('beingDragged',e.target.getAttribute("data-id"))
      };

      const dragEnd = () => {
        perform()
      }
      
      
  return (
    <div className='card' 
    data-id = {itemId}
    draggable = {true}
    onDragStart = {dragStart}
    onDragOver = {(e) => e.preventDefault()}
    onDragEnter = {(e) => e.preventDefault()}
    onDragLeave = {(e) => e.preventDefault()}
    onDragEnd = {dragEnd}
    onClick = {()=>cardClick(itemId)}
    >
        <h3>{title} </h3>
        <p>{description} </p>
    </div>
  )
}

export default Card