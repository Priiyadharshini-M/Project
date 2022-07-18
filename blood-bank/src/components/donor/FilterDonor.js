import { Box, SnackbarContent, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewDonorProfile } from "../../redux/actions/donorAction";

const FilterDonor = () => {
    let { donorId } = useParams();
    const dispatch = useDispatch()
    const donorProfile = useSelector(state => state.donorProfile.donorProfile)
    const donorErrMsg = useSelector(state => state.donorProfile)
    const { userName, city, contact, bloodGroup, gender, age, email, lastDonateDate, allergies, disease } = donorProfile

    useEffect(() => {
        dispatch(viewDonorProfile(donorId)) //to view particular donor profile
    }, [donorId])

    return (<>
        <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{donorErrMsg.donorViewProfileMsg}</Typography>
        <Box sx={{
            width: 400,
            height: 550,
            margin: 'auto',
            marginTop: '90px',
            marginBottom: '90px',
            backgroundColor: 'red'
        }}>
            <Stack spacing={1} sx={{ maxWidth: 600 }}>
                <SnackbarContent message={userName} action="Donor Name" />
                <SnackbarContent message={city} action="Current city" />
                <SnackbarContent message={contact} action="Contact Number" />
                <SnackbarContent message={bloodGroup} action="Blood Group" />
                <SnackbarContent message={gender} action="Gender" />
                <SnackbarContent message={age} action="Age" />
                <SnackbarContent message={email} action="Email Id" />
                <SnackbarContent message={lastDonateDate} action="Last Donated Date" />
                <SnackbarContent message={allergies} action="Allergies" />
                <SnackbarContent message={disease} action="Disease" />
            </Stack>

        </Box>
    </>)
}

export default FilterDonor