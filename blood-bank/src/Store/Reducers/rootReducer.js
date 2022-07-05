import reducer from "./reducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    camp : reducer,
    auth : authReducer,
    user : userReducer
})

export default rootReducer