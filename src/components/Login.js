import React, {useEffect, useState} from 'react'
import Loader from './Loader'
import './Login.css'
import image from '../images/Group.png'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loader, setLoader] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [device, setDevice] = useState(false)
    const [wrEmail, setwrEmail] = useState(false)
    const [wrLogin, setwrLogin] = useState(false)

    const checkEmail = () => {
        if(email.indexOf('@')<0 || email.indexOf('.')<email.indexOf('@')){
            setwrEmail(true)
            return false
        } else {
            return true
        }
    }

    const submitHandler = async () => {
        setwrEmail(false)
        setwrLogin(false)
        if(checkEmail()){
            setLoader(true)
        let body = {
            'email' : email,
            'password' : password
        }
        if(!isLogin){
            body.fullName = fullName
        }
        if(device){
            body.device = 'true'
        }
        const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/${isLogin?'login':'register'}`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        })
        let result = await response.json()
        
        if(typeof result !== 'string'){
            setLoader(false)
            localStorage.setItem("userId",result)
            window.location.href = '/dashboard'
        } else {
            setLoader(false)
            setwrLogin(true)
        }
        }
    }

useEffect(() => {
    const userId = Number(localStorage.getItem('userId'))
    const checkDevice = async() => {
        const response = await fetch(`${process.env.REACT_APP_URLCONSTANT}/device`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            'device':userId
        })
    })
    let result = await response.json()
    if(result){
        window.location.href = '/dashboard'
    }
    }
    if(userId){
        checkDevice()
    }
},[])

  return (
    <div className='login'>
    <div className='loginImage'>
        <img src={image} alt='' />
    </div>
        <div className='loginForm'>
        <div style={{display:'flex'}}>
        <span onClick={() => setIsLogin(true)} className={'isLogin'+(isLogin?' isSelected':'')}>Login</span>
        <span onClick={() => setIsLogin(false)} className={'isLogin'+(!isLogin?' isSelected':'')}>Sign up</span>
        </div>
        <div className='loginFields'>
        {isLogin && <div>
            <h3>To Continue</h3>
            <span>We need your name and email</span>
        </div>}
        {!isLogin && <>
            <input type='text' value = {fullName} onChange = {(e) => setFullName(e.target.value)} placeholder='Full Name' className={wrLogin?'red':''}/>
            <br />
        </>}
            <input type='email' value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder='Email' className={wrEmail || wrLogin?'red':''} />
            <br />
            <input type='password' value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder='Password'  className={wrLogin?'red':''} />
            <br />
            
            <div className='loginbuttonGroup' >
            {wrEmail && <div className='error'>Please enter valid email</div> }
            {wrLogin && <div className='error'>Your email and password do not match</div>}
            {!isLogin && <button onClick = {submitHandler} >Sign Up</button>}
            {isLogin && <button onClick = {submitHandler} >Login
            {loader && <Loader color="black"/>}
            </button>}
            </div>
            <input type='checkbox' value = {device} onChange = {(e) => setDevice(prev => !prev)} />
            <label>Remember me</label>
            
        </div>
        </div>
    </div>
  )
}

export default Login