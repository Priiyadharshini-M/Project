import { reducer, campReducer } from "./campReducer";
import { combineReducers } from "redux";
import { userReducer, userprofileReducer } from "./userReducer";
import { adminProfileReducer, tokenReducer } from "./adminReducer"
import { donorReducer, donorProfileReducer } from "./donorReducer";

const rootReducer = combineReducers({
    camp: reducer,
    campDetails: campReducer,
    user: userReducer,
    admin: tokenReducer,
    donor: donorReducer,
    profile: userprofileReducer,
    donorProfile: donorProfileReducer,
    adminProfile: adminProfileReducer
})

export default rootReducer