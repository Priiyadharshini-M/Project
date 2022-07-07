import { Box, TextField, Button, TextareaAutosize, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DonorRegister } from "./DonorRegister"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../Store/Actions/action"
//import { Redirect } from 'react-router-dom';

export const Register=()=>
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user) //state.user._userId
    console.log(user)
    const[isUser,setIsUser] = useState(true)
    const [registerCredentials, setRegisterCredentials] = useState({
        userName:'',
        userEmail:'',
        userContact:'',
        userAddress:'',
        userPassword:'',
        confirmUserPassword:''})

    const changeHandler=(event)=>{
        setRegisterCredentials((prevState)=>({...prevState,[event.target.name]:event.target.value}))
    }
    const submitHandler=(event)=>
    {
        event.preventDefault()
        dispatch(signIn(registerCredentials))

        if(user._userId) return
        navigate('/login')
    }
    return(
        <>
        <Button sx={{color : "green", border:3, borderRadius:2, marginLeft:"45%",marginTop:"1%"}} onClick={()=>setIsUser(true)}>User</Button>
        <Button sx={{color : "green", border:3, borderRadius:2, marginLeft:"1%",marginTop:"1%"}} onClick={()=>setIsUser(false)}>Donor</Button>
        { isUser && 
                <form onSubmit={submitHandler}>
            <Box sx={{border:3,width:"50%",height:"950px",marginLeft:"25%", marginTop:"5%",borderRadius:15}}>
            <Typography variant="h4" sx={{marginLeft:"32%",marginTop:"5%",width:"70%"}}>User Registration</Typography>
                <TextField type="text" ariant="standard" name="userName" value={registerCredentials.userName} onChange={changeHandler} required label="Name" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField type="email" variant="standard" name="userEmail" value={registerCredentials.userEmail} onChange={changeHandler} required label="Email Id" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField type="text" variant="standard" name="userContact" value={registerCredentials.userContact} onChange={changeHandler} required label="Phone No" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextareaAutosize type="text" variant="standard" name="userAddress" value={registerCredentials.userAddress} onChange={changeHandler} required placeholder="Address" style={{marginTop:"70px",marginLeft:"15%",width:"70%"}}/>
                <TextField type="password" variant="standard" name="userPassword" value={registerCredentials.userPassword} onChange={changeHandler} required label="Password" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField type="password" variant="standard" name="confirmUserPassword" value={registerCredentials.confirmUserPassword} onChange={changeHandler} required label="Confirm Password" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <Button color="inherit" type="submit" sx={{width:"20%", marginLeft:"40%", marginTop:"10%", backgroundColor:"black", color:"green", border:3}}>Register</Button>
            </Box>
            </form>
        }

        { !isUser && <DonorRegister />}
        </>

    
    )
}