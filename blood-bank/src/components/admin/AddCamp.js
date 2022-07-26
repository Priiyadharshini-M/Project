import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addCamp } from "../../redux/actions/campAction"
import { useSelector } from 'react-redux'

export const AddCamp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { campAddSuccess, campAddMsg } = useSelector((state) => state.camp)
    const [campDetails, setCampDetails] = useState({
        hospitalName: '',
        campName: '',
        address: '',
        startDate: '',
        endDate: ''
    })

    const changeHandler = (event) => {
        setCampDetails((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
        setFormError(() => (validate(campDetails)))
    }

    //to add new camp details
    const submitHandler = (event) => {
        event.preventDefault()
        setFormError(() => (validate(campDetails)))
        setIsSubmit(true)
        if (Object.keys(formError).length === 0 && isSubmit) {
            dispatch(addCamp(campDetails))
        }
    }

    useEffect(() => {
        if (campAddSuccess) {
            alert("Successfully added camp")
            navigate('/admin/camps')
        }
    }, [campAddSuccess])


    //validate camp input fields
    const validate = (values) => {
        const errors = {}
        const nameRegex = /^[a-zA-Z ]{3,25}$/

        if (!values.hospitalName) {
            errors.hospitalName = "**Hospital name is required"
        }
        else if (!nameRegex.test(values.hospitalName)) {
            errors.hospitalName = "**Hospital name should contain only alphabets and space.Max-25 and Min-3 characters"
        }
        if (!values.campName) {
            errors.campName = "**Camp name is required"
        }
        else if (!nameRegex.test(values.campName)) {
            errors.campName = "**Camp name should contain only alphabets and space.Max-25 and Min-3 characters"
        }
        if (!values.address) {
            errors.address = "**Address is required"
        }
        if (!values.endDate) {
            errors.endDate = "** Camp Ending date is required"
        }
        else if (values.endDate < Date.now()) {
            errors.endDate = "**Camp Ending date can't be in past and today"
        }
        if (!values.startDate) {
            errors.startDate = "** Camp Starting date is required"
        }
        else if (values.endDate < values.startDate) {
            errors.startDate = "**Camp Ending date can't be in forward of start date"
        }
        return errors

    }


    return (
        <form onSubmit={submitHandler}>
            <Box sx={{ border: 3, width: "50%", height: "690px", marginLeft: "25%", marginTop: "5%", borderRadius: 15 }}>
                <Typography variant="h4" sx={{ marginLeft: "32%", marginTop: "3%", width: "70%" }}>Camp details</Typography>
                <TextField type="text" variant="standard" name="campName" value={campDetails.campName} onChange={changeHandler} label="Camp Name" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.campName}</Typography>
                <TextField type="text" variant="standard" name="hospitalName" value={campDetails.hospitalName} onChange={changeHandler} label="Hospital Name" sx={{ marginLeft: "15%", marginTop: "3%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.hospitalName}</Typography>
                <TextField type="text" variant="standard" name="address" value={campDetails.address} onChange={changeHandler} label="City" sx={{ marginLeft: "15%", marginTop: "2%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.address}</Typography>
                <TextField type="date" variant="standard" name="startDate" value={campDetails.startDate} onChange={changeHandler} label="Start Date" sx={{ marginLeft: "15%", marginTop: "3%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.startDate}</Typography>
                <TextField type="date" variant="standard" name="endDate" value={campDetails.endDate} onChange={changeHandler} label="End Date" sx={{ marginLeft: "15%", marginTop: "3%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.endDate}</Typography>
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{campAddMsg}</Typography>
                <Button color="inherit" type="submit" sx={{ width: "20%", marginLeft: "40%", marginTop: "5%", backgroundColor: "black", color: "green", border: 3 }}>Submit</Button>
            </Box>
        </form>
    )
}