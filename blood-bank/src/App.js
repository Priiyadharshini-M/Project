import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import {Register} from './pages/Register'
import { Camps } from './pages/Camps'
import { AddCamp } from './pages/AddCamp'
import { AdminDonors } from './pages/AdminDonors'
import { AdminHome } from './pages/AdminHome'
import { MyProfile } from './pages/MyProfile'
import { DonorProfile } from './pages/DonorProfile'
import  AdminLogin  from './pages/AdminLogin'
import { loadUser, loadAdmin, loadDonor } from './Store/Actions/action'
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './pages/EditMyProfile';
import EditDonorProfile from './pages/EditDonorProfile';
import AdminProfile from './pages/AdminProfile';
import AdminEditProfile from './pages/EditAdminProfile';
import { Search } from './pages/Search';
import FilterDonor from './pages/FilterDonor'


function App() {
  const [campDetails, setCampDetails] = useState({
    hospitalName:'',
    address:'',
    campName:'',
    startDate:'',
    endDate:''})

  const user = useSelector( state => state.user._userId )
  const donor = useSelector( state => state.donor._donorId )
  console.log("from app.js user:"+user)
  console.log("from app.js donor:"+donor)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
    dispatch(loadAdmin())
    dispatch(loadDonor())
  },[dispatch])

  return (
    <>
    {/* <Router> */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/camps' element={<Camps setCampDetails={setCampDetails}/>} />
        <Route path='/my-profile' element={<MyProfile />} /> 
        <Route path='/donor-profile' element={<DonorProfile />} /> 
        <Route path='/my-profile/edit-profile' element={<EditProfile />} />
        <Route path='/my-profile/edit-donorprofile' element={<EditDonorProfile />} />
        <Route path='/search' element={<Search />} />
        <Route path='/search/donor/view/:donorId' element={<FilterDonor />} />
        <Route path='/admin/my-profile' element={<AdminProfile />} />
        <Route path='/admin/my-profile/edit-profile' element={<AdminEditProfile />} />
        {/* <Route path='/addCamp' element={<AddCamp campDetails={campDetails} setCampDetails={setCampDetails}/>} /> */}

            <Route path='/admin' element={<AdminHome />}></Route>
            <Route path='/admin/home' element={<AdminHome />}></Route>
            <Route path='/admin/login' element={<AdminLogin />}></Route>
            <Route path='/admin/camps' element={<Camps setCampDetails={setCampDetails}/>}></Route>
            <Route path='/admin/addCamp' element={<AddCamp campDetails={campDetails} setCampDetails={setCampDetails}/>} />
            <Route path='/admin/donors' element={<AdminDonors />}></Route>

      </Routes>
    {/* </Router> */}
    </>
  );
}

export default App;
