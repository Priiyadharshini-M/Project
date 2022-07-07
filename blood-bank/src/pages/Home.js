import { Typography, Avatar } from "@mui/material"
//import {Image} from 'material-ui-image'
import { Box } from "@mui/system"
import YouTube from "react-youtube"

export const Home=()=>
{
    const opts = {
        playerVars : {
            //F-fx4pMPd5AxyX9h
            //http:"https://youtube/Mr_FHO3RPcc"
            http:"https://youtu.be/Mr_FHO3RPcc"
        }
    }
    return(
        <div>
            <Box>
                <Avatar alt="Blood donation" src="headerImg.jpeg" variant="square" sx={{ height: '380px', width: '100%' }}/>
            <Typography variant="h4" sx={{marginTop:"2%", color:"red"}}>Why should people donate blood ?</Typography>
            <Typography variant="h6" sx={{marginTop:"1%", marginRight:"45%"}}>Safe blood saves lives. Blood is needed by women with complications during pregnancy and childbirth, children with severe anaemia, often resulting from malaria or malnutrition, accident victims and surgical and cancer patients.

There is a constant need for a regular supply of blood because it can be stored only for a limited period of time before use. Regular blood donation by a sufficient number of healthy people is needed to ensure that blood will always be available whenever and wherever it is needed.

Blood is the most precious gift that anyone can give to another person – the gift of life. A decision to donate your blood can save a life, or even several if your blood is separated into its components – red cells, platelets and plasma – which can be used individually for patients with specific conditions.</Typography>
            
<Avatar alt="Blood donation" src="compatibityChart.jpg" variant="square" sx={{ marginLeft:"50%", height: '380px', width: '50%' }}/>
            
            <div>
                <YouTube opts={opts} ></YouTube>
            </div>
            </Box>

            {/* <div>
                <video loop autoPlay>
                    <source src="https://youtu.be/Mr_FHO3RPcc" type="video/mp4" />
                    Browser doesn't support video tag
                </video>
            </div> */}

            {/* <Box component="img"
            sx={{
                height:"50%",
                width:"50%",
            }}
            alt="Blood donation"
            src="bloodbanklogo.jpeg" /> */}
        </div>
    )
}
