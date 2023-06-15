import React, {useEffect, useState} from 'react'
import './Detail.css'
import Loader from './Loader'

const Detail = ({clickedCardId,getData,setIsCardClick}) => {
    const [cardData, setCardData] = useState({})
    const [titleInput, setTitleInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [loader, setLoader] = useState(false)

    const getEntry = async() => {
        setLoader(true)
        const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/entry/${clickedCardId}`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let result = await response.json()
    if(result){
        setLoader(false)
        setCardData(result)
        setTitleInput(result.title)
        setDescriptionInput(result.description)
    } else {
        alert('Error occured')
    }
    }

    const performEffect = async() => {
        setLoader(true)
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
        setLoader(false)
        getData()
        setIsCardClick(false)
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
            <span className='closeBtn' onClick={() => setIsCardClick(false)} >x</span> <br />
            {cardData.createdOn && <div className='createdOn' > <label>Created On</label> <span className='createdOnDate' > {' '+ cardData.createdOn} </span> </div>}
            <label>Description</label>
            <textarea className='descriptionInput' rows='5' value = {descriptionInput} onChange = {(e) => setDescriptionInput(e.target.value)} placeholder='Description' />
            <button style={{position:"relative"}} className='addButton' onClick={performEffect} > {clickedCardId?"Update":"+"} {loader && <Loader color="black"/>} </button>
            
        </div>
    </div>
  )
}

export default Detail