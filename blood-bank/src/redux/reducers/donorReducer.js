import jwtDecode from 'jwt-decode'
const donorInitialState = {
    donorToken: sessionStorage.getItem("donorToken"),
    _donorId: '',
    donorLoginMsg: '',
    donorSigninMsg: '',
    donorsuccess: false,
    donorloginsuccess: false
}

const donorProfileState = {
    donorProfile: '',
    specificDonor: '',
    count: '',
    donors: '',
    role: '',
    donorViewProfileMsg: '',
    donorDeleteMsg: '',
    donorUpdateMsg: '',
    donorSearchMsg: '',
    donorAllMsg: '',
    donorUpdateSuccess: false
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
                donorloginsuccess: true,
                role: donor.role
            }

        case "DONOR_SIGN_IN":
            return {
                ...donorInitialState,
                donorsuccess: true,
                donorSigninMsg: '',
                role: ''
            }

        case "LOG_OUT":
            sessionStorage.removeItem("donorToken")
            return {
                donorTokens: '',
                _donorId: '',
                donorLoginMsg: '',
                role: '',
                donorsuccess: false,
                donorloginsuccess: false
            }

        case "DONOR_LOGIN_ERROR":
            return {
                ...donorInitialState,
                donorLoginMsg: action.msg,
                donorloginsuccess: false
            }

        case "DONOR_SIGNIN_ERROR":
            return {
                ...donorInitialState,
                donorSigninMsg: action.msg,
                donorsuccess: false
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
                donorViewProfileMsg: ''
            }

        case 'UPDATE_DONOR_PROFILE':
            return {
                ...donorProfileState,
                donorProfile: action.payload,
                donorUpdateMsg: '',
                donorUpdateSuccess: true
            }

        case 'DELETE_DONOR_PROFILE':
            return {
                ...donorProfileState,
                donorDeleteMsg: ''
            }

        case "DONOR_SEARCH":
            return {
                ...donorProfileState,
                specificDonor: action.donor.data,
                donorSearchMsg: ''
            }

        case "BLOOD_COUNT":
            return {
                ...donorProfileState,
                count: action.count
            }

        case "ALL_DONORS":
            return {
                ...donorProfileState,
                donors: action.donors,
                donorAllMsg: ''
            }

        case "DONOR_VIEW_PROFILE_ERROR":
            return {
                ...donorProfileState,
                donorViewProfileMsg: action.msg
            }

        case "DONOR_DELETE_ERROR":
            return {
                ...donorProfileState,
                donorDeleteMsg: action.msg
            }

        case "DONOR_UPDATE_ERROR":
            return {
                ...donorProfileState,
                donorUpdateMsg: action.msg,
                donorUpdateSuccess: false
            }

        case "DONOR_SEARCH_ERROR":
            return {
                ...donorProfileState,
                donorSearchMsg: action.msg
            }

        case "ALL_DONORS_ERROR":
            return {
                ...donorProfileState,
                donorAllMsg: action.msg
            }
        default:
            return state
    }
}