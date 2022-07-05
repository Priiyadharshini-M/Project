import axios from 'axios'
import React,{ useState } from 'react'
import { url } from "../../api"

export const viewProfile = () =>{
    return (dispatch) =>{
        axios.get(`${url}/users`)
        .then(user =>{
            dispatch({
                type : "VIEW_PROFILE",
                user
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}


export const signIn = (user) =>{
    return (dispatch, getState) =>{
        axios.post(`${url}/users`, user)
        .then(token =>{
            console.log("token is"+token.data.token)
            //localStorage.setItem("token",token.data.token)

            dispatch({
                type : "SIGN_IN",
                tokens : token.data.token
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}

//for camps
export const addCamp = (camp) =>{
    return (dispatch, getState) =>{
        axios.post(`${url}/camps/addCamp`, camp)
        .then(camps =>{
            dispatch({
                type : "ADD_CAMPS",
                camps
            })
        })
        .catch(err =>{
            console.log("error",err.message)
        })
    }
}

export const viewCamps = (camps) =>{
    return (dispatch) =>{
        axios.get(`${url}/camps`)
        .then(camps =>{
            //console.log("camps are",camps.data)
            dispatch({
                type : "VIEW_CAMPS",
                camps:camps.data.camps
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}

export const updateCamp = (updatedCamp, id) =>{
    console.log("updated camp",updatedCamp)
    return (dispatch) =>{
        axios.put(`${url}/camps/update/${id}`, updatedCamp)
        .then(camps =>{
            dispatch({
                type : "UPDATE_CAMPS",
                camps
            })
        })
        .catch(err =>{
            console.log("error",err.message)
        })
    }
}

export const deleteCamp = (id) =>{
    return (dispatch) =>{
        axios.delete(`${url}/camps/delete/${id}`)
        .then(() =>{
            dispatch({
                type : "DELETE_CAMPS",
                id
            })
        })
        .catch(err =>{
            console.log("error",err.message)
        })
    }
}