const initialState = {
    camps: '',
    campAddSuccess: false,
    campAddMsg: '',
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
                campAddMsg: ''
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

        case "ADD_CAMP_ERROR":
            return {
                ...initialState,
                campAddSuccess: false,
                campAddMsg: action.msg
            }

        case "VIEW_CAMP_ERROR":
            return {
                ...initialState,
                campViewMsg: action.msg
            }

        case "UPDATE_CAMP_ERROR":
            return {
                ...initialState,
                campUpdateMsg: action.msg,
                campUpdateSuccess: false
            }

        case "DELETE_CAMP_ERROR":
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