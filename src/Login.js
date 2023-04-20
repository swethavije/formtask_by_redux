import React from 'react'
import { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import User.json from json;
// import { stateContext } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './stateSlice';


const Login = () => {
  // const {state,dispatch}=useContext(stateContext);
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');


        const [error, setError] = useState('');
        let User=require('./User.json');
        //console.log(User)
      const state=useSelector(({data})=>data)
      console.log("state",state)
      let dispatch=useDispatch();
    
//go to home function
        let navigate=useNavigate();
        const gotohome=()=>{
           navigate("/Home")
        }
//login function and validation
      
        const handleLogin = (event) => {
          event.preventDefault();
          const user = User.find((user) => user.username === username);
          if (username === '' || password === '') {
            setError('Please fill in all fields.');
          } else if (!user) {
            setError('Invalid username.');
          } else if (user.password != password) {
            setError('Incorrect password.');
         } else {
            localStorage.setItem("isLogin",JSON.stringify(true))
            // dispatch({type:"LOGIN",payload:true})
            dispatch(login(true));
            gotohome();
          }
        };


  return (
    <form onSubmit={handleLogin}>
   
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      /><br/>
   
    
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      /><br/>
   
   
   
      <button type="submit">Login</button>
   
    {error && <div>{error}</div>}
  </form>
);
  }

  
export default Login