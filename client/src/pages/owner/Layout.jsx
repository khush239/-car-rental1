import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const { isOwner, navigate, user } = useAppContext()

  useEffect(() => {
    if (user && !isOwner) {
      navigate('/')
    }
  }, [isOwner, user])
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <NavbarOwner />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 w-full pl-20 md:pl-72 pt-16 md:pt-20 transition-all duration-500'>
          <div className="p-6 md:p-10 lg:p-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
