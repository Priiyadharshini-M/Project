import { Box, TextField, Button, TextareaAutosize, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DonorRegister } from "../donor/DonorRegister"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../../redux/actions/userAction"

export const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    const { success, signInMsg } = user
    const [isUser, setIsUser] = useState(true)
    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [registerCredentials, setRegisterCredentials] = useState({
        userName: '',
        userEmail: '',
        userContact: '',
        userAddress: '',
        userPassword: '',
        confirmUserPassword: ''
    })

    const changeHandler = (event) => {
        setRegisterCredentials((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
    }

    //submit user details for registration
    const submitHandler = (event) => {
        event.preventDefault()
        setFormError(() => (validate(registerCredentials))) //front end validation
        setIsSubmit(true)
        if (Object.keys(formError).length === 1 && isSubmit) {
            dispatch(signIn(registerCredentials)) //register action
        }
    }

    useEffect(() => {
        if (success) {
            alert("Successfully signed in")
            navigate('/login')
        }
    }, [success])

    //inputs validation
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
        if (!values.userEmail) {
            errors.userEmail = "**Email is required"
        }
        else if (!emailRegex.test(values.userEmail)) {
            errors.userEmail = "**Invalid email"
        }
        if (!values.userContact) {
            errors.userContact = "**Contact is required"
        }
        else if (!contactRegex.test(values.userContact)) {
            errors.userContact = "**Contact should contain 10 digits and start with 6/7/8/9"
        }
        if (!values.userPassword) {
            errors.userPassword = "**Password is required"
        }
        else if (!passwordRegex.test(values.userPassword)) {
            errors.userPassword = "**Password should have max of 20 and min of 8 characters and no special characters"
        }
        if (!values.confirmUserPassword) {
            errors.confirmUserPassword = "**This field is required"
        }
        else if (values.userPassword !== values.confirmUserPassword) {
            errors.confirmUserPassword = "**Confirm password is not matching"
        }
        return errors

    }

    return (
        <>
            <Button sx={{ color: "green", border: 3, borderRadius: 2, marginLeft: "45%", marginTop: "1%" }} onClick={() => setIsUser(true)}>User</Button>
            <Button sx={{ color: "green", border: 3, borderRadius: 2, marginLeft: "1%", marginTop: "1%" }} onClick={() => setIsUser(false)}>Donor</Button>
            {isUser &&
                <form onSubmit={submitHandler}>
                    <Box sx={{ border: 3, width: "50%", height: "950px", marginLeft: "25%", marginTop: "5%", borderRadius: 15 }}>
                        <Typography variant="h4" sx={{ marginLeft: "32%", marginTop: "5%", width: "70%" }}>User Registration</Typography>

                        <TextField type="text" variant="standard" name="userName" value={registerCredentials.userName} onChange={changeHandler} label="Name" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userName}</Typography>
                        <TextField type="email" variant="standard" name="userEmail" value={registerCredentials.userEmail} onChange={changeHandler} label="Email Id" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userEmail}</Typography>
                        <TextField type="text" variant="standard" name="userContact" value={registerCredentials.userContact} onChange={changeHandler} label="Phone No" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userContact}</Typography>
                        <TextareaAutosize type="text" variant="standard" name="userAddress" value={registerCredentials.userAddress} onChange={changeHandler} placeholder="Address" style={{ marginTop: "70px", marginLeft: "15%", width: "70%" }} />
                        <TextField type="password" variant="standard" name="userPassword" value={registerCredentials.userPassword} onChange={changeHandler} label="Password" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.userPassword}</Typography>
                        <TextField type="password" variant="standard" name="confirmUserPassword" value={registerCredentials.confirmUserPassword} onChange={changeHandler} label="Confirm Password" sx={{ marginLeft: "15%", marginTop: "10%", width: "70%" }} />
                        <Typography sx={{ marginLeft: "15%", marginTop: "2%", width: "70%", color: "red" }}>{formError.confirmUserPassword}</Typography>
                        <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{signInMsg}</Typography>
                        <Button color="inherit" type="submit" sx={{ width: "20%", marginLeft: "40%", marginTop: "10%", backgroundColor: "black", color: "green", border: 3 }}>Register</Button>
                    </Box>
                </form>
            }

            {!isUser && <DonorRegister />}
        </>


    )
}