import jwtDecode from 'jwt-decode'
const donorInitialState = {
    donorToken: sessionStorage.getItem("donorToken"),
    _donorId: '',
    msg: ''
}

const donorProfileState = {
    donorProfile: '',
    specificDonor: ''
}

export const donorReducer = (state = donorInitialState, action) => {
    switch (action.type) {
        case "DONOR_LOADED":
        case "DONOR_LOG_IN":
            const donor = jwtDecode(action.donorToken)
            return {
                ...donorInitialState,
                donorToken: action.donorToken,
                _donorId: donor.id,
                msg: ''
            }

        case "SIGN_IN":
            return [action.donor.data, ...donorInitialState]

        case "LOG_OUT":
            sessionStorage.removeItem("donorToken")
            return {
                donorTokens: '',
                _donorId: '',
                msg: ''
            }

        case "DONOR_LOGIN_ERROR":
            return {
                donorTokens: '',
                _donorId: '',
                msg: action.msg
            }

        case "DONOR_SIGNIN_ERROR":
            return {
                donorTokens: '',
                _donorId: '',
                msg: action.msg
            }

        default:
            return state
    }
}

export const donorProfileReducer = (state = donorProfileState, action) => {
    switch (action.type) {
        case "DONOR_VIEW_PROFILE":
            return {
                ...donorProfileState,
                donorProfile: action.payload,
            }

        case 'UPDATE_DONOR_PROFILE':
            return {
                ...donorProfileState,
                donorProfile: action.payload
            }

        case "DONOR_SEARCH":
            return {
                ...donorProfileState,
                specificDonor: action.donor.data
            }

        default:
            return state
    }
}