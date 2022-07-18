const initialState = {
    camps: '',
    campAddSuccess: false,
    campAddmsg: '',
    campViewMsg: '',
    campUpdateMsg: '',
    campUpdateSuccess: false,
    campDeleteSuccess: false,
    campDeleteMsg: ''
}

const campState = {
    camp: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CAMPS":
            return {
                ...initialState,
                campAddSuccess: true,
                campAddmsg: ''
            }

        case "VIEW_CAMP":
            return {
                ...initialState,
                camps: action.camps,
                campMsg: '',
            }

        case "UPDATE_CAMPS":
            return {
                ...initialState,
                campUpdateMsg: '',
                campUpdateSuccess: true
            }

        case "DELETE_CAMPS":
            return {
                ...initialState,
                campDeleteMsg: '',
                campDeleteSuccess: true
            }

        case "ADD_CAMPS_ERROR":
            return {
                ...initialState,
                campAddSuccess: false,
                campAddmsg: action.msg
            }

        case "VIEW_CAMPS_ERROR":
            return {
                ...initialState,
                campViewMsg: action.msg
            }

        case "UPDATE_CAMPS_ERROR":
            return {
                ...initialState,
                campUpdateMsg: action.msg,
                campUpdateSuccess: false
            }

        case "DELETE_CAMPS_ERROR":
            return {
                ...initialState,
                campDeleteMsg: action.msg,
                campDeleteSuccess: false
            }

        default:
            return state
    }
}

export const campReducer = (state = campState, action) => {
    switch (action.type) {
        case "VIEW_CAMPS":
            return {
                ...initialState,
                camp: action.camps,
            }

        default:
            return state
    }
}