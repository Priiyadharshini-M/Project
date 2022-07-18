import { Button, SnackbarContent, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { viewAdminProfile, deleteAdminProfile } from '../../redux/actions/adminAction'

const AdminProfile = () => {
  const adminId = useSelector(state => state.admin._adminId)
  const adminProfile = useSelector(state => state.adminProfile.adminProfile)
  const errMsg = useSelector(state => state.adminProfile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(viewAdminProfile(adminId)) //vview admin profile
  }, [adminId])

  const deleteHandler = () => {
    dispatch(deleteAdminProfile(adminId)) //to delete admin profile
  }

  return (<>
    Admin Profile Page
    <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{errMsg.adminViewProfileMsg}</Typography>
    <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{errMsg.adminDeleteMsg}</Typography>
    <Box sx={{
      width: 400,
      height: 370,
      margin: 'auto',
      marginTop: '90px'
    }}>
      <Stack spacing={1} sx={{ maxWidth: 600 }}>
        <SnackbarContent message={adminProfile.adminName} action="Admin Name" />
        <SnackbarContent message={adminProfile.adminEmail} action="Admin Email" />
      </Stack>
      <Button LinkComponent={Link} to='/admin/my-profile/edit-profile' variant='outlined' sx={{ margin: 1, borderRadius: 3, marginLeft: 20, marginTop: 3 }} color='warning'>Edit</Button>
      <Button onClick={() => deleteHandler()} variant='outlined' color='warning' sx={{ margin: 1, borderRadius: 3, marginLeft: 0, marginTop: 3 }} >Delete</Button>
    </Box>
  </>)
}

export default AdminProfile