import React from 'react'
import './List.css'
import CardAdder from './CardAdder'
import Card from './Card'

const List = ({category,data}) => {
    console.log(data)
  return (
    <div className='list'>
        <h3>{category} </h3>
        <CardAdder category={category} />
        {data.map((i) => 
            <Card key={i.itemId} title={i.title} description={i.description} itemId={i.itemId} />
        )}
    </div>
  )
}

export default List