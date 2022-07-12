import { Box, TextField, Button, MenuItem, InputLabel, Select, TextareaAutosize, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { donorSignIn } from "../../redux/actions/donorAction"

export const DonorRegister = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const donor = useSelector(state => state.donor)
    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [registerCredentials, setRegisterCredentials] = useState({
        userName: '',
        email: '',
        contact: '',
        address: '',
        city: '',
        bloodGroup: '',
        gender: '',
        age: '',
        lastDonateDate: '',
        allergies: '',
        disease: '',
        password: '',
        confirmPassword: ''
    })

    const changeHandler = (event) => {
        setRegisterCredentials((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
    }
    const submitHandler = (event) => {
        event.preventDefault()
        setFormError(() => (validate(registerCredentials))) //front end validation
        setIsSubmit(true)
        if (Object.keys(formError).length === 0 && isSubmit) {
            dispatch(donorSignIn(registerCredentials))

            if (donor.msg === '') return
            navigate('/login')
        }
    }

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log(registerCredentials)
        }
    })
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
        else if (values.allergies === "No") {
            errors.age = "**You are not eligible to donate blood"
        }
        if (!values.disease) {
            errors.disease = "**This field is required"
        }
        else if (values.disease === "No") {
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

    return (
        <div>
            <form onSubmit={submitHandler}>
                <Box sx={{ border: 3, width: "50%", height: "1600px", marginLeft: "25%", marginTop: "5%", borderRadius: 15 }}>
                    <Typography variant="h4" sx={{ marginLeft: "32%", marginTop: "3%", width: "70%" }}>Donor Registration</Typography>

                    <TextField type="text" variant="standard" name="userName" value={registerCredentials.userName} onChange={changeHandler} label="Name" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userName}</Typography>
                    <TextField type="email" variant="standard" name="email" value={registerCredentials.email} onChange={changeHandler} label="Email Id" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.email}</Typography>
                    <TextField type="text" variant="standard" name="contact" value={registerCredentials.contact} onChange={changeHandler} label="Phone No" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.contact}</Typography>
                    <TextareaAutosize type="text" variant="standard" name="address" value={registerCredentials.address} onChange={changeHandler} placeholder="Address" style={{ marginTop: "70px", marginLeft: "15%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.address}</Typography>
                    <TextField type="password" variant="standard" name="password" value={registerCredentials.password} onChange={changeHandler} label="Password" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.password}</Typography>
                    <TextField type="password" variant="standard" name="confirmPassword" value={registerCredentials.confirmPassword} onChange={changeHandler} label="Confirm Password" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.confirmPassword}</Typography>
                    <TextField variant="standard" name="city" value={registerCredentials.city} onChange={changeHandler} label="Current city" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.city}</Typography>
                    <FormControl sx={{ width: "70%", marginTop: "5%", marginLeft: "15%" }}>
                        <InputLabel id="demo-simple-select-label">Blood-Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="bloodGroup"
                            value={registerCredentials.bloodGroup}
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
                        <Typography sx={{ marginLeft: "25%", marginTop: "2%", width: "70%", color: "red" }}>{formError.bloodGroup}</Typography>
                        <FormLabel sx={{ marginLeft: "40%", marginTop: "10%" }}>Gender</FormLabel>
                        <RadioGroup
                            row
                            required
                            name="gender"
                            value={registerCredentials.gender}
                            onChange={changeHandler} >
                            <FormControlLabel sx={{ marginLeft: "37%", marginTop: "0%", width: "25%" }} value="female" control={<Radio />} label="Female" />
                            <FormControlLabel sx={{ marginLeft: "0%", width: "22%" }} value="male" control={<Radio />} label="Male" />
                            <FormControlLabel sx={{ marginLeft: "0%", marginTop: "0%", width: "0%" }} value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.gender}</Typography>
                    <TextField type="number" variant="standard" name="age" value={registerCredentials.age} onChange={changeHandler} label="Age" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.age}</Typography>
                    <TextField type="date" variant="standard" name="lastDonateDate" value={registerCredentials.lastDonateDate} onChange={changeHandler} label="Last Donated Date" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.lastDonateDate}</Typography>
                    <FormControl sx={{ width: "70%", marginTop: "5%", marginLeft: "15%" }}>
                        <InputLabel id="demo-simple-select-label">Any allergies</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={registerCredentials.allergies}
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
                            value={registerCredentials.disease}
                            name="disease"
                            label="Any disease"
                            onChange={changeHandler}>
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.disease}</Typography>
                    <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{donor.msg}</Typography>
                    <Button color="inherit" type="submit" sx={{ width: "20%", marginLeft: "40%", marginTop: "10%", backgroundColor: "black", color: "green", border: 3 }}>Register</Button>
                </Box>
            </form>
        </div>
    )
}