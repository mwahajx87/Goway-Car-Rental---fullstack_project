import React, { useEffect } from 'react'
import Sidebar from '../../components/Owner/Sidebar'
import { Outlet } from 'react-router-dom'
import NavbarOwner from '../../components/Owner/NavbarOwner'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const { isOwner, navigate } = useAppContext();
  useEffect(() => {
    if (!isOwner) {
      navigate('/'); // Redirect to home if not an owner
    }
  }, [isOwner]);
  return (
    <div className='flex flex-col min-h-screen'>
      <NavbarOwner />
      <div className='flex'>
        <Sidebar />
          <Outlet />
      </div>
    </div>
  )
}

export default Layout
