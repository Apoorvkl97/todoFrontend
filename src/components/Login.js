import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './components/Loader'

const Login = ({setUser,setFlag1}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()

    const loginHandler = async () => {
        setLoader(true)
        const response = await fetch("http://localhost:5000/login", {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'username' : username,
                'password' : password
            })
        })
        let result = await response.json()
        if(typeof result !== 'string'){
            setLoader(false)
            localStorage.setItem("userId",result)
            navigate("/dashboard", {replace:true})
        } else {
            setLoader(false)
        }
    }

    const registerHandler = async () => {
        setLoader(true)
        const response = await fetch("http://localhost:5000/register", {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'username' : username,
                'password' : password
            })
        })
        let result = await response.json()
        if(typeof result !== 'string'){
            setLoader(false)
            localStorage.setItem("userId",result)
            navigate("/dashboard", {replace:true})
        } else {
            setLoader(false)
        }
    }

  return (
    <div className='login'>
        <div className='loginform'>
            <label>Username</label>
            <input value = {username} onChange = {(e) => setUsername(e.target.value)} />
            <br />
            <label>Password</label>
            <input value = {password} onChange = {(e) => setPassword(e.target.value)} />
            <br />
            <div className='loginbuttonGroup' >
            <button onClick = {registerHandler} >Register</button>
            <button onClick = {loginHandler} >Login</button>
            {loader && <Loader color="black"/>}
            </div>
        </div>
    </div>
  )
}

export default Login