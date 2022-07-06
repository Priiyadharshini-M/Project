import axios from 'axios'
import { url, setHeaders } from "../../api/index"
import { setLogin } from './authAction'

export const viewProfile = (id) =>{
    return (dispatch) =>{
        axios.get(`${url}/users/${id}`)
        .then(user =>{
            dispatch({
                type : "VIEW_PROFILE",
                id
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
        .then(user =>{
            console.log("token is"+user.data)
            //localStorage.setItem("token",token.data.token)

            dispatch({
                type : "SIGN_IN",
                //tokens : token.data.token
                user
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}

export const loadUser = () => {
    return(dispatch, getState) => {
        console.log("entered")
        const tokens = getState().user.tokens
        console.log("loaded"+tokens)
        if(tokens)
        {
            dispatch(setLogin())
         return dispatch({
               type : "USER_LOADED",
               tokens 
            })
        }
        else 
        return null
    }
}

export const logIn = (credentials) =>{
    return (dispatch) =>{
        axios.post(`${url}/users/login`, credentials)
        .then(token =>{
            console.log("token is"+token.data.token)
            localStorage.setItem("token",token.data.token)

            dispatch({
                type : "LOG_IN",
                tokens : token.data.token
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}

export const logOut = () => {
    return (dispatch) => {
        dispatch({
            type : "LOG_OUT"
        })
    }
}

//for camps
export const addCamp = (camp) =>{
    return (dispatch, getState) =>{
        axios.post(`${url}/camps/addCamp`, {...camp}, setHeaders())
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
        axios.get(`${url}/camps`, setHeaders())
        .then(camps =>{
            //console.log("camps are",camps.data)
            dispatch({
                type : "VIEW_CAMPS",
                camps: camps.data.camps
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
        axios.put(`${url}/camps/update/${id}`, updatedCamp, setHeaders())
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