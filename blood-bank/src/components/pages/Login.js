import { Box, TextField, Button, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { donorLogIn } from "../../redux/actions/donorAction"
import { logIn } from "../../redux/actions/userAction"


export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const donor = useSelector(state => state.donor)
    const [isUser, setIsUser] = useState(true)
    const [loginCredentials, setLoginCredentials] = useState({
        userEmail: '',
        userPassword: ''
    })
    const [donorCredentials, setDonorCredentials] = useState({
        email: '',
        password: ''
    })
    const changeHandler = (event) => {
        setLoginCredentials((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
    }
    const changeDonorHandler = (event) => {
        setDonorCredentials((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
    }

    //submit user login credentials 
    const submitHandler = async (event) => {
        event.preventDefault()
        await dispatch(logIn(loginCredentials))
    }
    //submit donor login credentials 
    const submitDonorHandler = async (event) => {
        event.preventDefault()
        await dispatch(donorLogIn(donorCredentials))
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            if (user.loginSuccess) {
                alert("Successfully logged in")
                navigate('/')
            }
        }
        if (sessionStorage.getItem("donorToken")) {
            if (donor.donorloginsuccess) {
                alert("Successfully logged in")
                navigate('/')
            }
        }
    }, [user.loginSuccess, donor.donorloginsuccess])

    return (
        <>
            <Button sx={{ color: "green", border: 3, borderRadius: 2, marginLeft: "45%", marginTop: "1%" }} onClick={() => setIsUser(true)}>User</Button>
            <Button sx={{ color: "green", border: 3, borderRadius: 2, marginLeft: "1%", marginTop: "1%" }} onClick={() => setIsUser(false)}>Donor</Button>
            <Box sx={{ border: 3, width: "50%", height: "500px", marginLeft: "25%", marginTop: "2%", borderRadius: 15 }}>
                <Typography variant="h4" sx={{ marginLeft: "40%", marginTop: "5%", width: "70%" }}>{isUser ? "Login" : "Donor Login"}</Typography>

                {isUser &&
                    <>
                        <form onSubmit={submitHandler}>
                            <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{user.loginMsg}</Typography>
                            <TextField type="email" variant="standard" name="userEmail" value={loginCredentials.userName} onChange={changeHandler} required label="Your email" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                            <TextField type="password" variant="standard" name="userPassword" value={loginCredentials.userPassword} onChange={changeHandler} required label="Your password" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                            <Button color="inherit" type="submit" sx={{ width: "20%", marginLeft: "40%", marginTop: "10%", backgroundColor: "black", color: "green", border: 3 }}>Log in</Button>
                            <Typography sx={{ marginLeft: "32%", marginTop: "5%" }}>Don't have an account? <Link to='/register'>Sign up</Link></Typography>
                        </form>
                    </>}


                {!isUser &&
                    <>
                        <form onSubmit={submitDonorHandler}>
                            <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{donor.donorLoginMsg}</Typography>
                            <TextField type="email" variant="standard" name="email" value={donorCredentials.email} onChange={changeDonorHandler} required label="Donor email" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                            <TextField type="password" variant="standard" name="password" value={donorCredentials.password} onChange={changeDonorHandler} required label="Donor password" sx={{ marginLeft: "15%", marginTop: "5%", width: "70%" }} />
                            <Button color="inherit" type="submit" sx={{ width: "20%", marginLeft: "40%", marginTop: "10%", backgroundColor: "black", color: "green", border: 3 }}>Log in</Button>
                            <Typography sx={{ marginLeft: "32%", marginTop: "5%" }}>Don't have an account? <Link to='/register'>Sign up</Link></Typography>
                        </form>
                    </>}
            </Box>
        </>
    )
}