import { Button, TextareaAutosize, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, viewProfile } from '../../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const userId = useSelector(state => state.user._userId)
  const profile = useSelector(state => state.profile.profile)
  const updateSuccess = useSelector(state => state.profile)
  const { userName, userEmail, userPassword, userContact, userAddress } = profile
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [userCredentials, setUserCredentials] = useState({
    userName,
    userEmail,
    userPassword,
    userContact,
    userAddress
  })

  useEffect(() => {
    if (userId)
      dispatch(viewProfile(userId)) //view profile action
  }, [dispatch])

  useEffect(() => {
    if (profile)
      setUserCredentials({
        userName,
        userEmail,
        userPassword,
        userContact,
        userAddress
      })
    if (updateSuccess.updateSuccess) {
      alert("Successfully updated")
      navigate('/my-profile')
    }
  }, [updateSuccess.updateSuccess, profile])

  const changeCredentialHandler = (event) => {
    setUserCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const updateHandler = (event) => {
    event.preventDefault()
    setFormError(() => (validate(userCredentials))) //front end validation
    setIsSubmit(true)
    if (Object.keys(formError).length === 0 && isSubmit) {
      dispatch(updateProfile(userCredentials, userId)) //update profile action
    }
  }

  //validate input fields
  const validate = (values) => {
    const errors = {}
    const emailRegex = /^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$/
    const passwordRegex = /^[a-zA-Z0-9]{8,20}$/
    const nameRegex = /^[a-zA-Z ]+$/
    const contactRegex = /^[6-9]{1}[0-9]{9}$/

    if (!values.userName) {
      errors.userName = "**Username is required"
    }
    else if (!nameRegex.test(values.userName)) {
      errors.userName = "**Name should contain only alphabets and space"
    }
    if (!values.userEmail) {
      errors.userEmail = "**Email is required"
    }
    else if (!emailRegex.test(values.userEmail)) {
      errors.userEmail = "**Invalid email"
    }
    if (!values.userContact) {
      errors.userContact = "**Contact is required"
    }
    else if (!contactRegex.test(values.userContact)) {
      errors.userContact = "**Contact should contain 10 digits and start with 6/7/8/9"
    }
    if (!values.userPassword) {
      errors.userPassword = "**Password is required"
    }
    else if (!passwordRegex.test(values.userPassword)) {
      errors.userPassword = "**Password should have max of 20 and min of 8 characters and no special characters"
    }
    if (!values.confirmUserPassword) {
      errors.confirmUserPassword = "**This field is required"
    }
    else if (values.userPassword !== values.confirmUserPassword) {
      errors.confirmUserPassword = "**Confirm password is not matching"
    }
    return errors

  }

  return (<>
    <form onSubmit={updateHandler}>
      <Box sx={{ border: 3, width: "50%", height: "950px", marginLeft: "25%", marginTop: "5%", borderRadius: 15 }}>
        <Typography padding={1} variant='h4' textAlign="center">
          My Details
        </Typography>
        <TextField type={'text'} name='userName' value={userCredentials.userName || ""} onChange={changeCredentialHandler} placeholder='Username' sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userName}</Typography>
        <TextField type={'email'} name='userEmail' value={userCredentials.userEmail || ""} onChange={changeCredentialHandler} placeholder='EmailID' sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userEmail}</Typography>
        <TextField type={'password'} name='userPassword' value={userCredentials.userPassword || ""} onChange={changeCredentialHandler} placeholder='Password' sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userPassword}</Typography>
        <TextField type={'text'} name='userContact' value={userCredentials.userContact || ""} onChange={changeCredentialHandler} placeholder='Contact Number' sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userContact}</Typography>
        <TextareaAutosize type={'text'} name='userAddress' value={userCredentials.userAddress || ""} onChange={changeCredentialHandler} placeholder='Address' style={{ marginTop: "70px", marginLeft: "15%", width: "70%" }} />
        <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{updateSuccess.updateMsg}</Typography>
        <Button type='submit' variant='contained' sx={{ width: "20%", marginLeft: "40%", marginTop: "10%", backgroundColor: "black", color: "green", border: 3 }}>Update</Button>
      </Box>
    </form>
  </>)
}

export default EditProfile