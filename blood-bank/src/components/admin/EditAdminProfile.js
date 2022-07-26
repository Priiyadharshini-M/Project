import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateAdminProfile, viewAdminProfile } from "../../redux/actions/adminAction"
import { useNavigate } from 'react-router-dom'

const AdminEditProfile = () => {
  const adminId = useSelector(state => state.admin._adminId)
  const adminProfile = useSelector(state => state.adminProfile.adminProfile)
  const adminUpdateSuccess = useSelector(state => state.adminProfile)
  const { adminName, adminEmail, adminPassword } = adminProfile
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const [adminCredentials, setAdminCredentials] = useState({
    adminEmail,
    adminPassword
  })

  useEffect(() => {
    if (adminId)
      dispatch(viewAdminProfile(adminId)) //view particular donor profile
  }, [dispatch])

  useEffect(() => {
    if (adminProfile)
      setAdminCredentials({
        adminName,
        adminEmail,
        adminPassword
      })
    if (adminUpdateSuccess.adminUpdateSuccess) {
      alert("Successfully updated")
      navigate('/admin/my-profile')
    }
  }, [adminProfile, adminUpdateSuccess.adminUpdateSuccess])

  const changeCredentialHandler = (event) => {
    setAdminCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  //to update existing donor details
  const updateHandler = (event) => {
    event.preventDefault()
    setFormError(() => (validate(adminCredentials))) //front end validation
    setIsSubmit(true)
    if (Object.keys(formError).length === 0 && isSubmit) {
      dispatch(updateAdminProfile(adminCredentials, adminId))
    }
  }

  //to validate donor input fields
  const validate = (values) => {
    const errors = {}
    const emailRegex = /^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$/
    const passwordRegex = /^[a-zA-Z0-9]{8,20}$/
    const nameRegex = /^[a-zA-Z ]+$/

    if (!values.adminName) {
      errors.adminName = "**Admin name is required"
    }
    else if (!nameRegex.test(values.adminName)) {
      errors.adminName = "**Name should contain only alphabets and space"
    }
    if (!values.adminEmail) {
      errors.adminEmail = "**Email is required"
    }
    else if (!emailRegex.test(values.adminEmail)) {
      errors.adminEmail = "**Invalid email"
    }
    if (!values.adminPassword) {
      errors.adminPassword = "**Password is required"
    }
    else if (!passwordRegex.test(values.adminPassword)) {
      errors.adminPassword = "**Password should have max of 20 and min of 8 characters and no special characters"
    }
    return errors
  }


  return (<>
    <form onSubmit={updateHandler}>
      <Box sx={{ marginLeft: '40%' }}>
        <Typography padding={1} variant='h4' >
          Admin Details
        </Typography>
        <TextField type={'text'} name='adminName' value={adminCredentials.adminName || ""} onChange={changeCredentialHandler} placeholder='Admin Name' margin='normal' required />
        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.adminName}</Typography>
        <TextField type={'text'} name='adminEmail' value={adminCredentials.adminEmail || ""} onChange={changeCredentialHandler} placeholder='EmailID' margin='normal' required />
        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.adminEmail}</Typography>
        <TextField type={'password'} name='adminPassword' value={adminCredentials.adminPassword || ""} onChange={changeCredentialHandler} placeholder='Password' margin='normal' required />
        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.adminPassword}</Typography>
        <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{adminUpdateSuccess.adminUpdateMsg}</Typography>
        <Button type='submit' variant='contained' color='warning' style={{ margin: '3% 0' }}>Update</Button>
      </Box>
    </form>
  </>)
}

export default AdminEditProfile