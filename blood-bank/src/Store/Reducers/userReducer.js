import jwtDecode from 'jwt-decode'
const initialState = {
    tokens : localStorage.getItem("token"),
    userName: null,
    userEmail: null,
    userContact: null,
    userPassword: null,
    _id: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "USER_LOADED":
        case "LOG_IN":
            const user = jwtDecode(action.tokens)
            // console.log("2nd token:"+action.tokens)
            // console.log("name:"+user)
            return {
                ...initialState, 
                tokens: action.tokens,
                userName: user.userName,
                userEmail: user.userEmail,
                userContact: user.userContact,
                userPassword: user.userPassword,
                _id: user._id
             }

        case "SIGN_IN":
             return [action.user.data, ...initialState]

        case "LOG_OUT":
             localStorage.removeItem("token")
             return {
                tokens : null,
                userName: null,
                userEmail: null,
                userContact: null,
                userPassword: null,
                _id: null
             }

        case "VIEW_PROFILE":
            

        default:
            return state
    }
}

export default userReducer