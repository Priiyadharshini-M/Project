import jwtDecode from 'jwt-decode'
const tokenState = {
    adminToken: sessionStorage.getItem("adminsToken"),
    _adminId: ''
}
const adminProfileState = {
    adminProfile: ''
}

export const tokenReducer = (state = tokenState, action) => {
    switch (action.type) {
        case 'SET_ADMIN_TOKEN':
        case 'LOAD_ADMIN':
            const admin = jwtDecode(action.token)
            return {
                ...tokenState,
                adminToken: action.token,
                _adminId: admin.id
            }
        case 'DELETE_ADMIN_TOKEN':
            sessionStorage.removeItem("adminsToken")
            return {
                ...tokenState,
                adminToken: '',
                _adminId: ''
            }
        default: return state
    }
}

export const adminProfileReducer = (state = adminProfileState, action) => {
    switch (action.type) {
        case "VIEW_ADMIN_PROFILE":
        case "UPDATE_ADMIN_PROFILE":
            return {
                ...adminProfileState,
                adminProfile: action.payload
            }
        default:
            return state
    }
}