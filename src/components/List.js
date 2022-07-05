import React from 'react'
import './List.css'
import CardAdder from './CardAdder'
import Card from './Card'

const List = ({category,data,perform,getData}) => {
    const dragDrop = (e) => {
        localStorage.setItem('dropCategory',e.target.getAttribute("data-id"))
      };
  return (
    <div className='list'
    data-id = {category}
    onDragOver = {(e) => e.preventDefault()}
    onDragEnter = {(e) => e.preventDefault()}
    onDragLeave = {(e) => e.preventDefault()}
    onDrop = {dragDrop}
    >
        <h3>{category} </h3>
        <CardAdder category={category} getData={getData} />
        {data.map((i) => 
            <Card key={i.itemId} title={i.title} description={i.description} itemId={i.itemId} perform={perform} />
        )}
    </div>
  )
}

export default List