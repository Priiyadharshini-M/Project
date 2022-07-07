import reducer from "./reducer";
import { combineReducers } from "redux";
//import authReducer from "./authReducer";
import { userReducer, userprofileReducer } from "./userReducer";
import { adminProfileReducer, tokenReducer } from "./adminReducer"
import { donorReducer, donorProfileReducer } from "./donorReducer";

const rootReducer = combineReducers({
    camp : reducer,
    //auth : authReducer,
    user : userReducer,
    admin : tokenReducer,
    donor : donorReducer,
    profile : userprofileReducer,
    donorProfile : donorProfileReducer,
    adminProfile : adminProfileReducer
})

export default rootReducer