import { Button, MenuItem, InputLabel, Select, FormControl, Box, Typography, Stack, SnackbarContent } from "@mui/material"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { search } from "../Store/Actions/action"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const specificDonor = useSelector(state => state.donorProfile.specificDonor.donor)
    console.log("the specific donor is ",specificDonor)
    const [searchCredentials, setSearch] = useState({
        bloodGroup:'',
        city:''
    })
    const changeHandler=(event)=>{
        setSearch((prevState)=>({...prevState,[event.target.name]:event.target.value}))
    }
    const searchHandler = (event) => {
        event.preventDefault()
        dispatch(search(searchCredentials))
        //navigate('/search')
    }
    // const viewHandler = () => {
    //     navigate('/search/donor/view/')
    // }
    return(
        <>
        <div>
            <form onSubmit={searchHandler}>
            <FormControl sx={{width:"70%", marginTop:"5%", marginLeft:"15%"}}>
                    <InputLabel id="demo-simple-select-label">Blood-Group</InputLabel>
                    <Select 
                    labelId="demo-simple-select-label" 
                    id="demo-simple-select"
                    name="bloodGroup"
                    value={search.bloodGroup}
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

            <FormControl sx={{width:"70%", marginTop:"5%", marginLeft:"15%"}}>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select 
                    labelId="demo-simple-select-label" 
                    id="demo-simple-select"
                    name="city"
                    value={search.city}
                    label="City"
                    onChange={ changeHandler }>
                        <MenuItem value={"pollachi"}>Pollachi</MenuItem>
                        <MenuItem value={"palani"}>Palani</MenuItem>
                        <MenuItem value={"madurai"}>Madurai</MenuItem>
                        <MenuItem value={"chennai"}>Chennai</MenuItem>
                        <MenuItem value={"trichy"}>Trichy</MenuItem>
                        <MenuItem value={"coimbatore"}>Coimbatore</MenuItem>
                        <MenuItem value={"Thirunelveli"}>Thirunelveli</MenuItem>
                        <MenuItem value={"salem"}>Salem</MenuItem>
                    </Select>
            </FormControl>
            <Button color="inherit" type="submit" sx={{width:"20%", marginLeft:"40%", marginTop:"10%", backgroundColor:"black", color:"green", border:3}}>Search</Button>
             </form>
        </div>

        
        {specificDonor && specificDonor.map((specificDonor) => { 
            return(
                <div key={specificDonor._id}>
                    <Box sx={{
                        width: 400,
                        height: 330,
                        margin: 'auto',
                        marginTop:'90px',
                        backgroundColor:'black'
        }}>
            <Typography variant="h4" marginLeft="25%" marginBottom="3%" color="white">Available Donors</Typography>
      <Stack spacing={1} sx={{ maxWidth: 600 }}>
            <SnackbarContent action="Donor Name" message={specificDonor.userName} sx={{backgroundColor:"white", color:'black'}} /><Button onClick={() => {navigate(`/search/donor/view/${specificDonor._id}`)}}>View</Button>
        </Stack>
        </Box>
                    {/* Donor Name - {specificDonor.userName} */}
                </div>
        )})}
        
        {/* {!specificDonor && "No donors found with particular blood group in the selected city"} */}
        </>
    )
}