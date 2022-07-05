import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import {Register} from './pages/Register'
import { Camps } from './pages/Camps'
import { AddCamp } from './pages/AddCamp'
import { AdminCamps } from './pages/AdminCamps'
import { AdminDonors } from './pages/AdminDonors'
import { AdminHome } from './pages/AdminHome'
import  AdminLogin  from './pages/AdminLogin'
import { loadUser } from './Store/Actions/action'
import { useDispatch } from 'react-redux';


function App() {
  const [campDetails, setCampDetails] = useState({
    hospitalName:'',
    address:'',
    campName:'',
    startDate:'',
    endDate:''})

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <>
    {/* <Router> */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/camps' element={<Camps setCampDetails={setCampDetails}/>} />
        <Route path='/addCamp' element={<AddCamp campDetails={campDetails} setCampDetails={setCampDetails}/>} />

            <Route path='/admin' element={<AdminHome />}></Route>
            <Route path='/admin/home' element={<AdminHome />}></Route>
            <Route path='/admin/login' element={<AdminLogin />}></Route>
            <Route path='/admin/camps' element={<AdminCamps />}></Route>
            <Route path='/admin/donors' element={<AdminDonors />}></Route>

      </Routes>
    {/* </Router> */}
    </>
  );
}

export default App;
