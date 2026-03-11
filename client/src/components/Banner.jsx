import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Banner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='max-w-7xl mx-auto px-6 mb-24 md:mb-32'>
      
      <div className='flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-20 premium-gradient rounded-[3rem] overflow-hidden shadow-2xl relative'>
        
        {/* Decorative circle */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className='text-white flex-1 relative z-10'>
          <h2 className='text-4xl md:text-6xl font-black leading-[1.1] mb-6'>
            Do You Own a <br /> <span className="text-accent underline decoration-accent/30 underline-offset-8">Luxury Car?</span>
          </h2>
          <p className='text-base md:text-xl font-medium opacity-80 max-w-xl leading-relaxed'>
            Monetize your vehicle effortlessly by listing it on CarRental. 
            We handle insurance, verification, and secure payments.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-10 py-4 bg-accent hover:bg-accent-dull transition-all text-white rounded-full text-lg font-black mt-10 cursor-pointer shadow-xl border border-white/10'>
            List Your Vehicle
          </motion.button>
        </div>

        <div className="flex-1 flex justify-end mt-12 md:mt-0 relative z-10">
            <motion.img
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                src={assets.banner_car_image} alt="Luxury Car" className='w-full max-w-md md:max-w-xl object-contain drop-shadow-2xl' />
        </div>
      </div>

    </motion.section>
  )
}

export default Banner
