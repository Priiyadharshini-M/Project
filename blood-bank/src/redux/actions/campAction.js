import axios from 'axios'
import { url } from "../../api/index"

export const addCamp = (camp) => {
    return (dispatch, getState) => {
        axios.post(`${url}/camps/addCamp`, { ...camp })
            .then(camps => {
                dispatch({
                    type: "ADD_CAMPS",
                    camps
                })
            })
            .catch(err => {
                console.log("error", err.message)
            })
    }
}

export const viewCamps = (camps) => {
    return (dispatch) => {
        axios.get(`${url}/camps`)
            .then(camps => {
                dispatch({
                    type: "VIEW_CAMPS",
                    camps: camps.data.camps
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

export const updateCamp = (updatedCamp, id) => {
    return (dispatch) => {
        axios.put(`${url}/camps/update/${id}`, updatedCamp)
            .then(camps => {
                dispatch({
                    type: "UPDATE_CAMPS",
                    camps
                })
            })
            .catch(err => {
                console.log("error", err.message)
            })
    }
}

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
                console.log("error", err.message)
            })
    }
}