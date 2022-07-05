import React,{useState, useEffect} from 'react'
import './Board.css'
import List from './List'

const Board = () => {
    const [entries, setEntries] = useState([])
    const [toDo, setToDo] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [completed, setCompleted] = useState([])
    
    const getData = async() => {
        const response = await fetch(`http://localhost:5000/entries`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let result = await response.json()
    if(typeof result !== 'string'){
        setEntries(result)
    } else {
        alert('Error occured')
    }
    }

    const perform = () => {
        const performEffect = async() => {
            const dragged = Number(localStorage.getItem('beingDragged'))
            const dropped = localStorage.getItem('dropCategory')
            const response = await fetch(`http://localhost:5000/entry/${dragged}/update`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                category : dropped
            })
        })
        let result = await response.json()
        if(result){
            getData()
        } else {
            alert('Error occured')
        }
        }
        performEffect()
      }

    useEffect(() => {
        getData()
    },[])

    useEffect(() => {
        setToDo([])
        setInProgress([])
        setCompleted([])
        if(entries.length>0){
            entries.forEach((i) => {
                i.category==='To Do' && setToDo(prev => [...prev,i])
                i.category==='In Progress' && setInProgress(prev => [...prev,i])
                i.category==='Completed' && setCompleted(prev => [...prev,i])
            })
        }
    },[entries])
  return (
    <div className='board'>
        <List category='To Do' data={toDo} perform={perform} getData={getData} />
        <List category='In Progress' data={inProgress} perform={perform} getData={getData} />
        <List category='Completed' data={completed} perform={perform} getData={getData} />
    </div>
  )
}

export default Board