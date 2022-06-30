import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import { Box } from "@mui/system"
import { IoIosHeart, IoIosHome } from "react-icons/io"
import { Link } from "react-router-dom"
import useStyles from "./NavbarCSS"

export const Navbar = () => {
    const classes = useStyles();
    return(
        <>
        <AppBar position="static" sx={{backgroundColor : "black",height : "120px"}}>
            {/* hello */}
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <IoIosHeart color="red" />
                </IconButton>
                <Typography variant="h4" component="div" sx={{flexGrow : 1}}>Blood Bank</Typography>
                <Stack direction="row" spacing={2}>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Box sx={{color : "green", border:3, borderRadius:2}}>
                    <Button color="inherit">Sign up</Button>
                    </Box>
                    </Link>
                   
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                    {/* <Box sx={{color : "green", border:3, borderRadius:2 }}> */}
                    <Box className={classes.box}>
                    <Button color="inherit" >Sign in</Button>
                    </Box>
                    </Link>
                    

                </Stack>
            </Toolbar>
        </AppBar>

        <AppBar position="static" sx={{backgroundColor : "red",height : "60px"}}>
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <IoIosHome />
                </IconButton>
                
                <Typography variant="h6" component="div" sx={{flexGrow : 1}}>Home</Typography>

                <Stack direction="row" spacing={4}>
                <Typography variant="h6" component="div" >Blood Camps</Typography>
                <Typography variant="h6" component="div" >About us</Typography>
                <Typography variant="h6" component="div">Search</Typography>
                <Typography variant="h6" component="div">Logout</Typography>
                
                </Stack>
            </Toolbar>
        </AppBar>
        </>
    )
}