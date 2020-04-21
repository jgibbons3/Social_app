import { combineReducers } from 'redux';
import loginReducer from "./loginReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";


const rootReducer = combineReducers({
    loginReducer,
    postReducer,
    profileReducer,
    userReducer, 
    commentReducer
})

export default rootReducer;