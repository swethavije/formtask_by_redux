import React, { useReducer } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Form from './Form'
import { stateContext } from './Context'
import { initialState, stateReducer } from './StateReducer'
import { Provider, useSelector } from 'react-redux'
import { store } from './store'

const Routing = () => {
  // const [state,dispatch]=useReducer(stateReducer,initialState);
  const state=useSelector(({data})=>data);
  console.log("state",state)
  return (
   
    <BrowserRouter>
    {state?.isLogin? (
    <Routes>
        
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/Form" element={<Form />}></Route>
        <Route path="*" element={<Navigate to={"/Home"}></Navigate>}></Route>
      
    </Routes>):(
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="*" element={<Navigate to={"/"}></Navigate>}></Route>
      </Routes>
    )}
    </BrowserRouter>
   
  )
};
const stateProvider=()=>{
  return(
    <Provider store={store}>
      <Routing/> 
    </Provider>
  )
};
export default stateProvider

// export default Routing