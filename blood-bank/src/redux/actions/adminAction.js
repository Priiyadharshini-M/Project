import axios from 'axios'
import { url } from "../../api/index"

//delete admin token while log out
export const deleteAdminToken = () => {
    return (dispatch) => {
        dispatch({
            type: "DELETE_ADMIN_TOKEN"
        })
    }
}

//store admin token while log in
export const storeAdminToken = (admin) => {
    return (dispatch) => {
        axios.post(`${url}/admin/login`, admin)
            .then(token => {
                sessionStorage.setItem("adminsToken", token.data.accessToken)
                return dispatch({
                    type: "SET_ADMIN_TOKEN",
                    token: token.data.accessToken
                })
            })
            .catch(err => {
                dispatch({
                    type: "ADMIN_LOGIN_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//load admin while refresh
export const loadAdmin = () => {
    return (dispatch, getState) => {
        const token = getState().admin.adminToken
        if (token) {
            return dispatch({
                type: "LOAD_ADMIN",
                token
            })
        }
        else
            return null
    }
}

//view admin profile
export const viewAdminProfile = (adminId) => {
    return (dispatch) => {
        axios.get(`${url}/admin/${adminId}`)
            .then((admin) => {
                return dispatch({
                    type: "VIEW_ADMIN_PROFILE",
                    payload: admin.data.admin
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

//update existing admin profile
export const updateAdminProfile = (adminDetails, adminId) => {
    return (dispatch) => {
        axios.put(`${url}/admin/${adminId}`, adminDetails)
            .then(() => {
                return dispatch({
                    type: "UPDATE_ADMIN_PROFILE",
                    payload: adminDetails
                })
            })
            .catch(err => {
                dispatch({
                    type: "ADMIN_UPDATE_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//delete admin profile
export const deleteAdminProfile = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/admin/${id}`)
            .then(() => {
                dispatch({
                    type: "DELETE_PROFILE"
                })
            })
            .catch(err => {
                dispatch({
                    type: "ADMIN_DELETE_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}