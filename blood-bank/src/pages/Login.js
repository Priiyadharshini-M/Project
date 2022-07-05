import { Box, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setLogin } from "../Store/Actions/authAction"

export const Login= () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const[isUser,setIsUser] = useState(true)
    const[loginCredentials,setLoginCredentials] = useState({
        userName : '',
        userPassword : ''
    })
    const[donorCredentials,setDonorCredentials] = useState({
        userName : '',
        password : ''
    })
    const changeHandler=(event)=>{
        setLoginCredentials((prevState)=>({...prevState,[event.target.name]:event.target.value}))
    }
    const changeDonorHandler=(event)=>{
        setDonorCredentials((prevState)=>({...prevState,[event.target.name]:event.target.value}))
    }
    const submitHandler=(event)=>
    {
        event.preventDefault()
        dispatch(setLogin())
        navigate('/')
    }
    

    return(
            <>
            <Button sx={{color : "green", border:3, borderRadius:2, marginLeft:"45%",marginTop:"1%"}} onClick={()=>setIsUser(true)}>User</Button>
            <Button sx={{color : "green", border:3, borderRadius:2, marginLeft:"1%",marginTop:"1%"}} onClick={()=>setIsUser(false)}>Donor</Button>
            <Box sx={{border:3,width:"50%",height:"500px",marginLeft:"25%", marginTop:"2%",borderRadius:15}}>
            <Typography variant="h4" sx={{marginLeft:"40%",marginTop:"5%",width:"70%"}}>{ isUser ? "Login" : "Donor Login" }</Typography>

            { isUser && 
            <>
            <form onSubmit={submitHandler}>
                <TextField type="email" variant="standard" name="userName" value={loginCredentials.userName} onChange={changeHandler} required label="Your email" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextField type="password" variant="standard" name="userPassword" value={loginCredentials.userPassword} onChange={changeHandler} required label="Your password" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                
                <Button color="inherit" type="submit" sx={{width:"20%", marginLeft:"40%", marginTop:"10%", backgroundColor:"black", color:"green", border:3}}>Log in</Button>
                <Typography sx={{marginLeft:"32%",marginTop:"5%"}}>Don't have an account? <Link to='/register'>Sign up</Link></Typography>
            </form>
            </>}


            { !isUser && 
            <>
            <form onSubmit={submitHandler}>
                <TextField type="email" variant="standard" name="userName" value={donorCredentials.userName} onChange={changeDonorHandler} required label="Donor email" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextField type="password" variant="standard" name="password" value={donorCredentials.password} onChange={changeDonorHandler} required label="Donor password" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
    
                <Button color="inherit" type="submit" sx={{width:"20%", marginLeft:"40%", marginTop:"10%", backgroundColor:"black", color:"green", border:3}}>Log in</Button>
                <Typography sx={{marginLeft:"32%",marginTop:"5%"}}>Don't have an account? <Link to='/register'>Sign up</Link></Typography>
    
            </form>
            </>}

           </Box>
           </>
    )
}