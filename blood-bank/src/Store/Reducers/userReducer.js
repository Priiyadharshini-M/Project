import jwtDecode from 'jwt-decode'
const initialState = {
    token : localStorage.getItem("token"),
    userName: null,
    userEmail: null,
    userContact: null,
    userPassword: null,
    _id: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SIGN_IN":
            const user = jwtDecode(action.token)
            console.log("2nd token:"+action.token)
            console.log("name:"+user.userName)
            return {
                ...initialState, 
                token: action.token,
                userName: user.userName,
                userEmail: user.userEmail,
                userContact: user.userContact,
                userPassword: user.userPassword,
                _id: user._id
             }
        default:
            return state
    }
}

export default userReducer