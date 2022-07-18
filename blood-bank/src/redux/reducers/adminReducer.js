import jwtDecode from 'jwt-decode'
const tokenState = {
    adminToken: sessionStorage.getItem("adminsToken"),
    _adminId: '',
    role: '',
    adminLoginMsg: '',
    adminLoginSuccess: false
}
const adminProfileState = {
    adminProfile: '',
    adminViewProfileMsg: '',
    adminDeleteMsg: '',
    adminUpdateMsg: '',
    adminUpdateSuccess: false
}

export const tokenReducer = (state = tokenState, action) => {
    switch (action.type) {
        case 'SET_ADMIN_TOKEN':
        case 'LOAD_ADMIN':
            const admin = jwtDecode(action.token)
            return {
                ...tokenState,
                adminToken: action.token,
                _adminId: admin.id,
                role: admin.role,
                adminLoginSuccess: true
            }
        case 'DELETE_ADMIN_TOKEN':
            sessionStorage.removeItem("adminsToken")
            return {
                ...tokenState,
                adminToken: '',
                _adminId: '',
                role: '',
                adminLoginSuccess: false,
                adminLoginMsg: ''
            }

        case 'ADMIN_LOGIN_ERROR':
            return {
                ...tokenState,
                adminLoginMsg: action.msg,
                adminLoginSuccess: false
            }
        default: return state
    }
}

export const adminProfileReducer = (state = adminProfileState, action) => {
    switch (action.type) {
        case "VIEW_ADMIN_PROFILE":
            return {
                ...adminProfileState,
                adminProfile: action.payload,
                adminViewProfileMsg: ''
            }

        case "UPDATE_ADMIN_PROFILE":
            return {
                ...adminProfileState,
                adminProfile: action.payload,
                adminUpdateMsg: '',
                adminUpdateSuccess: true
            }

        case 'DELETE_PROFILE':
            return {
                ...adminProfileState,
                adminDeleteMsg: ''
            }

        case "DONOR_VIEW_PROFILE_ERROR":
            return {
                ...adminProfileState,
                donorViewProfileMsg: action.msg
            }

        case "DONOR_DELETE_ERROR":
            return {
                ...adminProfileState,
                donorDeleteMsg: action.msg
            }

        case "DONOR_UPDATE_ERROR":
            return {
                ...adminProfileState,
                donorUpdateMsg: action.msg,
                donorUpdateSuccess: false
            }
        default:
            return state
    }
}