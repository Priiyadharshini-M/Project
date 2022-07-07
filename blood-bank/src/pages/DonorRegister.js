import { Box, TextField, Button, MenuItem, InputLabel, Select, TextareaAutosize, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
//import { Container } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { donorSignIn } from "../Store/Actions/action"

export const DonorRegister=()=>
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const donor = useSelector(state => state.donor)
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
        dispatch(donorSignIn(registerCredentials))

        if(donor._donorId) return
        navigate('/login')
    }

    return(
        <div>
                <form onSubmit={submitHandler}>
            <Box sx={{border:3,width:"50%",height:"1400px",marginLeft:"25%", marginTop:"5%",borderRadius:15}}>
                <Typography variant="h4" sx={{marginLeft:"32%",marginTop:"3%",width:"70%"}}>Donor Registration</Typography>
                <TextField type="text" variant="standard" name="userName" value={registerCredentials.userName} onChange={changeHandler} required label="Name" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextField type="email" variant="standard" name="email" value={registerCredentials.email} onChange={changeHandler} required label="Email Id" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextField type="text" variant="standard" name="contact" value={registerCredentials.contact} onChange={changeHandler} required label="Phone No" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextareaAutosize type="text" variant="standard" name="address" value={registerCredentials.address} onChange={changeHandler} required placeholder="Address" style={{marginTop:"70px",marginLeft:"15%",width:"70%"}}/>
                <TextField type="password" variant="standard" name="password" value={registerCredentials.password} onChange={changeHandler} required label="Password" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextField type="password" variant="standard" name="confirmPassword" value={registerCredentials.confirmPassword} onChange={changeHandler} required label="Confirm Password" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextField variant="standard" name="city" value={registerCredentials.city} onChange={changeHandler} required label="Current city" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                {/* <TextField type="text" variant="standard" name="bloodGroup" value={registerCredentials.bloodGroup} onChange={changeHandler} required label="Blood Group" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/> */}

                <FormControl sx={{width:"70%", marginTop:"5%", marginLeft:"15%"}}>
                    <InputLabel id="demo-simple-select-label">Blood-Group</InputLabel>
                    <Select 
                    labelId="demo-simple-select-label" 
                    id="demo-simple-select"
                    name="bloodGroup"
                    value={registerCredentials.bloodGroup}
                    label="Blood-group"
                    onChange={ changeHandler }>
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
                {/* <TextField type="radio" variant="standard" name="gender" value={registerCredentials.gender} onChange={changeHandler} required label="Gender" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/> */}
                <FormControl>
                   <FormLabel sx={{marginLeft:"40%",marginTop:"10%"}}>Gender</FormLabel>
                      <RadioGroup
                        row
                        required
                        name="gender"
                        value={registerCredentials.gender}
                        onChange={changeHandler} >
                       <FormControlLabel sx={{marginLeft:"37%",marginTop:"0%",width:"25%"}} value="female" control={<Radio />} label="Female" />
                       <FormControlLabel sx={{marginLeft:"0%",width:"22%"}} value="male" control={<Radio />} label="Male" />
                       <FormControlLabel sx={{marginLeft:"0%",marginTop:"0%",width:"0%"}} value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                </FormControl>
                <TextField type="number" variant="standard" name="age" value={registerCredentials.age} onChange={changeHandler} required label="Age" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextField type="date" variant="standard" name="lastDonateDate" value={registerCredentials.lastDonateDate} onChange={changeHandler} required label="Last Donated Date" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                {/* <TextField variant="standard" name="allergies" value={registerCredentials.allergies} onChange={changeHandler} required label="Any allergies" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/>
                <TextField variant="standard" name="disease" value={registerCredentials.disease} onChange={changeHandler} required label="Any disease" sx={{marginLeft:"15%",marginTop:"5%",width:"70%"}}/> */}

                <FormControl sx={{width:"70%", marginTop:"5%", marginLeft:"15%"}}>
                    <InputLabel id="demo-simple-select-label">Any allergies</InputLabel>
                    <Select 
                    labelId="demo-simple-select-label" 
                    id="demo-simple-select"
                    value={registerCredentials.allergies}
                    label="Any allergies"
                    name="allergies"
                    onChange={ changeHandler }>
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{width:"70%", marginTop:"5%", marginLeft:"15%"}}>
                    <InputLabel id="demo-simple-select-label">Any disease</InputLabel>
                    <Select 
                    labelId="demo-simple-select-label" 
                    id="demo-simple-select"
                    value={registerCredentials.disease}
                    name="disease"
                    label="Any disease"
                    onChange={ changeHandler }>
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                </FormControl>
                <Button color="inherit" type="submit" sx={{width:"20%", marginLeft:"40%", marginTop:"10%", backgroundColor:"black", color:"green", border:3}}>Register</Button>
            </Box>
            </form>
        </div>
    )
}