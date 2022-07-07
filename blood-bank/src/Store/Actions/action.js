import axios from 'axios'
import { url, setHeaders } from "../../api/index"
import { setLogin } from './authAction'

//for users
export const viewProfile = (id) =>{
    return (dispatch) =>{
        axios.get(`${url}/users/${id}`)
        .then(user =>{
            console.log("from viewProfile action",user.data.user)
            dispatch({
                type : "VIEW_PROFILE",
                payload : user.data.user
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}

export const updateProfile = (userDetails,userId) => {
    console.log("user details : ",userDetails)
    console.log("id : ",userId)
    return (dispatch) => {
        axios.put(`${url}/users/${userId}`,userDetails)
        .then(() => { 
            dispatch({
                type : "UPDATE_PROFILE",
                payload : userDetails
            })
        })
        .catch( err => console.log("error : ",err))
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
        const token = getState().user.token
        //const _id = getState().user._id
        console.log("loaded user"+token)
        if(token)
        {
          return dispatch({
               type : "USER_LOADED",
               token,
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
            //const tokendata = JSON.stringify(token.data)
            console.log("token is "+token.data.accessToken)
            //console.log("id is"+JSON.stringify(token.data.user._id))
            localStorage.setItem("token",token.data.accessToken)

            dispatch({
                type : "LOG_IN",
                token : token.data.accessToken
                //_id : token.data.user._id
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

//for admin
export const deleteAdminToken = () => {
    return (dispatch) => {
        dispatch({
        type : "DELETE_ADMIN_TOKEN"
       })
    }
}

export const storeAdminToken = (admin) => {
    return(dispatch) => {
        axios.post(`${url}/admin/login`,admin)
        .then( token => {
            console.log("admin token",token.data)
            localStorage.setItem("adminsToken", token.data.accessToken)
            return dispatch({
                type : "SET_ADMIN_TOKEN",
                token : token.data.accessToken
            })
        })
        .catch( err => console.log(err.response.data,err.response.status))
    }
}
export const loadAdmin = () => {
    return(dispatch, getState) => {
        const token = getState().admin.adminToken
        if(token){
            return dispatch({
            type : "LOAD_ADMIN",
            token
        })
        } 
    }
}
export const viewAdminProfile = (adminId) => {
    return(dispatch) => {
        axios.get(`${url}/admin/${adminId}`)
        .then((admin) => {
            console.log("datas ... ",admin.data.admin)
            return dispatch({
                type : "VIEW_ADMIN_PROFILE",
                payload : admin.data.admin
            })
        })
        .catch( err => console.log(err) )
    }
}
export const updateAdminProfile = (adminDetails,adminId) => {
    console.log("admin details : ",adminDetails)
    console.log("id : ",adminId)
    return (dispatch) => {
        axios.put(`${url}/admin/${adminId}`,adminDetails)
        .then(() => { 
            return dispatch({
                type : "UPDATE_ADMIN_PROFILE",
                payload : adminDetails
            })
        })
        .catch( err => console.log("error : ",err))
    }
}

//for donors
export const donorSignIn = (donor) =>{
    return (dispatch, getState) =>{
        console.log("donor details sent : "+donor)
        axios.post(`${url}/donors/addDonor`, donor)
        .then(donor =>{
            console.log("token is"+donor.data)
            //localStorage.setItem("token",token.data.token)

            dispatch({
                type : "DONOR_SIGN_IN",
                //tokens : token.data.token
                donor
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}

export const search = (searchCredentials) => {
    return(dispatch) => {
        console.log("search credentials sent: "+searchCredentials)
        axios.post(`${url}/donors/specificDonor`,searchCredentials)
        .then(donor => {
            console.log("filtered data"+donor.data)
            dispatch({
                type : "DONOR_SEARCH",
                donor : donor
            })
        })
    }
}
export const loadDonor = () => {
    return(dispatch, getState) => {
        console.log("entered")
        const donorToken = getState().donor.donorToken
        //const _id = getState().user._id
        console.log("loaded"+donorToken)
        if(donorToken)
        {
          return dispatch({
               type : "DONOR_LOADED",
               donorToken,
               //_id 
            })
        }
        else 
        return null
    }
}

export const donorLogIn = (credentials) =>{
    console.log("entered donor login")
    console.log("donor credentials",credentials)
    return (dispatch) =>{
        axios.post(`${url}/donors/donorlogin`, credentials)
        .then(token =>{
            //const tokendata = JSON.stringify(token.data)
            console.log("token is "+token.data.accessToken)
            //console.log("id is"+JSON.stringify(token.data.user._id))
            localStorage.setItem("donorToken",token.data.accessToken)

            dispatch({
                type : "DONOR_LOG_IN",
                donorToken : token.data.accessToken
                //_id : token.data.user._id
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}

export const donorLogOut = () => {
    return (dispatch) => {
        dispatch({
            type : "DONOR_LOG_OUT"
        })
    }
}
export const viewDonorProfile = (id) =>{
    return (dispatch) =>{
        axios.get(`${url}/donors/${id}`)
        .then(donor =>{
            console.log("from viewProfile action",donor.data.donor)
            dispatch({
                type : "DONOR_VIEW_PROFILE",
                payload : donor.data.donor
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
}
export const updateDonorProfile = (donorDetails,donorId) => {
    console.log("user details : ",donorDetails)
    console.log("id : ",donorId)
    return (dispatch) => {
        axios.put(`${url}/donors/update/${donorId}`,donorDetails)
        .then(() => { 
            dispatch({
                type : "UPDATE_DONOR_PROFILE",
                payload : donorDetails
            })
        })
        .catch( err => console.log("error : ",err))
    }
}