import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loader, setLoader] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [device, setDevice] = useState(false)

    const submitHandler = async () => {
        setLoader(true)
        let body = {
            'email' : email,
            'password' : password
        }
        if(!isLogin){
            body.fullName = fullName
        }
        const response = await fetch(`http://localhost:5000/${isLogin?'login':'register'}`, {
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
        }
    }

  return (
    <div className='login'>
    <div className='loginImage'>Image here</div>
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
            <input type='text' value = {fullName} onChange = {(e) => setFullName(e.target.value)} placeholder='Full Name'/>
            <br />
        </>}
            <input type='email' value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder='Email' />
            <br />
            <input type='password' value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder='Password' />
            <br />
            
            <div className='loginbuttonGroup' >
            {!isLogin && <button onClick = {submitHandler} >Sign Up</button>}
            {isLogin && <button onClick = {submitHandler} >Login</button>}
            {loader && <Loader color="black"/>}
            </div>
            <input type='checkbox' value = {device} onChange = {(e) => setDevice(prev => !prev)} />
            <label>Remember me</label>
            
        </div>
        </div>
    </div>
  )
}

export default Login