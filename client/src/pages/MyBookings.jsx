import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const MyBookings = () => {

  const { axios, user, currency } = useAppContext()

  const [bookings, setBookings] = useState([])

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    user && fetchMyBookings()
  }, [user])

  return (
    <div className='bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto px-6 py-24 md:py-32'>
        <Title 
          title='My Reservations'
          subTitle='Manage your upcoming and past luxury driving experiences.'
          align="left" 
        />

        <div className="mt-16 md:mt-24 space-y-8">
          {bookings.length > 0 ? bookings.map((booking, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={booking._id} 
              className='group bg-white border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-premium hover:shadow-glass transition-all duration-500 flex flex-col lg:flex-row gap-10 items-center'>
              
              {/* Car Image + Overview */}
              <div className='w-full lg:w-1/4 lg:border-r border-border/60 lg:pr-10'>
                <div className='aspect-video rounded-3xl overflow-hidden mb-6 bg-surface border border-border/40 p-4'>
                  <img src={booking.car.image} alt="" className='w-full h-full object-contain transition-transform duration-700 group-hover:scale-110' />
                </div>
                <h3 className='text-2xl font-black text-primary mb-1 group-hover:text-accent transition-colors'>{booking.car.brand} {booking.car.model}</h3>
                <p className='text-text-muted text-sm font-bold uppercase tracking-widest'>{booking.car.year} • {booking.car.category}</p>
              </div>

              {/* Booking Details */}
              <div className='w-full lg:w-2/4 grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className="space-y-6">
                  <div className='inline-flex items-center px-4 py-2 rounded-full glass border border-white/40 shadow-sm'>
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em]">Ref: #{1000 + index}</span>
                  </div>
                  
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10'>
                      <img src={assets.calendar_icon_colored} alt="dates" className='w-5 h-5 opacity-70' />
                    </div>
                    <div>
                      <p className='text-[10px] font-black text-text-muted uppercase tracking-widest mb-1'>Rental Period</p>
                      <p className='text-lg font-bold text-primary'>
                        {new Date(booking.pickupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        <span className='mx-2 opacity-30'>—</span>
                        {new Date(booking.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${
                    booking.status === 'confirmed' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                    : 'bg-rose-50 text-rose-700 border-rose-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${booking.status === 'confirmed' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                    {booking.status}
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10'>
                      <img src={assets.location_icon} alt="location" className='w-5 h-5 opacity-40 grayscale' />
                    </div>
                    <div>
                      <p className='text-[10px] font-black text-text-muted uppercase tracking-widest mb-1'>Collection Point</p>
                      <p className='text-lg font-bold text-primary'>{booking.car.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className='w-full lg:w-1/4 flex flex-col items-end justify-center pt-8 lg:pt-0 lg:border-l border-border/60 lg:pl-10'>
                 <div className="text-right">
                    <p className='text-[10px] font-black text-text-muted uppercase tracking-widest mb-2'>Reservation Total</p>
                    <h2 className='text-4xl md:text-5xl font-black text-primary mb-2'>{currency}{booking.price}</h2>
                    <p className='text-[10px] font-bold text-text-muted/60 lowercase italic'>booked {new Date(booking.createdAt).toLocaleDateString()}</p>
                 </div>
                 
                 <button className="mt-8 text-xs font-black text-accent uppercase tracking-widest hover:text-primary transition-colors cursor-pointer border-b-2 border-accent/20 hover:border-primary pb-1">
                    Download Documents
                 </button>
              </div>

            </motion.div>
          )) : (
            <div className="py-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6">
                   <img src={assets.calendar_icon_colored} alt="not found" className="w-8 h-8 opacity-20 grayscale" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">No active reservations</h3>
                <p className="text-text-muted font-medium max-w-sm">You haven't booked any premium vehicles yet. Explore our collection to find your next drive.</p>
                <button 
                  onClick={() => navigate('/cars')}
                  className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-premium">
                  Browse Collection
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBookings
