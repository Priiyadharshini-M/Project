import { Button, SnackbarContent, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { viewAdminProfile } from '../Store/Actions/action'

 const AdminProfile = () => {
  const adminId = useSelector( state => state.admin._adminId )
  const adminProfile = useSelector( state => state.adminProfile.adminProfile )
  console.log("admin profile : ",adminProfile)
  const dispatch = useDispatch()
    useEffect(() => {
      dispatch(viewAdminProfile(adminId))
    },[adminId])
    return(<>
      Admin Profile Page
      <Box sx={{
            width: 400,
            height: 370,
            margin: 'auto',
            marginTop:'90px'
        }}>
      <Stack spacing={1} sx={{ maxWidth: 600 }}>
            <SnackbarContent message={adminProfile.adminName} action="Admin Name"/>
            <SnackbarContent message={adminProfile.adminEmail} action="Admin Email" />
      </Stack>
        <Button LinkComponent={Link} to='/admin/my-profile/edit-profile' variant='outlined' sx={{ margin: 1, borderRadius: 3, marginLeft: 20, marginTop: 3 }} color='warning'>Edit</Button>
        </Box>
    </>)
 }

 export default AdminProfile