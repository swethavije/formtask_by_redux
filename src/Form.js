import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { stateContext } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { taskfunc } from './stateSlice';

const Form = () => {
    
    // const {state,dispatch}=useContext(stateContext);
    const state=useSelector(({data})=>data);
    console.log("state",state)
    let dispatch=useDispatch();
    const[params]=useSearchParams()
    console.log(params.get("name"))
    const[taskName,setTaskname]=useState("");
    const[description,setDescription]=useState("");
    const[completed,setCompleted]=useState("");
    // const[taskArray,setArray]=useState(JSON.parse(localStorage.getItem('taskArray'))||[]);
    const[errorShow,setError]=useState(false);
  
 useEffect(()=>{
      if(params.get("name")!=null){
        const tem=state.taskArray ;
        console.log(tem)
        const edi=tem.find((item)=>item.name === params.get("name"));
        console.log(edi)
        setTaskname(edi.name);
        setDescription(edi.des);
        setCompleted(edi.iscomplete);

}},[params])
//    useEffect(()=>{
//     const editarr = JSON.parse(localStorage.getItem('edit')); 
//     console.log(editarr)
//     setTaskname(editarr.name)
//     console.log(editarr.name)
//     setDescription(editarr.des)
//    },[])

   
    const getTaskname=(e)=>{
        console.log("tasktname",e.target.value)
        setTaskname(e.target.value)
        // setForm((prevData) => ({ ...prevData, name:e.target.value }));
    }
    const getDesvalue=(e)=>{
        // console.log("description",e.target.value)
        setDescription(e.target.value)
    }
    const getCompleted=(e)=>{
        // console.log("completed",e.target.checked)
        setCompleted(e.target.checked ? "YES":"NO")
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        
        setError(true);
        if(taskName==="" || description==="")return;
       
        console.log(taskName,description,completed)
        // const arrVal={name:taskName,des:description,iscomplete:completed}
        // setArray([...taskArray, arrVal]);
        // console.log(taskArray)
    //    const data=JSON.parse(localStorage.getItem('taskArray'))
    //    if(data===null||undefined){
    //     localStorage.setItem("taskArray",JSON.stringify(taskArray))
    //    }else{
    //     const temp = [...data,{name:taskName,des:description,iscomplete:completed}]
    //     localStorage.setItem("taskArray",JSON.stringify(temp))
    //    }
        if(params.get("name")==null){
            const arrVal={name:taskName,des:description,iscomplete:completed}
            // console.log(arrVal)
            // setArray([...taskArray, arrVal]);
            // dispatch({type:"FORM",payload:[...state.taskArray,{name:taskName,des:description,iscomplete:completed}]})
            dispatch(taskfunc([...state.taskArray,arrVal]))
        }else{
            const editObj =state.taskArray.map(obj=>{
                if(obj.name === params.get("name")){
                    return {name:taskName,des:description,iscomplete:completed};
                }
                return obj;
            });
            // console.log(editObj)
            // setArray(editObj);
            console.log("editObj",editObj)
           
            // dispatch({type:"FORM",payload:editObj}) 
            dispatch(taskfunc(editObj))
        }
  
       
    }

    
    
    
    //  localStorage.setItem('taskArray', JSON.stringify(taskArray));

    
   
   
   
    //go to home function
    let navigate=useNavigate();
    const gotohome=()=>{
       navigate("/Home")
    }

  return (
    
    <div>

        <form onSubmit={handlesubmit}>
            <label >TaskName:</label>
            <input type="text" placeholder="Taskname" value={taskName}   onChange={getTaskname}/><br/>
            {taskName === "" && errorShow &&<p>Task name is required</p>}
            <label >Description:</label>
            <input type="text" placeholder="description" value={description}  onChange={getDesvalue}/><br/>
            {description === ""&& errorShow &&<p>Description is required</p>}
            <label >isCompleted:</label>
            <input type="checkbox" checked={completed} onChange={getCompleted}/>
            <input type="submit"/>
        </form>
        <div>
            <button onClick={()=>gotohome()}>HOME</button>
        </div>
        {/* <div>
        <button onClick={()=>dispatch({type:"FORM",payload:[{name:taskName,des:description,iscomplete:completed}]})}>ADD</button>
        </div> */}
       
         
           
    </div>
  )
}


export default Form