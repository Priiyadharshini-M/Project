import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateCamp, viewCamp } from "../../redux/actions/campAction"
import { useSelector } from 'react-redux'

export const EditCamp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { id } = useParams()
    const camp = useSelector((state) => state.camp.camps)
    const campUpdateSuccess = useSelector((state) => state.camp)
    const { hospitalName, campName, address, startDate, endDate } = camp
    const [campDetails, setCampDetails] = useState({
        hospitalName,
        campName,
        address,
        startDate,
        endDate
    })

    useEffect(() => {
        dispatch(viewCamp(id)) //view particular camp details
    }, [dispatch])

    useEffect(() => {
        if (camp)
            setCampDetails({
                hospitalName,
                campName,
                address,
                startDate,
                endDate
            })
        if (campUpdateSuccess.campUpdateSuccess) {
            alert("Successfully updated")
            navigate('/admin/camps')
        }
    }, [campUpdateSuccess.campUpdateSuccess, camp])

    const changeHandler = (event) => {
        setCampDetails((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
        setFormError(() => (validate(campDetails)))
    }

    //to update existing camp details
    const updateHandler = (event) => {
        event.preventDefault()
        setFormError(() => (validate(campDetails)))
        setIsSubmit(true)
        if (Object.keys(formError).length === 0 && isSubmit) {
            dispatch(updateCamp(campDetails, id))
        }
    }

    //validate camp input fiels
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
            errors.endDate = "**Camp Ending date can't be in future and today"
        }
        if (!values.startDate) {
            errors.startDate = "** Camp Starting date is required"
        }
        return errors

    }


    return (
        <form onSubmit={updateHandler}>
            <Box sx={{ border: 3, width: "50%", height: "700px", marginLeft: "25%", marginTop: "5%", borderRadius: 15 }}>
                <Typography variant="h4" sx={{ marginLeft: "32%", marginTop: "2%", width: "70%" }}>Camp details</Typography>
                <TextField type="text" variant="standard" name="campName" value={campDetails.campName} onChange={changeHandler} placeholder="Camp Name" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.campName}</Typography>
                <TextField type="text" variant="standard" name="hospitalName" value={campDetails.hospitalName} onChange={changeHandler} placeholder="Hospital Name" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.hospitalName}</Typography>
                <TextField type="text" variant="standard" name="address" value={campDetails.address} onChange={changeHandler} placeholder="City" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.address}</Typography>
                <TextField type="date" variant="standard" name="startDate" value={campDetails.startDate} onChange={changeHandler} placeholder="Start Date" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.startDate}</Typography>
                <TextField type="date" variant="standard" name="endDate" value={campDetails.endDate} onChange={changeHandler} placeholder="End Date" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "1%", width: "70%", color: "red" }}>{formError.endDate}</Typography>
                <Button color="inherit" type="submit" sx={{ width: "20%", marginLeft: "40%", marginTop: "10%", backgroundColor: "black", color: "green", border: 3 }}>Submit</Button>
            </Box>
        </form>
    )
}