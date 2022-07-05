import React from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { Navbar } from './Navbar';

const Header = () => {
  const location = useLocation()
  console.log(location.pathname)
  const paths = location.pathname.split('/')
  return(<>
        {
            paths.includes('admin')? <AdminNavbar /> : <Navbar />
        }
  </>)
}

export default Header