import React from 'react'
import {useContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { stateContext } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { taskArray } from './stateSlice';


const Home = () => {

    
    // const taskArray = JSON.parse(localStorage.getItem('taskArray'));
    // localStorage.removeItem('taskArray')
    // console.log(taskArray)
    // const {state,dispatch}=useContext(stateContext)
    const state=useSelector(({data})=>data);
    console.log("state",state);
    let dispatch= useDispatch();
    console.log("task",state.taskArray)
    
    // const [items, setItems] = useState(state.taskArray)
    // const[editData,setEdit]=useState(null)

    const removeItem = (id) => {
        // setItems(()=>items.filter((item,index)=>index != id))
        // console.log(items)
        dispatch(taskArray(state.taskArray.filter((item,index)=>index != id)));

      };
    //   localStorage.setItem('taskArray', JSON.stringify(items));
    
    // const editItem = (editobj)=>{
    //     console.log(editobj)
    //     setEdit(editobj)
    //    if(editData !== null){
    //     localStorage.setItem("edit",JSON.stringify(editData))
    //    gotoForm(editData); 
    //    }else{
    //     return
    //    }
    // // }
    // const editItem =(obj)=>{
       
    //     localStorage.setItem("edit",JSON.stringify(obj))
    //     gotoForm();
    //  }
    const editItem =(obj)=>{
        navigate(`/Form?name=${obj.name}`)
    }
    
    

    //go to form function
    let navigate=useNavigate();
    const gotoForm=()=>{
       navigate("/Form")
    }
    // let navie=useNavigate();
    // const gotoEdit=()=>{
    //    navie("/edit")
    // }

  return (
    <div>list Of task:
      
        <table border="1">
            <thead>
            <tr>
                <th>Id</th>
                <th>TaskName</th>
                <th>Description</th>
                <th>IsCompleted</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
           
        {state.taskArray?.map((item,index)=>( <tr key={index}>
             <td>{index+1}</td>
                <td >{item.name}</td>
                <td>{item.des}</td>
                <td>{item.iscomplete}</td>
                <td><button onClick={()=>editItem(item)}>Edit</button></td>
               {/* <td> <Link to={`/Form/${editData.name}`}>Edit</Link></td> */}
                <td><button onClick={()=>removeItem(index)}>Delete</button></td>
               
            </tr>))  } 
            </tbody>
           

        </table>
        <div>
            <button onClick={()=>gotoForm()}>Go To Form</button>
        </div>
    </div>
  )
}

export default Home