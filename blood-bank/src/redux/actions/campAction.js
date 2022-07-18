import axios from 'axios'
import { url } from "../../api/index"

//add new camp
export const addCamp = (camp) => {
    return (dispatch, getState) => {
        axios.post(`${url}/camps/addCamp`, camp)
            .then(camps => {
                dispatch({
                    type: "ADD_CAMPS",
                    camps
                })
            })
            .catch(err => {
                dispatch({
                    type: "ADD_CAMP_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//view all camps added
export const viewCamps = (camps) => {
    return async (dispatch) => {
        await axios.get(`${url}/camps`)
            .then(camps => {
                dispatch({
                    type: "VIEW_CAMPS",
                    camps: camps.data.camps
                })
            })
            .catch(err => {
                dispatch({
                    type: "VIEW_CAMP_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//update existing camp
export const updateCamp = (updatedCamp, id) => {
    return (dispatch) => {
        axios.put(`${url}/camps/update/${id}`, updatedCamp)
            .then(() => {
                dispatch({
                    type: "UPDATE_CAMPS"
                })
            })
            .catch(err => {
                dispatch({
                    type: "UPDATE_CAMP_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//delete camp
export const deleteCamp = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/camps/delete/${id}`)
            .then(() => {
                dispatch({
                    type: "DELETE_CAMPS",
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: "DELETE_CAMP_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}

//view particular camp
export const viewCamp = (id) => {
    return async (dispatch) => {
        await axios.get(`${url}/camps/${id}`)
            .then(camps => {
                dispatch({
                    type: "VIEW_CAMP",
                    camps: camps.data.camps
                })
            })
            .catch(err => {
                dispatch({
                    type: "CAMP_ERROR",
                    msg: err.response.data.errorMessage
                })
            })
    }
}