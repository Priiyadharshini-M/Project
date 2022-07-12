import { Box, TextField, Button, MenuItem, InputLabel, Select, TextareaAutosize, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateDonorProfile, viewDonorProfile } from '../../redux/actions/donorAction'
import { useNavigate } from 'react-router-dom'

const EditDonorProfile = () => {
    const donorId = useSelector(state => state.donor._donorId)
    const donorProfile = useSelector(state => state.donorProfile.donorProfile)
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
        dispatch(viewDonorProfile(donorId))
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
    }, [donorProfile])

    const changeHandler = (event) => {
        setDonorCredentials((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }
    const updateHandler = (event) => {
        event.preventDefault()
        dispatch(updateDonorProfile(donorCredentials, donorId))
        navigate('/donor-profile')
    }
    return (<>
        <form onSubmit={updateHandler}>
            <Box>
                <Typography padding={1} variant="h4" align="center">
                    My Details
                </Typography>
                <TextField type='text' name='userName' value={donorCredentials.userName || ""} onChange={changeHandler} placeholder='Username' margin='normal' required />
                <TextField type="email" name="email" value={donorCredentials.email || ""} onChange={changeHandler} required label="Email Id" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <TextField type="text" name="contact" value={donorCredentials.contact || ""} onChange={changeHandler} required label="Phone No" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <TextareaAutosize type="text" name="address" value={donorCredentials.address || ""} onChange={changeHandler} required placeholder="Address" style={{ marginTop: "70px", marginLeft: "15%", width: "70%" }} />
                <TextField type="password" name="password" value={donorCredentials.password || ""} onChange={changeHandler} required label="Password" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <TextField name="city" value={donorCredentials.city || ""} onChange={changeHandler} required label="Current city" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
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
                <TextField type={"number"} name="age" value={donorCredentials.age || 0} onChange={changeHandler} required label="Age" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                <TextField type="date" name="lastDonateDate" value={donorCredentials.lastDonateDate || ""} onChange={changeHandler} required label="Last Donated Date" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
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
                <Button type='submit' color='warning' style={{ margin: '5% 0' }}>Update</Button>
            </Box>
        </form>
    </>)
}

export default EditDonorProfile