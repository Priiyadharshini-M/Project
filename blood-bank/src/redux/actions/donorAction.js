import axios from 'axios'
import { url } from "../../api/index"

//register donor
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
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//filter and search donors
export const search = (searchCredentials) => {
    return (dispatch) => {
        axios.post(`${url}/donors/specificDonor`, searchCredentials)
            .then(donor => {
                dispatch({
                    type: "DONOR_SEARCH",
                    donor: donor
                })
            })
            .catch(err => {
                dispatch({
                    type: "DONOR_SEARCH_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//to get all blood's count
export const bloodCount = () => {
    return (dispatch) => {
        axios.get(`${url}/donors/donorCount`)
            .then(count => {
                dispatch({
                    type: "BLOOD_COUNT",
                    count: count.data.donor
                })
            })
    }
}

//to view all donors
export const allDonors = () => {
    return (dispatch) => {
        axios.get(`${url}/donors/`)
            .then(donors => {
                dispatch({
                    type: "ALL_DONORS",
                    donors: donors.data.donor
                })
            })
            .catch(err => {
                dispatch({
                    type: "ALL_DONORS_ERROR",
                    msg: "**No Donors found"
                })
            })
    }
}

//to load donor while refreshing
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

//to login as donor
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
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//to log out donor
export const donorLogOut = () => {
    return (dispatch) => {
        dispatch({
            type: "DONOR_LOG_OUT"
        })
    }
}

//to view particular donor profile
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
                dispatch({
                    type: "DONOR_VIEW_PROFILE_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//to delete donor profile
export const deleteDonorProfile = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/donors/delete/${id}`)
            .then(msg => {
            })
            .catch(err => {
                dispatch({
                    type: "DONOR_DELETE_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//update existing donor profile
export const updateDonorProfile = (donorDetails, donorId) => {
    return (dispatch) => {
        axios.put(`${url}/donors/update/${donorId}`, donorDetails)
            .then(() => {
                dispatch({
                    type: "UPDATE_DONOR_PROFILE",
                    payload: donorDetails
                })
            })
            .catch(err => {
                dispatch({
                    type: "DONOR_UPDATE_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}