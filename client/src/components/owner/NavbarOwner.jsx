import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {

    const {user} = useAppContext()

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 px-6 md:px-10 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Link to='/' className="hover:opacity-80 transition-opacity">
          <img src={assets.logo} alt="CarRental" className="h-7"/>
        </Link>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
           <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
           <span className="text-[10px] font-black text-accent uppercase tracking-widest">Management Console</span>
        </div>
      </div>

      <div className='flex items-center gap-6'>
        <Link to='/' className="hidden sm:flex items-center gap-2 text-xs font-black text-text-muted hover:text-primary uppercase tracking-widest transition-colors">
           <img src={assets.arrow_icon} alt="" className="w-3 rotate-180 opacity-40" />
           Back to Site
        </Link>
        <div className="w-px h-6 bg-border hidden sm:block"></div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold text-primary hidden sm:block">
            {user?.name || "Premium Owner"}
          </p>
          <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden shadow-sm">
             <img src={user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarOwner
