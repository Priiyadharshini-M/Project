import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../components/pages/Home'
import { Login } from '../components/pages/Login'
import { Register } from '../components/user/Register'
import { Camps } from '../components/admin/Camps'
import { AddCamp } from '../components/admin/AddCamp'
import { AdminDonors } from '../components/admin/AdminDonors'
import { AdminHome } from '../components/admin/AdminHome'
import { MyProfile } from '../components/user/MyProfile'
import { DonorProfile } from '../components/donor/DonorProfile'
import AdminLogin from '../components/admin/AdminLogin'
import { useSelector } from 'react-redux';
import EditProfile from '../components/user/EditMyProfile';
import EditDonorProfile from '../components/donor/EditDonorProfile';
import AdminProfile from '../components/admin/AdminProfile';
import AdminEditProfile from '../components/admin/EditAdminProfile';
import { Search } from '../components/donor/SearchDonor';
import FilterDonor from '../components/donor/FilterDonor'
import ProtectedRoute from '../components/pages/ProtectedRoute';

const Router = () => {
  const [campDetails, setCampDetails] = useState({
    hospitalName: '',
    address: '',
    campName: '',
    startDate: '',
    endDate: ''
  })

  const user = useSelector(state => state.user._userId)
  const donor = useSelector(state => state.donor._donorId)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/camps' element={<ProtectedRoute><Camps setCampDetails={setCampDetails} /></ProtectedRoute>} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/donor-profile' element={<DonorProfile />} />
        <Route path='/my-profile/edit-profile' element={<EditProfile />} />
        <Route path='/my-profile/edit-donorprofile' element={<EditDonorProfile />} />
        <Route path='/search' element={<Search />} />
        <Route path='/search/donor/view/:donorId' element={<FilterDonor />} />
        <Route path='/admin/my-profile' element={<AdminProfile />} />
        <Route path='/admin/my-profile/edit-profile' element={<AdminEditProfile />} />

        <Route path='/admin' element={<AdminHome />}></Route>
        <Route path='/admin/home' element={<AdminHome />}></Route>
        <Route path='/admin/login' element={<AdminLogin />}></Route>
        <Route path='/admin/camps' element={<Camps setCampDetails={setCampDetails} />}></Route>
        <Route path='/admin/addCamp' element={<AddCamp campDetails={campDetails} setCampDetails={setCampDetails} />} />
        <Route path='/admin/donors' element={<AdminDonors />}></Route>
      </Routes>
    </>
  )
}

export default Router