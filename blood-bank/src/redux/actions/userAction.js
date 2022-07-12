import axios from 'axios'
import { url } from "../../api/index"

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
                console.log(err.message)
            })
    }
}

export const updateProfile = (userDetails, userId) => {
    return (dispatch) => {
        axios.put(`${url}/users/${userId}`, userDetails)
            .then(() => {
                dispatch({
                    type: "UPDATE_PROFILE",
                    payload: userDetails
                })
            })
            .catch(err => console.log("error : ", err))
    }
}

export const signIn = (user) => {
    return async (dispatch) => {
        await axios.post(`${url}/users`, user)
            .then(user => {
                dispatch({
                    type: "SIGN_IN",
                    user
                })
            })
            .catch(err => {
                dispatch({
                    type: "SIGNIN_ERROR",
                    msg: "**This email Id has already been registered"
                })

                console.log(err.message)
            })
    }
}

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
                console.log("error code : ", err.response.status)
                dispatch({
                    type: "LOGIN_ERROR",
                    msg: "**Please enter correct email Id and password"
                })
                console.log(err.message)
            })
    }
}

export const logOut = () => {
    return (dispatch) => {
        dispatch({
            type: "LOG_OUT"
        })
    }
}