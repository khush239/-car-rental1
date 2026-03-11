import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Navbar = () => {

    const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const changeRole = async () => {
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 lg:px-12 xl:px-14 py-5 z-[100] glass border-b border-border/50 shadow-premium`}>

            <Link to='/' className="relative z-10">
                <motion.img 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    src={assets.logo} 
                    alt="logo" 
                    className="h-8 md:h-9" 
                />
            </Link>

            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-0 max-sm:left-0 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 max-sm:p-12 transition-all duration-700 z-50 bg-white sm:bg-transparent ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
                
                <div className="flex sm:hidden w-full justify-between items-center mb-10">
                   <img src={assets.logo} alt="logo" className="h-8" />
                   <button onClick={() => setOpen(false)}>
                      <img src={assets.close_icon} alt="close" className="w-6" />
                   </button>
                </div>

                {menuLinks.map((link, index) => (
                    <Link 
                      key={index} 
                      to={link.path} 
                      onClick={() => setOpen(false)}
                      className='group relative py-1 text-sm font-bold text-primary hover:text-black transition-all whitespace-nowrap uppercase tracking-widest'>
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}

                <div className='hidden xl:flex items-center text-[10px] gap-3 border border-border px-5 py-3 rounded-2xl min-w-[280px] bg-surface/50 focus-within:border-accent focus-within:bg-white transition-all shadow-sm'>
                    <img src={assets.search_icon} alt="search" className='w-3 h-3 opacity-30' />
                    <input type="text" className="w-full bg-transparent outline-none placeholder-text-muted font-black uppercase tracking-widest text-primary" placeholder="Search Fleet..." />
                </div>

                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-8 w-full sm:w-auto mt-auto sm:mt-0'>
                    <button 
                      onClick={async () => {
                        if (!user) {
                           setShowLogin(true)
                        } else if (isOwner) {
                           navigate('/owner')
                        } else {
                           await changeRole()
                           navigate('/owner')
                        }
                        setOpen(false)
                      }} 
                      className="cursor-pointer text-[10px] font-black text-primary hover:text-accent transition-all whitespace-nowrap uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-accent pb-1">
                        {isOwner ? 'Master Dashboard' : 'List Vehicle'}
                    </button>

                    <button 
                      onClick={() => { 
                        user ? logout() : setShowLogin(true);
                        setOpen(false);
                      }} 
                      className="w-full sm:w-auto cursor-pointer px-10 py-3.5 bg-primary hover:bg-black transition-all text-white rounded-2xl text-[10px] font-black shadow-premium uppercase tracking-[0.2em]">
                      {user ? 'Sign Out' : 'Sign In'}
                    </button>
                </div>
            </div>

            <button className='sm:hidden cursor-pointer relative z-10' aria-label="Menu" onClick={() => setOpen(!open)}>
                <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className='w-6 h-6' />
            </button>

        </motion.nav>
    )
}

export default Navbar
