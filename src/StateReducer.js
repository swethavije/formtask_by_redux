export const initialState={
   isLogin:JSON.parse(localStorage.getItem("isLogin")) || false,
    taskArray:[]
}
export const stateReducer = (state,action) =>{
  switch(action.type){
    case "LOGIN" :
      return {
        ...state,
        isLogin:action.payload,
      };
    case "FORM" :
      return {
        ...state,
        taskArray:action.payload,
      };
      default:
        return state;
  }
}