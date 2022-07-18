
import { useLocation } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const location = useLocation()
  const paths = location.pathname.split('/')
  return (<>
    {
      paths.includes('admin') ? '' :
        <>
          <footer style={{ 'backgroundColor': 'black', 'height': '90px', 'marginTop': '90px' }}>
            <div style={{ 'marginLeft': '43%' }}>
              <IconButton><FacebookIcon sx={{ 'color': 'white' }}></FacebookIcon></IconButton>
              <IconButton><TwitterIcon sx={{ 'color': 'white' }}></TwitterIcon></IconButton>
              <IconButton><InstagramIcon sx={{ 'color': 'white' }}></InstagramIcon></IconButton>
              <IconButton><LinkedInIcon sx={{ 'color': 'white' }}></LinkedInIcon></IconButton>
              <IconButton><GitHubIcon sx={{ 'color': 'white' }}></GitHubIcon></IconButton>
            </div>
            <br></br>
            <div>
              <Typography sx={{ 'color': 'white', 'textAlign': 'center' }}><small className="ml-2">&copy; Blood Bank, {new Date().getFullYear()}. All rights reserved.</small></Typography>
            </div>
          </footer>
        </>
    }
  </>)
}

export default Footer