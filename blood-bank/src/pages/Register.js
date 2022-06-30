import { Box, TextField, Button, TextareaAutosize } from "@mui/material"
//import { Container } from "@mui/system"
import { useState } from "react"

export const Register=()=>
{
    const [registerCredentials, setRegisterCredentials] = useState({name:'',
                                                                    email:'',
                                                                    phone:'',
                                                                    address:'',
                                                                    password:'',
                                                                    confirmPassword:''})

    const changeHandler=(event)=>{
        setRegisterCredentials({...registerCredentials,[event.target.name]:event.target.value})
    }
    return(
        <div>
                <form>
            <Box sx={{border:3,width:"50%",height:"750px",marginLeft:"25%", marginTop:"5%",borderRadius:15}}>
                <TextField variant="standard" value={registerCredentials.name} onChange={changeHandler} required label="Name" sx={{marginLeft:"15%",marginTop:"25%",width:"70%"}}/>
                <TextField variant="standard" value={registerCredentials.email} onChange={changeHandler} required label="Email Id" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField variant="standard" value={registerCredentials.phone} onChange={changeHandler} required label="Phone No" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextareaAutosize variant="standard" value={registerCredentials.address} onChange={changeHandler} required placeholder="Address" sx={{marginLeft:"15%",marginTop:"50%",width:"70%",padding:"50%"}}/>
                <TextField variant="standard" value={registerCredentials.password} onChange={changeHandler} required label="Password" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField variant="standard" value={registerCredentials.confirmPassword} onChange={changeHandler} required label="Confirm Password" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <Button color="inherit" type="submit" sx={{width:"20%", marginLeft:"40%", marginTop:"10%", backgroundColor:"black", color:"green", border:3}}>Register</Button>
            </Box>
            </form>
        </div>
    )
}