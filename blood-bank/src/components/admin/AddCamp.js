import React from 'react'
import { Box, TextField, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addCamp, updateCamp } from "../../redux/actions/campAction"

export const AddCamp = ({ campDetails, setCampDetails }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeHandler = (event) => {
        setCampDetails((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
    }
    const submitHandler = (event) => {
        event.preventDefault()
        if (campDetails._id) {
            const id = campDetails._id
            const updatedCamp = {
                campName: campDetails.campName,
                hospitalName: campDetails.hospitalName,
                address: campDetails.address,
                startDate: campDetails.startDate,
                endDate: campDetails.endDate
            }
            dispatch(updateCamp(updatedCamp, id))
            navigate('/admin/camps')
        }
        else {
            dispatch(addCamp(campDetails))
            navigate('/admin/camps')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <Box sx={{ border: 3, width: "50%", height: "650px", marginLeft: "25%", marginTop: "5%", borderRadius: 15 }}>
                <Typography variant="h4" sx={{ marginLeft: "32%", marginTop: "5%", width: "70%" }}>Camp details</Typography>
                <TextField type="text" variant="standard" name="campName" value={campDetails.campName} onChange={changeHandler} required label="Camp Name" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                <TextField type="text" variant="standard" name="hospitalName" value={campDetails.hospitalName} onChange={changeHandler} required label="Hospital Name" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                <TextField type="text" variant="standard" name="address" value={campDetails.address} onChange={changeHandler} required label="City" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />

                <TextField type="date" variant="standard" name="startDate" value={campDetails.startDate} onChange={changeHandler} required label="Start Date" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                <TextField type="date" variant="standard" name="endDate" value={campDetails.endDate} onChange={changeHandler} required label="End Date" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                <Button color="inherit" type="submit" sx={{ width: "20%", marginLeft: "40%", marginTop: "10%", backgroundColor: "black", color: "green", border: 3 }}>Register</Button>
            </Box>
        </form>
    )
}