import React,{useState, useEffect} from 'react'
import './Board.css'
import List from './List'
import Detail from './Detail'
import Loader from './Loader'

const Board = () => {
    const [entries, setEntries] = useState([])
    const [toDo, setToDo] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [completed, setCompleted] = useState([])
    const [isCardClick, setIsCardClick] = useState(false)
    const [clickedCardId, setClickedCardId] = useState(0)
    const [loader, setLoader] = useState(false)
    
    const cardClick = (id) => {
        setClickedCardId(id)
        setIsCardClick(true)
    }
    const getData = async() => {
        const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/entries`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let result = await response.json()
    if(typeof result !== 'string'){
        setEntries(result)
        setLoader(false)
    } else {
        alert('Error occured')
        setLoader(false)
    }
    }

    const perform = () => {
        const performEffect = async() => {
            const dragged = Number(localStorage.getItem('beingDragged'))
            const dropped = localStorage.getItem('dropCategory')
            if(dropped !== 'null'){
                setEntries(prev => {
                    let newArr = [...prev]
                    prev.forEach((i, index) => {
                        if(i.itemId === dragged){
                            newArr[index]["category"] = dropped
                        }
                    })
                    return newArr
                })
                const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/entry/${dragged}/update`, {
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({
                        category : dropped
                    })
                })
                let result = await response.json()
                if(!result){
                    alert('Error occured')
                }
            }
        }
        performEffect()
      }

    useEffect(() => {
        setLoader(true)
        getData()
    },[])

    useEffect(() => {
        setToDo([])
        setInProgress([])
        setCompleted([])
        if(entries.length>0){
            entries.forEach((i) => {
                i.category==='To Do' && setToDo(prev => [i,...prev])
                i.category==='In Progress' && setInProgress(prev => [i,...prev])
                i.category==='Completed' && setCompleted(prev => [i,...prev])
            })
        }
    },[entries])
  return (
    <div className='boardContainer' >
    <h3 className='boardTitle'>Projects <div>{loader && <Loader color="black"/>}</div> </h3>
        <div className='board'>
        <List category='To Do' data={toDo} perform={perform} getData={getData} cardClick={cardClick} />
        <List category='In Progress' data={inProgress} perform={perform} getData={getData} cardClick={cardClick} />
        <List category='Completed' data={completed} perform={perform} getData={getData} cardClick={cardClick} />
        {isCardClick && <Detail clickedCardId={clickedCardId} getData={getData} setIsCardClick={setIsCardClick} />}
    </div>
    </div>
  )
}

export default Board