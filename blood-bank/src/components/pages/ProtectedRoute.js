import jwtDecode from 'jwt-decode'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ role1, role2, children }) => {

  let user, admin, donor

  //to get and check user token
  const userToken = sessionStorage.getItem('token')
  if (userToken) {
    user = jwtDecode(userToken)
    if ((user.id && user.role === role1))
      return children
  }

  //to get and check admin token
  const adminToken = sessionStorage.getItem('adminsToken')
  if (adminToken) {
    admin = jwtDecode(adminToken)
    if (admin.id && admin.role === role1)
      return children
  }

  //to get and check donor token
  const donorToken = sessionStorage.getItem('donorToken')
  if (donorToken) {
    donor = jwtDecode(donorToken)
    if ((donor.id && donor.role === role2))
      return children
  }

  if (role1 === "admin") {
    return <Navigate to='/admin/login' replace />
  }

  else if (role1 === "user" || role2 === "donor") {
    return <Navigate to='/login' replace />
  }

}

export default ProtectedRoute