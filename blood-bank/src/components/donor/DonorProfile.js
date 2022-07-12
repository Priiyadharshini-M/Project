import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewDonorProfile } from '../../redux/actions/donorAction'
import { SnackbarContent, Button, Box, Stack, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const DonorProfile = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const donor = useSelector( state => state.donor._donorId )
    const donorProfile = useSelector( state => state.donorProfile.donorProfile)
    useEffect(() => {
       dispatch(viewDonorProfile(donor))
    },[dispatch,donor])

    const editHandler = () =>{
        navigate('/my-profile/edit-donorprofile')
    }

    return(
        <>
        <Box sx={{
            width: 400,
            height: 780,
            margin: 'auto',
            marginTop:'90px',
            backgroundColor:'black'
        }}>
            <Typography variant="h4" marginLeft="25%" marginBottom="3%" color="white">Profile Page</Typography>
      <Stack spacing={1} sx={{ maxWidth: 600 }}>
            <SnackbarContent action="User Name" message={donorProfile.userName} sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.email} action="User Email" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.contact} action="User Contact" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.address} action="User Address" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.city} action="Current city" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.bloodGroup} action="Blood Group" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.gender} action="Gender" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.age} action="Age" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.lastDonateDate} action="Last Donated Date" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.allergies} action="Allergies" sx={{backgroundColor:"white", color:'black'}} />
            <SnackbarContent message={donorProfile.disease} action="Disease" sx={{backgroundColor:"white", color:'black'}} />
        </Stack>
        <Button LinkComponent={Link} to='/my-profile/edit-donorprofile' onClick={() => editHandler()} variant='outlined' sx={{ margin: 1, borderRadius: 3, marginLeft: 20, marginTop: 3, backgroundColor:"red"}} >Edit</Button>
        </Box>
        </>
    )
}