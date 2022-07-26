import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom'
import { viewCamps, deleteCamp } from "../../redux/actions/campAction";
import moment from 'moment'

import { makeStyles } from "@material-ui/styles";
import { Typography, ButtonGroup, Button } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


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

export const Camps = () => {

  const location = useLocation()
  const paths = location.pathname.split('/')

  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const camps = useSelector((state) => state.campDetails.camp)
  const { campDeleteSuccess, campViewMsg } = useSelector((state) => state.camp)

  useEffect(() => {
    dispatch(viewCamps()) //view all camps
  }, [dispatch])

  useEffect(() => {
    if (campDeleteSuccess) {
      alert("Successfully deleted")
      navigate('/admin/camps')
    }
  }, [campDeleteSuccess])

  const addCampHandler = () => {
    navigate('/admin/addCamp')
  }

  const updateCampHandler = (id) => {
    navigate(`/admin/editCamp/${id}`)
  }

  const deleteCampHandler = (id) => {
    dispatch(deleteCamp(id)) //to delete particular camp
  }

  return (
    <>
      {paths.includes('admin') &&
        <Button onClick={() => addCampHandler()} sx={{ marginLeft: "50%", marginTop: "2%", border: "2px solid blue", backgroundColor: "blue", color: "black" }} >
          <AddIcon></AddIcon> Add camp
        </Button>
      }

      <Typography>{campViewMsg}</Typography>
      {camps && camps.map((camp) => {
        return (
          <div key={camp._id} >
            <div className={classes.todoStyle} >
              <div >
                <Typography variant="subtitle1">{camp.campName}</Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Hospital : {camp.hospitalName} ,
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  {camp.address}
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Date : {camp.startDate} - {camp.endDate}
                </Typography>
                <Typography variant="body2" className={classes.moreStyle}>
                  Added: {moment(camp.date).fromNow()}
                </Typography>
              </div>
              {paths.includes('admin') &&
                <div key={camp._id}>
                  <ButtonGroup>
                    <Button onClick={() => updateCampHandler(camp._id)}>
                      <EditIcon color="primary" sx={{ "&:hover": { color: "green" } }} ></EditIcon>
                    </Button>
                    <Button>
                      <DeleteIcon onClick={() => deleteCampHandler(camp._id)} color="warning" sx={{ "&:hover": { color: "green" } }} />
                    </Button>
                  </ButtonGroup>
                </div>
              }
            </div>
          </div>
        )
      })}
    </>
  );
};