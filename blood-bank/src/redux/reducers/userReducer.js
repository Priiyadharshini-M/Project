import jwtDecode from 'jwt-decode'

const profileState = {
    profile: '',
    viewProfileMsg: '',
    deleteMsg: '',
    updateMsg: '',
    updateSuccess: false
}
const initialState = {
    token: sessionStorage.getItem("token"),
    _userId: '',
    signInMsg: '',
    loginMsg: '',
    role: '',
    success: false,
    loginSuccess: false
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
                role: user.role,
                loginSuccess: true
            }

        case "SIGN_IN":
            return {
                success: true,
                signInMsg: '',
                token: '',
                _userId: '',
                role: ''
            }

        case "LOG_OUT":
            sessionStorage.removeItem("token")
            return {
                token: '',
                _userId: '',
                loginMsg: '',
                role: '',
                success: false,
                loginSuccess: false
            }

        case "LOGIN_ERROR":
            return {
                ...initialState,
                loginMsg: action.msg,
                loginSuccess: false
            }

        case "SIGNIN_ERROR":
            return {
                ...initialState,
                signInmsg: action.msg,
                success: false
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
                profile: action.payload,
                viewProfileMsg: ''
            }

        case 'UPDATE_PROFILE':
            return {
                ...profileState,
                profile: action.payload,
                updateMsg: '',
                updateSuccess: true
            }

        case 'DELETE_PROFILE':
            return {
                ...profileState,
                deleteMsg: ''
            }

        case "VIEW_PROFILE_ERROR":
            return {
                ...profileState,
                viewProfileMsg: action.msg
            }

        case "DELETE_ERROR":
            return {
                ...profileState,
                deleteMsg: action.msg
            }

        case "UPDATE_ERROR":
            return {
                ...profileState,
                updateMsg: action.msg,
                updateSuccess: false
            }

        default:
            return state
    }
}