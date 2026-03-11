import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const Sidebar = () => {

  const { user, axios, fetchUser } = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post('/api/owner/update-image', formData)

      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='fixed left-0 top-0 bottom-0 pt-24 pb-10 flex flex-col items-center w-20 md:w-72 bg-white border-r border-border/50 z-40 transition-all duration-500'>
      
      {/* Profile Section */}
      <div className='w-full px-4 mb-10'>
        <div className='relative group w-12 md:w-20 h-12 md:h-20 mx-auto rounded-[2rem] overflow-hidden shadow-premium border-2 border-border/50 p-1 bg-white'>
          <label htmlFor="image" className="block w-full h-full cursor-pointer relative overflow-hidden rounded-[1.8rem]">
            <img 
              src={image ? URL.createObjectURL(image) : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"} 
              alt="owner" 
              className='w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-500' 
            />
            <input type="file" id='image' accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />

            <div className='absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all'>
              <img src={assets.edit_icon} alt="edit" className="w-5 brightness-0 invert" />
            </div>
          </label>
        </div>

        {image && (
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-4 w-full flex items-center justify-center gap-2 py-2 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer shadow-lg' 
            onClick={updateImage}>
            Update <img src={assets.check_icon} width={10} className="brightness-0 invert" alt="" />
          </motion.button>
        )}

        <div className="mt-4 text-center hidden md:block">
           <p className='text-primary font-black text-sm tracking-tight'>{user?.name || "Premium Owner"}</p>
           <p className='text-[10px] font-black text-text-muted uppercase tracking-widest mt-0.5'>Verified Owner</p>
        </div>
      </div>

      <div className='w-full px-3 space-y-1.5 flex-1'>
        <p className="hidden md:block px-5 py-2 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-2 opacity-50">Main Menu</p>
        
        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname;
          return (
            <NavLink 
              key={index} 
              to={link.path} 
              className={`group flex items-center gap-4 w-full py-4 px-5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary shadow-premium border border-primary text-white' : 'text-text-muted hover:bg-surface border border-transparent'}`}>
              
              <div className={`w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-110 ${isActive ? 'p-0.5' : 'p-1 opacity-60'}`}>
                <img 
                  src={isActive ? link.coloredIcon : link.icon} 
                  alt={link.name} 
                  className={isActive ? 'brightness-0 invert' : ''}
                />
              </div>

              <span className='hidden md:block text-sm font-bold tracking-tight'>{link.name}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute right-3 w-1.5 h-6 bg-white/40 rounded-full hidden md:block" 
                />
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom section / Help */}
      <div className="w-full px-6 pt-6 border-t border-border/50 hidden md:block">
         <div className="bg-surface rounded-3xl p-5 border border-border/40">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Concierge Support</p>
            <p className="text-[11px] font-medium text-text-muted leading-relaxed">Need assistance with your fleet or bookings?</p>
            <button className="mt-3 text-[10px] font-black text-accent uppercase tracking-widest hover:text-primary transition-colors">Contact Support</button>
         </div>
      </div>
    </div>
  )
}

export default Sidebar
