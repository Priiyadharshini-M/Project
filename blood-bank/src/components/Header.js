import React from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./admin/AdminNavbar";
import { Navbar } from '../components/pages/Navbar';

//header component
const Header = () => {
  const location = useLocation()
  const paths = location.pathname.split('/')
  return (<>
    {
      paths.includes('admin') ? <AdminNavbar /> : <Navbar />
    }
  </>)
}

export default Header