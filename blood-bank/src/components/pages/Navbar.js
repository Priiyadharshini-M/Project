import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { IoIosHeart, IoIosHome } from "react-icons/io"
import { Link } from "react-router-dom"
import useStyles from "./NavbarCSS"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { logOut } from "../../redux/actions/userAction"

export const Navbar = () => {
    const classes = useStyles();
    const [selectTab, setSelectTab] = useState(0)
    const user = useSelector(state => state.user._userId)
    const donor = useSelector(state => state.donor._donorId)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logOut())
    }

    return (
        <>
            {!user && !donor &&
                <>
                    <AppBar position="static" sx={{ backgroundColor: "black", height: "120px" }}>
                        <Toolbar>
                            <IconButton size="large" edge="start" aria-label="logo">
                                <IoIosHeart color="red" />
                            </IconButton>
                            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Blood Bank</Typography>
                            <Stack direction="row" spacing={2}>
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Box sx={{ color: "green", border: 3, borderRadius: 2 }}>
                                        <Button color="inherit" >Sign up</Button>
                                    </Box>
                                </Link>

                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Box className={classes.box}>
                                        <Button color="inherit" >Sign in</Button>
                                    </Box>
                                </Link>


                            </Stack>
                        </Toolbar>
                    </AppBar>
                </>
            }

            {(user || donor) &&
                (<>
                    <AppBar position="static" sx={{ backgroundColor: "red", height: "60px" }}>
                        <Toolbar>
                            <Stack direction="row" spacing={4}>
                                <Tabs value={selectTab} onChange={(event, value) => setSelectTab(value)}>
                                    <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                                        <IoIosHome /><Tab LinkComponent={Link} to='/' label="Home" />
                                    </IconButton>
                                    <Tab LinkComponent={Link} to='/camps' label="Blood Camps" />
                                    <Tab LinkComponent={Link} to='/about' label="About us" />
                                    <Tab LinkComponent={Link} to='/search' label="Search" />
                                    <Tab LinkComponent={Link} to='/my-profile' label="My Profile" />
                                    <Tab LinkComponent={Link} to='/donor-profile' label="My Profile" />
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <Box sx={{ color: "black", border: 3, borderRadius: 2, marginTop: "18%", marginLeft: "10%" }}>
                                            <Button color="inherit" onClick={() => logoutHandler()}>Log out</Button>
                                        </Box>
                                    </Link>
                                </Tabs>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                </>)
            }
        </>
    )
}