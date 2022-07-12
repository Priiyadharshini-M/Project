import axios from 'axios'
import { url } from "../../api/index"

export const donorSignIn = (donor) => {
    return async (dispatch, getState) => {
        await axios.post(`${url}/donors/addDonor`, donor)
            .then(donor => {
                dispatch({
                    type: "DONOR_SIGN_IN",
                    donor
                })
            })
            .catch(err => {
                dispatch({
                    type: "DONOR_SIGNIN_ERROR",
                    msg: "**This email Id has been registered already for donor"
                })
                console.log(err.message)
            })
    }
}

export const search = (searchCredentials) => {
    return (dispatch) => {
        axios.post(`${url}/donors/specificDonor`, searchCredentials)
            .then(donor => {
                dispatch({
                    type: "DONOR_SEARCH",
                    donor: donor
                })
            })
    }
}
export const loadDonor = () => {
    return (dispatch, getState) => {
        const donorToken = getState().donor.donorToken
        if (donorToken) {
            return dispatch({
                type: "DONOR_LOADED",
                donorToken,
            })
        }
        else
            return null
    }
}

export const donorLogIn = (credentials) => {
    return async (dispatch) => {
        await axios.post(`${url}/donors/donorlogin`, credentials)
            .then(token => {
                sessionStorage.setItem("donorToken", token.data.accessToken)

                dispatch({
                    type: "DONOR_LOG_IN",
                    donorToken: token.data.accessToken
                })
            })
            .catch(err => {
                dispatch({
                    type: "DONOR_LOGIN_ERROR",
                    msg: "**Please enter correct donor email Id and password"
                })
                console.log(err.message)
            })
    }
}

export const donorLogOut = () => {
    return (dispatch) => {
        dispatch({
            type: "DONOR_LOG_OUT"
        })
    }
}
export const viewDonorProfile = (id) => {
    return (dispatch) => {
        axios.get(`${url}/donors/${id}`)
            .then(donor => {
                dispatch({
                    type: "DONOR_VIEW_PROFILE",
                    payload: donor.data.donor
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}
export const updateDonorProfile = (donorDetails, donorId) => {
    return (dispatch) => {
        axios.put(`${url}/donors/update/${donorId}`, donorDetails)
            .then(() => {
                dispatch({
                    type: "UPDATE_DONOR_PROFILE",
                    payload: donorDetails
                })
            })
            .catch(err => console.log("error : ", err))
    }
}