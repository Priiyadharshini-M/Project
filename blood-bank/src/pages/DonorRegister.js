import { Box, TextField, Button, TextareaAutosize, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
//import { Container } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const DonorRegister=()=>
{
    const navigate = useNavigate()
    const [registerCredentials, setRegisterCredentials] = useState({
        userName:'',
        email:'',
        contact:'',
        address:'',
        city:'',
        bloodGroup:'',
        gender:'',
        age:'',
        lastDonateDate:'',
        allergies:'',
        disease:'',
        password:'',
        confirmPassword:''})

    const changeHandler=(event)=>{
        setRegisterCredentials((prevState)=>({...prevState,[event.target.name]:event.target.value}))
    }
    const submitHandler=(event)=>
    {
        event.preventDefault()
        navigate('/login')
    }

    return(
        <div>
                <form onSubmit={submitHandler}>
            <Box sx={{border:3,width:"50%",height:"1800px",marginLeft:"25%", marginTop:"5%",borderRadius:15}}>
                <Typography variant="h4" sx={{marginLeft:"32%",marginTop:"5%",width:"70%"}}>Donor Registration</Typography>
                <TextField type="text" variant="standard" name="userName" value={registerCredentials.userName} onChange={changeHandler} required label="Name" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField type="email" variant="standard" name="email" value={registerCredentials.email} onChange={changeHandler} required label="Email Id" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField type="text" variant="standard" name="contact" value={registerCredentials.contact} onChange={changeHandler} required label="Phone No" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextareaAutosize type="text" variant="standard" name="address" value={registerCredentials.address} onChange={changeHandler} required placeholder="Address" style={{marginTop:"70px",marginLeft:"15%",width:"70%"}}/>
                <TextField type="password" variant="standard" name="password" value={registerCredentials.password} onChange={changeHandler} required label="Password" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField type="password" variant="standard" name="confirmPassword" value={registerCredentials.confirmPassword} onChange={changeHandler} required label="Confirm Password" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField variant="standard" name="city" value={registerCredentials.city} onChange={changeHandler} required label="Current city" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField type="text" variant="standard" name="bloodGroup" value={registerCredentials.bloodGroup} onChange={changeHandler} required label="Blood Group" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                {/* <TextField type="radio" variant="standard" name="gender" value={registerCredentials.gender} onChange={changeHandler} required label="Gender" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/> */}
                <FormControl>
                   <FormLabel sx={{marginLeft:"40%",marginTop:"10%",width:"70%"}}>Gender</FormLabel>
                      <RadioGroup
                        row
                        required
                        name="gender"
                        value={registerCredentials.gender}
                        onChange={changeHandler} >
                       <FormControlLabel sx={{marginLeft:"40%",marginTop:"10%",width:"70%"}} value="female" control={<Radio />} label="Female" />
                       <FormControlLabel sx={{marginLeft:"40%",marginTop:"10%",width:"70%"}} value="male" control={<Radio />} label="Male" />
                       <FormControlLabel sx={{marginLeft:"40%",marginTop:"10%",width:"70%"}} value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                </FormControl>
                <TextField type="number" variant="standard" name="age" value={registerCredentials.age} onChange={changeHandler} required label="Age" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField type="date" variant="standard" name="lastDonateDate" value={registerCredentials.lastDonateDate} onChange={changeHandler} required label="Last Donated Date" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField variant="standard" name="allergies" value={registerCredentials.allergies} onChange={changeHandler} required label="Any allergies" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <TextField variant="standard" name="disease" value={registerCredentials.disease} onChange={changeHandler} required label="Any disease" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                <Button color="inherit" type="submit" sx={{width:"20%", marginLeft:"40%", marginTop:"10%", backgroundColor:"black", color:"green", border:3}}>Register</Button>
            </Box>
            </form>
        </div>
    )
}