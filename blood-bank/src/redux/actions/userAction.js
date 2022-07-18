import axios from 'axios'
import { url } from "../../api/index"

//to view user profile
export const viewProfile = (id) => {
    return (dispatch) => {
        axios.get(`${url}/users/${id}`)
            .then(user => {
                dispatch({
                    type: "VIEW_PROFILE",
                    payload: user.data.user
                })
            })
            .catch(err => {
                dispatch({
                    type: "VIEW_PROFILE_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//to delete user profile
export const deleteProfile = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/users/${id}`)
            .then(msg => {
                dispatch({
                    type: "DELETE_PROFILE"
                })
            })
            .catch(err => {
                dispatch({
                    type: "DELETE_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//to update existing user profile
export const updateProfile = (userDetails, userId) => {
    return (dispatch) => {
        axios.put(`${url}/users/${userId}`, userDetails)
            .then(() => {
                dispatch({
                    type: "UPDATE_PROFILE",
                    payload: userDetails
                })
            })
            .catch(err => {
                dispatch({
                    type: "UPDATE_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//to register as user
export const signIn = (user) => {
    return async (dispatch) => {
        await axios.post(`${url}/users`, user)
            .then(user => {
                dispatch({
                    type: "SIGN_IN"
                })
            })
            .catch(err => {
                dispatch({
                    type: "SIGNIN_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//load user while refreshing
export const loadUser = () => {
    return (dispatch, getState) => {
        const token = getState().user.token
        if (token) {
            return dispatch({
                type: "USER_LOADED",
                token,
            })
        }
        else
            return null
    }
}

//to login as user
export const logIn = (credentials) => {
    return async (dispatch) => {
        await axios.post(`${url}/users/login`, credentials)
            .then(token => {
                sessionStorage.setItem("token", token.data.accessToken)
                dispatch({
                    type: "LOG_IN",
                    token: token.data.accessToken
                })
            })
            .catch(err => {
                dispatch({
                    type: "LOGIN_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//to log out user
export const logOut = () => {
    return (dispatch) => {
        dispatch({
            type: "LOG_OUT"
        })
    }
}