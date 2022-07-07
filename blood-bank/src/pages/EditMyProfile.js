import { Button, TextareaAutosize, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, viewProfile } from '../Store/Actions/action'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const userId = useSelector( state => state.user._userId )
    const profile = useSelector( state => state.profile.profile )
    const { userName, userEmail, userPassword, userContact, userAddress } = profile
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userCredentials, setUserCredentials] = useState({
      userName,
      userEmail,
      userPassword,
      userContact,
      userAddress
    })

    useEffect(() => {
      dispatch(viewProfile(userId))
    },[dispatch])
    
    useEffect(() => {
        if(profile)
        setUserCredentials({
          userName,
          userEmail,
          userPassword,
          userContact,
          userAddress
        })
    },[profile])
    
    const changeCredentialHandler = (event) => {
        setUserCredentials((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }
    const updateHandler = (event) => {
        event.preventDefault()
        dispatch(updateProfile(userCredentials, userId))
        navigate('/my-profile') 
    }
    return(<>
    <form onSubmit={ updateHandler }>
        <Box>
          <Typography padding={1} variant='h4' textAlign="center">
          My Details
          </Typography>
          <TextField type={'text'} name='userName' value={userCredentials.userName || ""}  onChange={changeCredentialHandler} placeholder='Username' margin='normal' required/> 
          <TextField type={'email'} name='userEmail' value={userCredentials.userEmail || ""} onChange={changeCredentialHandler} placeholder='EmailID' margin='normal' required/>
          <TextField type={'password'} name='userPassword' value={userCredentials.userPassword || ""} onChange={changeCredentialHandler} placeholder='Password' margin='normal' required/>
          <TextField type={'text'} name='userContact' value={userCredentials.userContact || ""}  onChange={changeCredentialHandler} placeholder='Contact Number' margin='normal' required/>
          <TextareaAutosize type={'text'} name='userAddress' value={userCredentials.userAddress || ""}  onChange={changeCredentialHandler} placeholder='Address' margin='normal' required/>
          <Button type='submit' variant='contained' color='warning' style={{margin : '5% 0'}}>Update</Button>
        </Box>
      </form>
    </>)
}

export default EditProfile