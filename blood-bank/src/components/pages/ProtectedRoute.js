import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    let auth = false
    const user = sessionStorage.getItem("donorToken")
    const donor = sessionStorage.getItem("token")

    if (user || donor) {
        auth = true
    }
    return (
        auth ? children : <Navigate to="/login" />
    )
}

export default ProtectedRoute