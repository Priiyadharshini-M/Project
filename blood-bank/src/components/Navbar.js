import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { IoIosHeart, IoIosHome } from "react-icons/io"
import { Link } from "react-router-dom"
import useStyles from "./NavbarCSS"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { setLogout } from "../Store/Actions/authAction"

export const Navbar = () => {
    const classes = useStyles();
    const [ selectTab, setSelectTab ] = useState(0)
     const isLoggedIn = useSelector(state => state.auth.login)
     console.log("Logged in: "+isLoggedIn)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(setLogout())
    }

    //const isLoggedIn = true
    return(
        <>
        {!isLoggedIn &&
        <>
        <AppBar position="static" sx={{backgroundColor : "black",height : "120px"}}>
            {/* hello */}
            <Toolbar>
                <IconButton size="large" edge="start" aria-label="logo">
                    <IoIosHeart color="red" />
                </IconButton>
                <Typography variant="h4" component="div" sx={{flexGrow : 1}}>Blood Bank</Typography>
                <Stack direction="row" spacing={2}>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Box sx={{color : "green", border:3, borderRadius:2}}>
                    <Button color="inherit" >Sign up</Button>
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
        </>
}

{isLoggedIn && 
<>
        <AppBar position="static" sx={{backgroundColor : "red",height : "60px"}}>
            <Toolbar>
                {/* <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <IoIosHome />
                </IconButton> */}
                
                {/* <Typography variant="h6" component="div" sx={{flexGrow : 1}}>Home</Typography> */}

                <Stack direction="row" spacing={4}>
                {/* <Typography variant="h6" component="div" >Blood Camps</Typography>
                <Typography variant="h6" component="div" >About us</Typography>
                <Typography variant="h6" component="div">Search</Typography>
                <Typography variant="h6" component="div">Logout</Typography> */}
                <Tabs value={selectTab} onChange={(event, value) => setSelectTab(value)}>
                   <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                       <IoIosHome /><Tab LinkComponent={Link} to='/' label="Home" />
                    </IconButton>
                    <Tab LinkComponent={Link} to='/camps'label="Blood Camps" />
                    <Tab LinkComponent={Link} to='/about' label="About us" />
                    <Tab LinkComponent={Link} to='/search' label="Search" />
                    {/* <Tab LinkComponent={Link} to='/' label="Logout" /> */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                    <Box sx={{color : "black", border:3, borderRadius:2, marginTop:"18%", marginLeft:"10%"}}>
                    <Button color="inherit" onClick={() => logoutHandler()}>Log out</Button>
                    </Box>
                    </Link>
                </Tabs>
                
                </Stack>
            </Toolbar>
        </AppBar>
        </>
}
        </>
    )
}