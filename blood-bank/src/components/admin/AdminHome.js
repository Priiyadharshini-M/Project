import { useSelector, useDispatch } from "react-redux"
import { viewAdminProfile } from "../../redux/actions/adminAction"
import { useEffect } from "react"
import { Typography } from "@mui/material"

export const AdminHome = () => {
  const adminId = useSelector(state => state.admin._adminId)
  const adminProfile = useSelector(state => state.adminProfile.adminProfile)
  const donors = useSelector(state => state.donorProfile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(viewAdminProfile(adminId)) //view admin profile
  }, [dispatch, adminId])

  return (
    <div>
      <Typography variant='h4' sx={{ 'textAlign': 'center' }}>Welcome {adminProfile.adminName}</Typography>
    </div>
  )
}