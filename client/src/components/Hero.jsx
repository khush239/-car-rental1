import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')

    const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()

    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='min-h-screen flex flex-col items-center justify-center gap-12 pt-28 bg-surface text-center px-6 overflow-hidden relative'>

            {/* Decorative background element */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <motion.h1 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='text-6xl md:text-8xl font-black mb-6 text-primary tracking-tight leading-[1.1]'>
                    Experience <span className="text-gradient">Pure Luxury</span> <br /> on Every Mile
                </motion.h1>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl text-text-muted font-medium mb-12 max-w-2xl">
                    Discover and book the world's most elite vehicles with absolute ease. 
                    Premium cars for your premium moments.
                </motion.p>

                <motion.form
                    initial={{ scale: 0.98, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    onSubmit={handleSearch} 
                    className='flex flex-col md:flex-row items-center justify-between p-2 md:p-3 rounded-2xl md:rounded-[100px] w-full max-w-5xl glass border border-border shadow-glass relative z-10'>

                    <div className='flex flex-col md:flex-row items-center w-full md:w-auto px-6 md:px-10 py-6 md:py-0 gap-8 md:gap-12 flex-1'>
                        <div className='flex flex-col items-start gap-1 w-full md:w-auto relative group'>
                            <div className='flex items-center gap-2'>
                                <img src={assets.location_icon} alt="" className='w-4 h-4 opacity-50 grayscale' />
                                <p className='text-sm font-bold text-text-muted uppercase tracking-wider'>Location</p>
                            </div>
                            <select 
                                required 
                                value={pickupLocation} 
                                onChange={(e) => setPickupLocation(e.target.value)} 
                                className='text-lg text-text-main outline-none cursor-pointer bg-transparent border-none appearance-none font-semibold hover:text-accent transition-colors min-w-[180px]'>
                                <option value="">Select City</option>
                                {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>

                        <div className='hidden md:block w-px h-10 bg-border'></div>

                        <div className='flex flex-col items-start gap-1 w-full md:w-auto'>
                            <div className='flex items-center gap-2'>
                                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 opacity-50 filter grayscale' />
                                <label htmlFor='pickup-date' className='text-sm font-bold text-text-muted uppercase tracking-wider'>Pick-up</label>
                            </div>
                            <input 
                                value={pickupDate} 
                                onChange={e => setPickupDate(e.target.value)} 
                                type="date" 
                                id="pickup-date" 
                                min={new Date().toISOString().split('T')[0]} 
                                className='text-lg text-text-main outline-none cursor-pointer font-semibold hover:text-accent transition-colors bg-transparent' 
                                required 
                            />
                        </div>

                        <div className='hidden md:block w-px h-10 bg-border'></div>

                        <div className='flex flex-col items-start gap-1 w-full md:w-auto'>
                            <div className='flex items-center gap-2'>
                                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 opacity-50 filter grayscale' />
                                <label htmlFor='return-date' className='text-sm font-bold text-text-muted uppercase tracking-wider'>Return</label>
                            </div>
                            <input 
                                value={returnDate} 
                                onChange={e => setReturnDate(e.target.value)} 
                                type="date" 
                                id="return-date" 
                                className='text-lg text-text-main outline-none cursor-pointer font-semibold hover:text-accent transition-colors bg-transparent' 
                                required 
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center justify-center gap-3 px-12 py-5 bg-primary hover:bg-accent-dull text-white rounded-full md:rounded-full cursor-pointer text-lg font-black shadow-premium transition-all w-full md:w-auto'>
                        <img src={assets.search_icon} alt="search" className='brightness-0 invert w-5 h-5' />
                        Find My Car
                    </motion.button>
                </motion.form>
            </div>

            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className='w-full max-w-7xl px-4 mt-8'>
                <motion.img
                    animate={{ 
                        y: [0, -10, 0],
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                    }}
                    src={assets.main_car} alt="car" className='w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]' />
            </motion.div>
        </motion.div>
    )
}

export default Hero
