import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewProfile } from '../../redux/actions/userAction'
import { SnackbarContent, Button, Box, Stack, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../redux/actions/userAction';

export const MyProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const profile = useSelector(state => state.profile.profile)
    const errMsg = useSelector(state => state.profile)

    useEffect(() => {
        dispatch(viewProfile(user._userId)) //diapatch view particular profile action
    }, [dispatch, user._userId])

    const editHandler = () => {
        navigate('/my-profile/edit-profile')
    }

    const deleteHandler = () => {
        dispatch(deleteProfile(user._userId)) //diapatch delete particular profile action
    }

    return (
        <>
            <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{errMsg.viewProfileMsg}</Typography>
            <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{errMsg.deleteMsg}</Typography>
            <Box sx={{
                width: 400,
                height: 370,
                margin: 'auto',
                marginTop: '90px',
                backgroundColor: 'black',
                marginBottom: '90px'
            }}>
                <Typography variant="h4" marginLeft="25%" marginBottom="3%" color="white">Profile Page</Typography>
                <Stack spacing={1} sx={{ maxWidth: 600 }}>
                    <SnackbarContent action="User Name" message={profile.userName} sx={{ backgroundColor: "white", color: 'black' }} />
                    <SnackbarContent message={profile.userEmail} action="User Email" sx={{ backgroundColor: "white", color: 'black' }} />
                    <SnackbarContent message={profile.userContact} action="User Contact" sx={{ backgroundColor: "white", color: 'black' }} />
                    <SnackbarContent message={profile.userAddress} action="User Address" sx={{ backgroundColor: "white", color: 'black' }} />
                </Stack>
                <Button LinkComponent={Link} to='/my-profile/edit-profile' onClick={() => editHandler()} variant='outlined' sx={{ margin: 1, borderRadius: 3, marginLeft: 15, marginTop: 3, backgroundColor: "red" }} >Edit</Button>
                <Button onClick={() => deleteHandler()} variant='outlined' sx={{ margin: 1, borderRadius: 3, marginLeft: 0, marginTop: 3, backgroundColor: "red" }} >Delete</Button>
            </Box>
        </>
    )
}

