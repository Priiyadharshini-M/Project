import jwtDecode from 'jwt-decode'
const donorInitialState = {
    donorToken : localStorage.getItem("donorToken"),
    // userName: null,
    // userEmail: null,
    // userContact: null,
    // userPassword: null,
    _donorId: ''
}

const donorProfileState={
    donorProfile : '',
    specificDonor: ''
}

export const donorReducer = (state = donorInitialState, action) => {
    console.log("hrllo")
    switch(action.type) {
        case "DONOR_LOADED":
        case "DONOR_LOG_IN":
            const donor = jwtDecode(action.donorToken)
            // console.log("2nd token:"+action.tokens)
             console.log("donor id from donor reducer : "+donor.id)
            return {
                ...donorInitialState, 
                donorToken: action.donorToken,
                // userName: user.userName,
                // userEmail: user.userEmail,
                // userContact: user.userContact,
                // userPassword: user.userPassword,
                _donorId: donor.id
             }

        case "SIGN_IN":
             return [action.donor.data, ...donorInitialState]

        case "LOG_OUT":
             localStorage.removeItem("donorToken")
             return {
                //...donorInitialState,
                donorTokens : '',
                _donorId: ''
             }

        default:
            return state
    }
}

export const donorProfileReducer = (state = donorProfileState, action) => {
    switch(action.type){
        case "DONOR_VIEW_PROFILE":
            return {
                ...donorProfileState,
                donorProfile : action.payload,
                
            }
        case 'UPDATE_DONOR_PROFILE' : 
            return {
                ...donorProfileState,
                donorProfile : action.payload
            }
        case "DONOR_SEARCH":
            return { 
                ...donorProfileState,
                specificDonor : action.donor.data
            }
        default :
            return state
    }
}