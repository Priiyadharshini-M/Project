import React, { useState,useEffect } from 'react'
import { AppBar, Button, Box, Toolbar, Typography, Tabs, Tab, } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAdminLogin, setAdminLogout, setLogout } from '../Store/Actions/authAction'

const AdminHeader = () => {
    const [ selectTab, setSelectTab ] = useState(0)
    const login = useSelector(state => state.auth.adminLogin)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(setAdminLogout())
    }
    return (<>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h4' margin="0 5%">Blood Bank</Typography>
                <Tabs value={selectTab} onChange={ (value) => setSelectTab(value) } >

                    <Tab LinkComponent={Link} to='/admin/home' label="Home" />
                    <Tab LinkComponent={Link} to='/admin/camps' label="Camps" />
                    <Tab LinkComponent={Link} to='/admin/donors' label="Donors" />

                </Tabs>
                <Box display="flex" marginLeft="auto">
                    {
                        !login && <Button LinkComponent={Link} to='/admin/login' variant='outlined' sx={{ margin: 1, borderRadius: 3 }} color='secondary'>Login</Button>
                    }
                    {
                        login && <Button onClick={logoutHandler} LinkComponent={Link} to='/admin/home' variant='outlined' sx={{ margin: 1, borderRadius: 3 }} color='warning'>Logout</Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    </>)
}

export default AdminHeader