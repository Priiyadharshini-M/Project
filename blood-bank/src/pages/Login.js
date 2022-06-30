import { Box, TextField, Button, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { Link } from "react-router-dom"

export const Login=()=>
{
    return(
        <div>
            <Container>
                <form>
            <Box sx={{border:3,width:"50%",height:"500px",marginLeft:"25%", marginTop:"5%",borderRadius:15}}>
                <Container>
                <TextField variant="standard" required label="Your email" sx={{marginLeft:"15%",marginTop:"25%",width:"70%"}}/>
                <TextField variant="standard" required label="Your password" sx={{marginLeft:"15%",marginTop:"10%",width:"70%"}}/>
                </Container>
                <Container>
                <Button color="inherit" type="submit" sx={{width:"20%", marginLeft:"40%", marginTop:"10%", backgroundColor:"black", color:"green", border:3}}>Log in</Button>
                <Typography sx={{marginLeft:"25%",marginTop:"10%"}}>Don't have an account? <Link to='/register'>Sign up</Link></Typography>
                </Container>
            </Box>
            </form>
            </Container>
        </div>
    )
}