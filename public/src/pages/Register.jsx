import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {registerRoute} from "../util/APIRoutes";
function Register(){
    const [values, setvalues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(handleValidation()){
            const {password, username, email} = values
            const  {data} = await axios.post(registerRoute, {
                username,
                email,
                password
            })
            if (data.status === false){
                toast(data.msg, toastOptions)
            }
            if (data.status === true){
                // kullanıcı login oldu ve localstorage de bilgiler tutuluyor
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            }
            navigate('/')
        }
    }
    const handleChange = (e) => {
      setvalues({...values, [e.target.name]:e.target.value})
    }
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    const handleValidation = () => {
        const {password, confirmPassword, username, email} = values
        if (password !== confirmPassword){
            toast.error('Password and Confirm Password should be same',  toastOptions)
            return false
        }else if (username.length < 3){
            toast.error('Username should be greater than 5 chracters',  toastOptions)
            return false
        }else if (password.length < 8){
            toast.error('Password should be greater than 8 chracters',  toastOptions)
            return false
        }else if (email.length < 12){
            toast.error('Email should be greater than 5 chracters',  toastOptions)
            return false
        }else if (email === ""){
            toast.error('Email is required',  toastOptions)
            return false
        } else
            return true
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user'))
            navigate('/')
    }, []);

    return (
        <FormContainer>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="brand">
                    <img src={Logo} alt={Logo}/>
                    <h1>snappy</h1>
                </div>
                <input type="text" name="username" placeholder="Username" id="" onClick={(e) => handleChange(e)}/>
                <input type="email" name="email" placeholder="Email" id="" onClick={(e) => handleChange(e)}/>
                <input type="password" name="password" placeholder="Password" id="" onClick={(e) => handleChange(e)}/>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" id="" onClick={(e) => handleChange(e)}/>
                <button type="submit">Create User</button>
                <span>Already have an account ? <Link to="/login">Login</Link> </span>
            </form>
        <ToastContainer />
        </FormContainer>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
      height: 5rem;
    }
    h1{
      color: white;
      text-transform: uppercase;
      
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      :focus{
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button{
      background-color: #997af0;
      color:white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      cursor: pointer;
      &:hover{
       background-color: #4e0eff;
      }
    }
    span{
      color: white;
      text-transform: uppercase;
      a{
        color: #4e0eff;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`

export default Register