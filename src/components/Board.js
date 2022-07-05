import React,{useState, useEffect} from 'react'
import './Board.css'
import List from './List'

const Board = () => {
    const [entries, setEntries] = useState([])
    const [toDo, setToDo] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(() => {
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
        getData()
    },[])

    useEffect(() => {
        console.log(entries)
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
        <List category='To Do' data={toDo} />
        <List category='In Progress' data={inProgress} />
        <List category='Completed' data={completed} />
    </div>
  )
}

export default Board