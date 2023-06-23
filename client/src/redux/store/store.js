import { createStore } from "redux";

const initialState={
    admin:{login:null},
    student:{login:null},
    faculty:{login:null},
    refresh:true,
    loading:false
}
function reducer(state=initialState, action){
    switch(action.type){
        case 'admin':return{...state, admin:action.payload}
        case 'student': return {...state, student:action.payload}
        case 'faculty': return{...state,faculty:action.payload}
        case 'refresh':return{...state,refresh:!state.refresh}
        case 'loading': return{...state,loading:action.payload}
        default :return state;
    }
}
export default createStore(reducer)