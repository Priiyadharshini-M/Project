import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import axios from 'axios'
import { useDispatch } from 'react-redux'
//import { setAdminLogin } from '../Store/Actions/authAction'
import { storeAdminToken } from '../Store/Actions/action'


const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ adminCredentials, setAdminCredentials] = useState({
      adminEmail : '',
      adminPassword : ''
    })
    //const { adminEmail, adminPassword } = adminCredentials
    
    const changeCredentialHandler = (event) => {
        setAdminCredentials((prevState) => ({
        ...prevState,
        [event.target.name] : event.target.value
      }))
    }
    const submitHandler = (event) => {
      event.preventDefault()
      console.log("admin credentials : ",adminCredentials)
      //dispatch(setAdminLogin())
      dispatch(storeAdminToken(adminCredentials))
      navigate('/admin/home')
    }
    return(<>
      <form  onSubmit={ submitHandler }>
        <Box>
          <Typography padding={1} variant='h4' textAlign="center">
           Admin Login
          </Typography>
          <TextField type={'email'} name='adminEmail' sx={{marginLeft:"30%"}}value={adminCredentials.adminEmail} onChange={changeCredentialHandler} placeholder='EmailID' margin='normal' required/>
          <TextField type={'password'} name='adminPassword' value={adminCredentials.adminPassword} onChange={changeCredentialHandler} placeholder='Password' margin='normal' required/>
          <Button type='submit' variant='contained' color='warning' style={{margin : '7% -20%'}}>Login</Button>
        </Box>
      </form>
      
    </>)
 }

 export default AdminLogin