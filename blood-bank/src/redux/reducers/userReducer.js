import jwtDecode from 'jwt-decode'

const profileState = {
    profile: ''
}
const initialState = {
    token: sessionStorage.getItem("token"),
    _userId: '',
    msg: ''
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_LOADED":
        case "LOG_IN":
            const user = jwtDecode(action.token)
            return {
                ...initialState,
                token: action.token,
                _userId: user.id,
                msg: ''
            }

        case "SIGN_IN":
            return [action.user.data, ...initialState]

        case "LOG_OUT":
            sessionStorage.removeItem("token")
            return {
                token: '',
                _userId: '',
                msg: ''
            }

        case "LOGIN_ERROR":
            return {
                token: '',
                _userId: '',
                msg: action.msg
            }

        case "SIGNIN_ERROR":
            return {
                token: '',
                _userId: '',
                msg: action.msg
            }

        default:
            return state
    }
}

export const userprofileReducer = (state = profileState, action) => {
    switch (action.type) {
        case "VIEW_PROFILE":
            return {
                ...profileState,
                profile: action.payload
            }

        case 'UPDATE_PROFILE':
            return {
                ...profileState,
                profile: action.payload
            }

        default:
            return state
    }
}