import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewProfile } from '../Store/Actions/action'
import { SnackbarContent, Button, Box, Stack, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MyProfile = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector( state => state.user._userId )
    const profile = useSelector( state => state.profile.profile)
    console.log("reducer : ",user)
    console.log("reducer profile is:", profile)
    useEffect(() => {
       dispatch(viewProfile(user))
    },[dispatch,user])

    const editHandler = () =>{
        navigate('/my-profile/edit-profile')
    }
    return(
        <>
      <Box sx={{
            width: 400,
            height: 330,
            margin: 'auto',
            marginTop:'90px',
            backgroundColor:'black'
        }}>
            <Typography variant="h4" marginLeft="25%" marginBottom="3%" color="white">Profile Page</Typography>
      <Stack spacing={1} sx={{ maxWidth: 600 }}>
            <SnackbarContent action="User Name" message={profile.userName} sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={profile.userEmail} action="User Email" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={profile.userContact} action="User Contact" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={profile.userAddress} action="User Address" sx={{backgroundColor:"white", color:'black'}} />
        </Stack>
        <Button LinkComponent={Link} to='/my-profile/edit-profile' onClick={() => editHandler()} variant='outlined' sx={{ margin: 1, borderRadius: 3, marginLeft: 20, marginTop: 3, backgroundColor:"red"}} >Edit</Button>
        </Box>
    </>
        // Name : {profile.userName}
       
        // Email Id : {profile.userEmail}
        
        // Contact : {profile.userContact}
        
        // </>
    )
}

