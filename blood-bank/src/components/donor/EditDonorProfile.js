import { Box, TextField, Button, MenuItem, InputLabel, Select, TextareaAutosize, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateDonorProfile, viewDonorProfile } from '../../redux/actions/donorAction'
import { useNavigate } from 'react-router-dom'

const EditDonorProfile = () => {
    const donorId = useSelector(state => state.donor._donorId)
    const donorProfile = useSelector(state => state.donorProfile.donorProfile)
    const donorUpdateSuccess = useSelector(state => state.donorProfile)
    const { userName,
        address,
        city,
        contact,
        bloodGroup,
        gender,
        age,
        password,
        email,
        lastDonateDate,
        allergies,
        disease } = donorProfile
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [donorCredentials, setDonorCredentials] = useState({
        userName,
        address,
        city,
        contact,
        bloodGroup,
        gender,
        age,
        password,
        email,
        lastDonateDate,
        allergies,
        disease
    })

    useEffect(() => {
        if (donorId)
            dispatch(viewDonorProfile(donorId)) //to view particular donor profile
    }, [dispatch])

    useEffect(() => {
        if (donorProfile)
            setDonorCredentials({
                userName,
                address,
                city,
                contact,
                bloodGroup,
                gender,
                age,
                password,
                email,
                lastDonateDate,
                allergies,
                disease
            })

        if (donorUpdateSuccess.donorUpdateSuccess) {
            alert("Successfully updated")
            navigate('/donor-profile')
        }
    }, [donorProfile, donorUpdateSuccess.donorUpdateSuccess])

    const changeHandler = (event) => {
        setDonorCredentials((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    //to update existing donor profile
    const updateHandler = (event) => {
        event.preventDefault()
        setFormError(() => (validate(donorCredentials))) //front end validation
        setIsSubmit(true)
        if (Object.keys(formError).length === 0 && isSubmit) {
            dispatch(updateDonorProfile(donorCredentials, donorId))
        }
    }

    //validate input fields
    const validate = (values) => {
        const errors = {}
        const emailRegex = /^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$/
        const passwordRegex = /^[a-zA-Z0-9]{8,20}$/
        const nameRegex = /^[a-zA-Z ]+$/
        const contactRegex = /^[6-9]{1}[0-9]{9}$/

        if (!values.userName) {
            errors.userName = "**Username is required"
        }
        else if (!nameRegex.test(values.userName)) {
            errors.userName = "**Name should contain only alphabets and space"
        }
        if (!values.email) {
            errors.email = "**Email is required"
        }
        else if (!emailRegex.test(values.email)) {
            errors.email = "**Invalid email"
        }
        if (!values.contact) {
            errors.contact = "**Contact is required"
        }
        else if (!contactRegex.test(values.contact)) {
            errors.contact = "**Contact should contain 10 digits and start with 6/7/8/9"
        }
        if (!values.password) {
            errors.password = "**Password is required"
        }
        else if (!passwordRegex.test(values.password)) {
            errors.password = "**Password should have max of 20 and min of 8 characters and no special characters"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "**This field is required"
        }
        else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "**Confirm password is not matching"
        }
        if (!values.city) {
            errors.city = "**City is required"
        }
        else if (!nameRegex.test(values.city)) {
            errors.city = "**City should contain only alphabets and space"
        }
        if (!values.bloodGroup) {
            errors.bloodGroup = "**Blood Group is required"
        }
        if (!values.gender) {
            errors.gender = "**Gender is required"
        }
        if (!values.address) {
            errors.address = "**Address is required"
        }
        if (!values.age) {
            errors.age = "**Age is required"
        }
        else if (values.age < 18) {
            errors.age = "**Age should be greater than 18 to donate blood"
        }
        if (!values.allergies) {
            errors.allergies = "**This field is required"
        }
        else if (values.allergies === "Yes") {
            errors.allergies = "**You are not eligible to donate blood"
        }
        if (!values.disease) {
            errors.disease = "**This field is required"
        }
        else if (values.disease === "Yes") {
            errors.disease = "**You are not eligible to donate blood"
        }
        if (!values.lastDonateDate) {
            errors.lastDonateDate = "**Last donated date is required"
        }
        else if (values.lastDonateDate < Date.now()) {
            errors.lastDonateDate = "**Last donated date can't be in future and today"
        }
        return errors

    }

    return (<>
        <form onSubmit={updateHandler}>
            <Box>
                <Typography padding={1} variant="h4" align="center">
                    My Details
                </Typography>
                <TextField type='text' name='userName' value={donorCredentials.userName || ""} onChange={changeHandler} placeholder='Username' margin='normal' sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userName}</Typography>
                <TextField type="email" name="email" value={donorCredentials.email || ""} onChange={changeHandler} required label="Email Id" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.email}</Typography>
                <TextField type="text" name="contact" value={donorCredentials.contact || ""} onChange={changeHandler} required label="Phone No" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.contact}</Typography>
                <TextareaAutosize type="text" name="address" value={donorCredentials.address || ""} onChange={changeHandler} required placeholder="Address" style={{ marginTop: "70px", marginLeft: "15%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.address}</Typography>
                <TextField type="password" name="password" value={donorCredentials.password || ""} onChange={changeHandler} required label="Password" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.password}</Typography>
                <TextField name="city" value={donorCredentials.city || ""} onChange={changeHandler} required label="Current city" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.city}</Typography>
                <FormControl sx={{ width: "70%", marginTop: "5%", marginLeft: "15%" }}>
                    <InputLabel id="demo-simple-select-label">Blood-Group</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="bloodGroup"
                        value={donorCredentials.bloodGroup || ""}
                        label="Blood-group"
                        onChange={changeHandler}>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                    </Select>
                </FormControl>
                <Typography sx={{ marginLeft: "25%", marginTop: "2%", width: "70%", color: "red" }}>{formError.bloodGroup}</Typography>
                <FormControl>
                    <FormLabel sx={{ marginLeft: "40%", marginTop: "10%" }}>Gender</FormLabel>
                    <RadioGroup
                        row
                        required
                        name="gender"
                        value={donorCredentials.gender || ""}
                        onChange={changeHandler} >
                        <FormControlLabel sx={{ marginLeft: "37%", marginTop: "0%", width: "25%" }} value="female" control={<Radio />} label="Female" />
                        <FormControlLabel sx={{ marginLeft: "0%", width: "22%" }} value="male" control={<Radio />} label="Male" />
                        <FormControlLabel sx={{ marginLeft: "0%", marginTop: "0%", width: "0%" }} value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.gender}</Typography>
                <TextField type={"number"} name="age" value={donorCredentials.age || 0} onChange={changeHandler} required label="Age" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.age}</Typography>
                <TextField type="date" name="lastDonateDate" value={donorCredentials.lastDonateDate || ""} onChange={changeHandler} required label="Last Donated Date" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.lastDonateDate}</Typography>
                <FormControl sx={{ width: "70%", marginTop: "5%", marginLeft: "15%" }}>
                    <InputLabel id="demo-simple-select-label">Any allergies</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={donorCredentials.allergies || ""}
                        label="Any allergies"
                        name="allergies"
                        onChange={changeHandler}>
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                </FormControl>
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.allergies}</Typography>
                <FormControl sx={{ width: "70%", marginTop: "5%", marginLeft: "15%" }}>
                    <InputLabel id="demo-simple-select-label">Any disease</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={donorCredentials.disease || ""}
                        name="disease"
                        label="Any disease"
                        onChange={changeHandler}>
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                </FormControl>
                <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.disease}</Typography>
                <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{donorUpdateSuccess.donorUpdateMsg}</Typography>
                <Button type='submit' color='warning' sx={{ width: "20%", marginLeft: "40%", marginTop: "10%", backgroundColor: "black", color: "green", border: 3 }}>Update</Button>
            </Box>
        </form>
    </>)
}

export default EditDonorProfile