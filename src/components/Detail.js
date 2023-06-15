import React, {useEffect, useState} from 'react'
import './Detail.css'
import Loader from './Loader'

const Detail = ({clickedCardId,getData,setIsCardClick}) => {
    const [cardData, setCardData] = useState({})
    const [titleInput, setTitleInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [loader1, setLoader1] = useState(false)
    const [loader2, setLoader2] = useState(false)

    const getEntry = async() => {
        setLoader1(true)
        const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/entry/${clickedCardId}`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let result = await response.json()
    if(result){
        setLoader1(false)
        setCardData(result)
        setTitleInput(result.title)
        setDescriptionInput(result.description)
    } else {
        alert('Error occured')
    }
    }

    const performEffect = async() => {
        setLoader1(true)
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
        setLoader1(false)
        getData()
        setIsCardClick(false)
    } else {
        alert('Error occured')
    }
    }

    const deleteEffect = async() => {
        setLoader2(true)
        const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/entry/${clickedCardId}/delete`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let result = await response.json()
    if(result){
        setLoader2(false)
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
            <button style={{position:"relative"}} className='addButton' onClick={performEffect} > {clickedCardId?"Update":"+"} {loader1 && <Loader color="black"/>} </button>
            <button style={{position:"relative"}} className='delButton' onClick={deleteEffect} > {clickedCardId?"Delete":"-"} {loader2 && <Loader color="black"/>} </button>
        </div>
    </div>
  )
}

export default Detail