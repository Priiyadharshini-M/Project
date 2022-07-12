import axios from 'axios'
import { url } from "../../api/index"

export const deleteAdminToken = () => {
    return (dispatch) => {
        dispatch({
            type: "DELETE_ADMIN_TOKEN"
        })
    }
}

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
            .catch(err => console.log(err.response.data, err.response.status))
    }
}
export const loadAdmin = () => {
    return (dispatch, getState) => {
        const token = getState().admin.adminToken
        if (token) {
            return dispatch({
                type: "LOAD_ADMIN",
                token
            })
        }
    }
}
export const viewAdminProfile = (adminId) => {
    return (dispatch) => {
        axios.get(`${url}/admin/${adminId}`)
            .then((admin) => {
                return dispatch({
                    type: "VIEW_ADMIN_PROFILE",
                    payload: admin.data.admin
                })
            })
            .catch(err => console.log(err))
    }
}
export const updateAdminProfile = (adminDetails, adminId) => {
    return (dispatch) => {
        axios.put(`${url}/admin/${adminId}`, adminDetails)
            .then(() => {
                return dispatch({
                    type: "UPDATE_ADMIN_PROFILE",
                    payload: adminDetails
                })
            })
            .catch(err => console.log("error : ", err))
    }
}