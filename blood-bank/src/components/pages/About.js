import { Button, Typography, Box } from "@mui/material"

export const About = () => {

    return (
        <>
            <div>
                <img src='hospital.webp' alt="hospital" style={{ 'marginTop': '5%', 'marginLeft': '40%' }}></img>
                <Typography variant='h4' sx={{ marginLeft: '3%' }}>Blood Bank Today</Typography>
                <Typography variant='h6' sx={{ color: "black", marginTop: "2%", marginLeft: "1%", width: '50%', textAlign: 'center' }}>Blood donation is an extremely noble deed, yet there is a security of regular donors across India.
                    We focus on creating and expanding a virtual army of blood donating volunteers who could be searched and contacted
                    by family or care givers of a patient in times of need.
                </Typography>
                <Box sx={{ color: "black", border: 3, borderRadius: 2, marginTop: "2%", marginLeft: "2%", width: '6%', textAlign: 'center' }}>
                    <Button><a href='https://bloodbanktoday.com/'> Visit us </a></Button>
                </Box>
                <Typography sx={{ textAlign: 'center' }}>For further queries mail to - <i style={{ 'color': 'blue' }}>bloodbank@gmail.com</i></Typography>
                <Typography sx={{ textAlign: 'center' }}>For further queries contact - <i style={{ 'color': 'blue' }}>+90 9878967543</i></Typography>
            </div>
        </>
    )
}