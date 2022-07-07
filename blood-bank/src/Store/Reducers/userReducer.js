import jwtDecode from 'jwt-decode'

const profileState={
    profile : ''
}
const initialState = {
    token : localStorage.getItem("token"),
    // userName: null,
    // userEmail: null,
    // userContact: null,
    // userPassword: null,
    //profile : '',
    _userId: ''
}

export const userReducer = (state = initialState, action) => {
    console.log("entered user reducer")
    switch(action.type) {
        case "USER_LOADED":
        case "LOG_IN":
            const user = jwtDecode(action.token)
            // console.log("2nd token:"+action.tokens)
             console.log("user id from user reducer : "+user.id)
            return {
                ...initialState, 
                token: action.token,
                // userName: user.userName,
                // userEmail: user.userEmail,
                // userContact: user.userContact,
                // userPassword: user.userPassword,
                _userId: user.id
             }

        case "SIGN_IN":
             return [action.user.data, ...initialState]

        case "LOG_OUT":
             localStorage.removeItem("token")
             return {
                //...initialState,
                token : '',
                _userId: ''
             }

        default:
            return state
    }
}

export const userprofileReducer = (state = profileState, action) => {
    switch(action.type){
        case "VIEW_PROFILE":
            return {
                ...profileState,
                profile : action.payload
            }
        case 'UPDATE_PROFILE' : 
            return {
                ...profileState,
                profile : action.payload
            }
        default :
            return state
    }
}