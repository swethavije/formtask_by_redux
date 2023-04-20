import { createSlice } from "@reduxjs/toolkit";

const stateSlice =createSlice({
    name:"task",
    initialState:{
        isLogin:JSON.parse(localStorage.getItem("isLogin")) || false,
        taskArray:[]
    },
    reducers:{
        login:(state,action)=>{
            state.isLogin=action.payload;
        },
        taskfunc:(state,action)=>{
            state.taskArray=action.payload;
        },
    },
});
export const{login,taskfunc}=stateSlice.actions;
export default stateSlice.reducer