import React,{useEffect, useState} from 'react'
import './CardAdder.css'

const CardAdder = ({category,getData}) => {
    const [isClick, setIsClick] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const generateID = (u) => {
        let result = ''+ Date.now()
        result += u.charCodeAt(0)
        return Number(result.slice(5))
    }
    const updateEntry = () => {
        const userId = localStorage.getItem('userId')
        const itemId = generateID(category)
        const createdOn = new Date().toDateString()
        const body = {userId, itemId, title, description, createdOn, category}
        const addEntry = async() => {
            const response = await fetch(`http://localhost:5000/entry`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        })
        let result = await response.json()
        if(result){
            getData()
        } else {
            alert('Error occured')
        }
        }
        addEntry()
        setIsClick(false)
        setTitle('')
        setDescription('')
        }
    // document.addEventListener('click', (e) => {
    //     if(e.target.className!=='' && e.target.className!=='addButton' && e.target.className!=='inpField'){
    //         setIsClick(false)
    //         if(title.length>0){                
    //             updateEntry()
    //         }
    //     }
    // })
  return (
    <div className='cardAdder'>
        {!isClick && <button className='addButton' onClick={() => setIsClick(true)} >+</button>}
        {isClick && <div className='cardInput'>
            <input className='inpField' value = {title} onChange = {(e) => setTitle(e.target.value)} placeholder='Give your task a title' />
            <span onClick={() => setIsClick(false)} >x</span>
            <textarea className='inpField' rows='5' value = {description} onChange = {(e) => setDescription(e.target.value)} placeholder='Description' />
            <button className='addButton' onClick={updateEntry} >+</button>
        </div>}
    </div>
  )
}

export default CardAdder