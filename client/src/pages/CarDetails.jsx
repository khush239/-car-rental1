import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const CarDetails = () => {

  const { id } = useParams()

  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setCar(cars.find(car => car._id === id))
  }, [cars, id])

  return car ? (
    <div className='bg-white min-h-screen'>
      
      {/* Header / Breadcrumb */}
      <div className='max-w-7xl mx-auto px-6 pt-12 md:pt-20'>
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)} 
          className='group flex items-center gap-3 text-text-muted hover:text-primary transition-colors cursor-pointer font-bold uppercase tracking-widest text-xs'>
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
            <img src={assets.arrow_icon} alt="" className='rotate-180 w-3 opacity-60 group-hover:opacity-100' />
          </div>
          Back to collection
        </motion.button>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-12 md:py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start'>
          
          {/* Left Side: Image & Content */}
          <div className='lg:col-span-8'>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className='relative aspect-[16/10] md:aspect-[16/9] bg-surface rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 md:p-16 border border-border/50 shadow-sm mb-12 group'>
              <img src={car.image} alt="" className='w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105' />
              
              <div className='absolute top-8 left-8 glass px-4 py-2 rounded-full border border-white/40'>
                <p className='text-[10px] font-black text-accent uppercase tracking-widest'>{car.category}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='space-y-12'>
              
              <div>
                <motion.h1 
                  className='text-5xl md:text-7xl font-black text-primary leading-tight mb-4 tracking-tight tracking-[-0.03em]'>
                  {car.brand} <span className="text-gradient">{car.model}</span>
                </motion.h1>
                <div className="flex items-center gap-4 text-text-muted font-bold uppercase tracking-[0.2em] text-sm">
                   <span>{car.year} Model</span>
                   <span className="w-1.5 h-1.5 bg-border rounded-full"></span>
                   <span>Premium {car.category}</span>
                </div>
              </div>

              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6'>
                {[
                  { icon: assets.users_icon, label: 'Capacity', value: `${car.seating_capacity} Seats` },
                  { icon: assets.fuel_icon, label: 'Fuel Type', value: car.fuel_type },
                  { icon: assets.car_icon, label: 'Transmission', value: car.transmission },
                  { icon: assets.location_icon, label: 'Location', value: car.location },
                ].map(({ icon, label, value }, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    viewport={{ once: true }}
                    key={label} 
                    className='bg-surface p-6 rounded-3xl border border-border/50 hover:border-accent/20 transition-all flex flex-col items-center text-center group'>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                       <img src={icon} alt="" className='h-5 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all' />
                    </div>
                    <p className='text-[10px] font-black text-text-muted uppercase tracking-widest mb-1'>{label}</p>
                    <span className='text-sm md:text-base font-bold text-primary'>{value}</span>
                  </motion.div>
                ))}
              </div>

              <div className='pt-8 border-t border-border'>
                <h2 className='text-2xl md:text-3xl font-black text-primary mb-6'>The Experience</h2>
                <p className='text-text-muted text-lg md:text-xl leading-relaxed font-medium max-w-3xl'>
                  {car.description || "Experience unparalleled luxury and performance. This vehicle is curated for those who demand excellence in every mile of their journey."}
                </p>
              </div>

              <div className='pt-8'>
                <h2 className='text-2xl md:text-3xl font-black text-primary mb-8'>Elite Features</h2>
                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12'>
                  {
                    ["Intelligent 360° Vision", "Seamless Bluetooth Connectivity", "Advanced Dynamic GPS", "Climate Controlled Seating", "Precision Drive Assist"].map((item, i) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i }}
                        key={item} 
                        className='flex items-center text-text-main text-lg font-bold'>
                        <div className='w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mr-5 flex-shrink-0'>
                          <img src={assets.check_icon} className='h-3 w-3 brightness-0' alt="" />
                        </div>
                        {item}
                      </motion.li>
                    ))
                  }
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Booking Form */}
          <div className='lg:col-span-4 lg:sticky lg:top-32'>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onSubmit={handleSubmit} 
              className='glass p-10 rounded-[2.5rem] border border-border shadow-glass relative overflow-hidden'>
              
              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary"></div>

              <div className='flex items-baseline justify-between mb-8 pb-8 border-b border-border'>
                <div className="flex items-baseline gap-1">
                   <span className="text-sm font-black text-text-muted uppercase tracking-widest mr-2">Daily</span>
                   <p className='text-primary font-black text-5xl tracking-tighter'>${car.pricePerDay}</p>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='flex flex-col gap-3'>
                  <label htmlFor="pickup-date" className='text-xs font-black text-primary uppercase tracking-[0.2em] ml-1'>Collection Date</label>
                  <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)}
                    type="date" className='w-full bg-white/50 border border-border px-6 py-4 rounded-2xl text-base outline-none focus:border-accent transition-all font-bold text-text-main shadow-sm' required id='pickup-date' min={new Date().toISOString().split('T')[0]} />
                </div>

                <div className='flex flex-col gap-3'>
                  <label htmlFor="return-date" className='text-xs font-black text-primary uppercase tracking-[0.2em] ml-1'>Return Date</label>
                  <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                    type="date" className='w-full bg-white/50 border border-border px-6 py-4 rounded-2xl text-base outline-none focus:border-accent transition-all font-bold text-text-main shadow-sm' required id='return-date' />
                </div>

                <button className='w-full bg-primary hover:bg-black transition-all py-5 font-black text-lg text-white rounded-2xl cursor-pointer shadow-premium mt-4 uppercase tracking-[0.15em]'>
                  Reserve Now
                </button>

                <div className="flex items-center justify-center gap-3 pt-6 text-text-muted">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                    <p className='text-[10px] font-black uppercase tracking-[0.15em]'>Instant Confirmation</p>
                </div>
              </div>
            </motion.form>
          </div>
          
        </div>
      </div>

    </div>
  ) : <Loader />
}

export default CarDetails
