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
import EditProfile from '../components/user/EditMyProfile';
import EditDonorProfile from '../components/donor/EditDonorProfile';
import AdminProfile from '../components/admin/AdminProfile';
import AdminEditProfile from '../components/admin/EditAdminProfile';
import { Search } from '../components/donor/SearchDonor';
import FilterDonor from '../components/donor/FilterDonor'
import ProtectedRoute from '../components/pages/ProtectedRoute';
import { About } from '../components/pages/About'
import { EditCamp } from './admin/EditCamp';

const Router = () => {

  return (
    <>
      <Routes>
        {/* user and donor paths */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/camps' element={<ProtectedRoute role1="user" role2="donor"><Camps /></ProtectedRoute>} />
        <Route path='/my-profile' element={<ProtectedRoute role1="user"><MyProfile /></ProtectedRoute>} />
        <Route path='/donor-profile' element={<ProtectedRoute role2="donor"><DonorProfile /></ProtectedRoute>} />
        <Route path='/my-profile/edit-profile' element={<ProtectedRoute role1="user"><EditProfile /></ProtectedRoute>} />
        <Route path='/my-profile/edit-donorprofile' element={<ProtectedRoute role2="donor"><EditDonorProfile /></ProtectedRoute>} />
        <Route path='/search' element={<ProtectedRoute role1="user" role2="donor"><Search /></ProtectedRoute>} />
        <Route path='/search/donor/view/:donorId' element={<ProtectedRoute role1="user" role2="donor"><FilterDonor /></ProtectedRoute>} />
        <Route path='/about' element={<About></About>} />

        {/* admin paths */}
        <Route path='/admin/my-profile' element={<ProtectedRoute role1="admin"><AdminProfile /></ProtectedRoute>} />
        <Route path='/admin/my-profile/edit-profile' element={<ProtectedRoute role1="admin"><AdminEditProfile /></ProtectedRoute>} />
        <Route path='/admin' element={<AdminHome />}></Route>
        <Route path='/admin/home' element={<AdminHome />}></Route>
        <Route path='/admin/login' element={<AdminLogin />}></Route>
        <Route path='/admin/camps' element={<ProtectedRoute role1="admin"><Camps /></ProtectedRoute>}></Route>
        <Route path='/admin/addCamp' element={<ProtectedRoute role1="admin"><AddCamp /></ProtectedRoute>} />
        <Route path='/admin/editCamp/:id' element={<ProtectedRoute role1="admin"><EditCamp /></ProtectedRoute>} />
        <Route path='/admin/donors' element={<ProtectedRoute role1="admin"><AdminDonors /></ProtectedRoute>}></Route>
      </Routes>
    </>
  )
}

export default Router