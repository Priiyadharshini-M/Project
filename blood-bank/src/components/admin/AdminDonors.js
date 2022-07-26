import { useDispatch, useSelector } from "react-redux";
import { allDonors } from "../../redux/actions/donorAction";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { deleteDonorProfile } from "../../redux/actions/donorAction";
import DeleteIcon from '@mui/icons-material/Delete';


const useStyles = makeStyles({
  todoStyle: {
    margin: "20px auto",
    padding: "20px",
    border: "2px solid #bdbdbd",
    borderRadius: "9px",
    display: "flex",
    justifyContent: "space-between",
  },
  moreStyle: {
    color: "#8f8f8f",
  }
});

export const AdminDonors = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const donors = useSelector((state) => state.donorProfile.donors)
  const donorErrMsg = useSelector(state => state.donorProfile)

  useEffect(() => {
    dispatch(allDonors()) //to view all donors
  }, [dispatch])

  const deleteDonorHandler = (id) => {
    dispatch(deleteDonorProfile(id)) //to delete particular donor as admin
    navigate('/admin/donors')
  }
  return (
    <div>
      <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{donorErrMsg.donorAllMsg}</Typography>

      {donors && donors.map((donor, index) => {
        return (
          <div key={index} >
            <div className={classes.todoStyle} >
              <div >
                <Typography sx={{ marginLeft: "15%", marginTop: "5%", width: "70%", color: 'red' }}>{donorErrMsg.donorDeleteMsg}</Typography>
                <Typography variant="subtitle1">{donor.userName}</Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Blood Group : {donor.bloodGroup} ,
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  City : {donor.city}
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Contact : {donor.contact}
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Email : {donor.email}
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Age : {donor.age}
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Allergies : {donor.allergies}
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Disease : {donor.disease}
                </Typography>
              </div>
              <div >
                <Button>
                  <DeleteIcon onClick={() => deleteDonorHandler(donor._id)} color="warning" sx={{ "&:hover": { color: "green" } }} />
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}