import React, {useEffect, useState} from 'react'
import './Detail.css'

const Detail = ({clickedCardId,getData,setIsCardClick}) => {
    const [cardData, setCardData] = useState({})
    const [titleInput, setTitleInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')

    const getEntry = async() => {
        const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/entry/${clickedCardId}`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let result = await response.json()
    if(result){
        setCardData(result)
        setTitleInput(result.title)
        setDescriptionInput(result.description)
    } else {
        alert('Error occured')
    }
    }

    const performEffect = async() => {
        const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/entry/${clickedCardId}/update`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            'title' : titleInput,
            'description' : descriptionInput
        })
    })
    let result = await response.json()
    if(result){
        getData()
    } else {
        alert('Error occured')
    }
    }

    useEffect(() => {
        getEntry()
    },[clickedCardId])
  return (
    <div className='detail'>
        <div className='cardInput'>
            <input className='titleInput' value = {titleInput} onChange = {(e) => setTitleInput(e.target.value)} placeholder='Give your task a title' />
            <span onClick={() => setIsCardClick(false)} >x</span> <br />
            <label>Description</label>
            <textarea className='descriptionInput' rows='5' value = {descriptionInput} onChange = {(e) => setDescriptionInput(e.target.value)} placeholder='Description' />
            <button className='addButton' onClick={performEffect} >+</button>
        </div>
    </div>
  )
}

export default Detail