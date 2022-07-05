import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { updateCamp, viewCamps, deleteCamp } from "../Store/Actions/action";
import moment from 'moment'

import { makeStyles } from "@material-ui/styles";
import { Typography, ButtonGroup, Button, TextField } from "@mui/material";

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

export const Camps = ({ setCampDetails }) => {
  // const [campDetails, setCampDetails] = useState({
  //   hospitalName:'',
  //   address:'',
  //   campName:'',
  //   startDate:'',
  //   endDate:''})

  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const camps = useSelector((state) => state.camp)
  console.log(camps)

  useEffect(() => {
    dispatch(viewCamps())
  },[dispatch])
  //const auth = useSelector((state) => state.auth);

//   const handleOnUpdateClick = (id) => {
//     const foundTodo = todos.find((todo) => todo._id === id);
//     setTodo({ ...foundTodo });
//     window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: 'smooth'
//       });
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteTodo(id));
//   };

//   const handleCheck = (id) => {
//     dispatch(checkTodo(id));
//   };

const addCampHandler = () =>
{
    navigate('/addCamp')
}
const updateCampHandler = (id) =>
{
  const foundCamp = camps.find((camp) => camp._id === id);
    setCampDetails({ ...foundCamp });
  navigate('/addCamp')
  //setCampDetails(camps)
  window.scrollTo({
    top:0,
    left:0,
    behavior:"smooth"
  })
  // dispatch(updateCamp())
}
const deleteCampHandler = (id) =>
{
  dispatch(deleteCamp(id))
  navigate('/camps')
}

  return (
    <>
    <Button onClick={() => addCampHandler()} sx={{marginLeft : "50%", marginTop : "2%", border : "2px solid blue", backgroundColor : "blue", color : "black" }} >
    <AddIcon></AddIcon> Add camp
    </Button>
    { camps && camps.map((camp) => {
      return(
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
        <div key={camp._id}>
            <ButtonGroup>
              <Button onClick={() => updateCampHandler(camp._id)}>
                <EditIcon color="primary" sx={{ "&:hover": { color: "green" } }} ></EditIcon>
              </Button>
              <Button>
                <DeleteIcon onClick={() => deleteCampHandler(camp._id)} color="warning" sx={{ "&:hover": { color: "green" } }}/>
              </Button>
            </ButtonGroup>
        </div>
      </div>
      </div>
      )
    })}
    </>
  );
};