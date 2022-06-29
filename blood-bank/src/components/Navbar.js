import React,{ useState } from 'react'
import * as Icons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Link } from "react-router-dom"

function Navbar() {
    const [sidebar,setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
    <div className='navbar'>
        <Link to="#" className="menu-bars">
            <Icons.FaBars onClick={showSidebar} />
        </Link>
    </div>
    <nav className={ sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
                <Link to="#" className='menu-bars'></Link>
                <AiIcons.AiOutlineClose />
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar