import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'

const ManageBookings = () => {

  const { currency, axios } = useAppContext()

  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full max-w-7xl mx-auto'>

      <Title 
        title="Reservation Management" 
        subTitle="Monitor all active and pending reservations. Direct the flow of your fleet's operations." 
      />

      <div className='w-full rounded-[2.5rem] overflow-hidden border border-border/50 bg-white shadow-premium mt-6'>
        <div className="overflow-x-auto">
          <table className='w-full border-collapse text-left'>
            <thead>
              <tr className="bg-surface/50 border-b border-border/50">
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Vehicle</th>
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hidden lg:table-cell">Duration</th>
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Revenue</th>
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hidden md:table-cell">Payment</th>
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <AnimatePresence mode='popLayout'>
                {bookings.map((booking, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={booking._id} 
                    className='group hover:bg-surface/30 transition-colors'>

                    <td className='px-8 py-6'>
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-surface border border-border overflow-hidden p-2 group-hover:border-accent/30 transition-colors">
                           <img src={booking.car.image} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className='text-base font-black text-primary tracking-tight'>{booking.car.brand} {booking.car.model}</p>
                          <p className='text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5'>Reference: #{1000 + index}</p>
                        </div>
                      </div>
                    </td>

                    <td className='px-8 py-6 hidden lg:table-cell'>
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-primary">
                            {new Date(booking.pickupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                            to {new Date(booking.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                       </div>
                    </td>
                    
                    <td className='px-8 py-6'>
                       <p className="text-lg font-black text-primary">{currency}{booking.price}</p>
                    </td>

                    <td className='px-8 py-6 hidden md:table-cell'>
                      <div className="inline-flex items-center px-3 py-1 bg-surface rounded-full border border-border text-[10px] font-black text-text-muted uppercase tracking-widest">
                         Offline
                      </div>
                    </td>

                    <td className='px-8 py-6'>
                      {booking.status === 'pending' ? (
                        <div className="relative inline-block w-full max-w-[140px]">
                          <select 
                            onChange={e => changeBookingStatus(booking._id, e.target.value)} 
                            value={booking.status} 
                            className='w-full appearance-none bg-white border border-border px-4 py-2 pr-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary outline-none focus:border-accent shadow-sm cursor-pointer transition-all'>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirm</option>
                            <option value="cancelled">Cancel</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-muted">
                            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                          booking.status === 'confirmed' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${booking.status === 'confirmed' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                          {booking.status}
                        </div>
                      )}
                    </td>

                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {bookings.length === 0 && (
             <div className="py-24 text-center">
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg className="w-8 h-8 opacity-20 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                   </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">No reservations found</h3>
                <p className="text-text-muted text-sm font-medium">Your vehicle fleet is currently awaiting its next adventure.</p>
             </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ManageBookings
