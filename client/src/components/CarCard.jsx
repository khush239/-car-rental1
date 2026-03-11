import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const CarCard = ({ car }) => {

  const navigate = useNavigate()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => { navigate(`/car-details/${car._id}`); scrollTo(0, 0) }} 
      className='group bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-glass transition-all duration-500 cursor-pointer border border-border/50 flex flex-col h-full'>

      <div className='relative aspect-[4/3] overflow-hidden bg-surface flex items-center justify-center p-8'>
        <motion.img 
          whileHover={{ scale: 1.08, rotate: -2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className='w-full h-full object-contain drop-shadow-lg' 
        />

        {car.isAvaliable && (
          <div className='absolute top-4 left-4 glass px-3 py-1.5 rounded-full border border-white/40 shadow-sm'>
             <p className='text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-1.5'>
               <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
               Available
             </p>
          </div>
        )}

        <div className='absolute bottom-4 right-4 bg-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl font-black shadow-lg border border-white/10'>
          <span className='text-xl'>${car.pricePerDay}</span>
          <span className='text-xs opacity-70 font-medium'>/day</span>
        </div>
      </div>

      <div className='p-8 flex flex-col flex-1'>
        <div className='mb-6'>
          <p className='text-accent text-[10px] font-black uppercase tracking-[0.15em] mb-2'>{car.category}</p>
          <h3 className='text-2xl font-bold text-primary group-hover:text-accent transition-colors leading-tight'>{car.brand} {car.model}</h3>
          <p className='text-text-muted text-xs mt-1 font-semibold'>{car.year} Model</p>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-border'>
          <div className='flex items-center text-xs font-bold text-text-main'>
            <img src={assets.users_icon} alt="" className='w-3.5 h-3.5 mr-2 opacity-30 grayscale' />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className='flex items-center text-xs font-bold text-text-main'>
            <img src={assets.fuel_icon} alt="" className='w-3.5 h-3.5 mr-2 opacity-30 grayscale' />
            <span>{car.fuel_type}</span>
          </div>
          <div className='flex items-center text-xs font-bold text-text-main'>
            <img src={assets.car_icon} alt="" className='w-3.5 h-3.5 mr-2 opacity-30 grayscale' />
            <span>{car.transmission}</span>
          </div>
          <div className='flex items-center text-xs font-bold text-text-main'>
            <img src={assets.location_icon} alt="" className='w-3.5 h-3.5 mr-2 opacity-30 grayscale' />
            <span>{car.location}</span>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

export default CarCard
