import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Dashboard = () => {

  const { axios, isOwner, currency } = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    { title: "Total Fleet", value: data.totalCars, icon: assets.carIconColored },
    { title: "Reservations", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Active", value: data.completedBookings, icon: assets.listIconColored },
  ]

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/owner/dashboard')
      if (data.success) {
        setData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData()
    }
  }, [isOwner])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='flex-1'>
      
      <Title 
        title="Fleet Overview" 
        subTitle="Real-time analytics and performance metrics for your luxury vehicle collection." 
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10'>
        {dashboardCards.map((card, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index} 
            className='p-8 rounded-[2.5rem] border border-border/50 bg-white shadow-premium hover:shadow-glass transition-all group'>
            <div className='flex items-center justify-between mb-4'>
               <div className='w-12 h-12 rounded-2xl bg-surface flex items-center justify-center border border-border group-hover:bg-accent/10 group-hover:border-accent/20 transition-all'>
                 <img src={card.icon} alt="" className='h-6 w-6 opacity-60' />
               </div>
               <div className='flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest'>
                  <span>+12%</span>
               </div>
            </div>
            <div>
              <h3 className='text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1'>{card.title}</h3>
              <p className='text-4xl font-black text-primary tracking-tight'>{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12'>
        
        {/* Recent Bookings */}
        <div className='lg:col-span-8 bg-white border border-border/50 rounded-[2.5rem] p-10 shadow-premium overflow-hidden'>
          <div className="flex items-center justify-between mb-10">
            <div>
                <h2 className='text-2xl font-black text-primary tracking-tight'>Recent Activity</h2>
                <p className='text-xs font-bold text-text-muted uppercase tracking-widest mt-1'>Latest Guest Interactions</p>
            </div>
            <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-primary transition-colors">View All</button>
          </div>

          <div className='space-y-2'>
            {data.recentBookings.length > 0 ? data.recentBookings.map((booking, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                key={index} 
                className='flex items-center justify-between p-4 rounded-3xl hover:bg-surface transition-all group'>
                
                <div className='flex items-center gap-6'>
                  <div className='w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center p-2'>
                    <img src={booking.car.image} alt="" className='w-full h-full object-contain' />
                  </div>
                  <div>
                    <p className='text-lg font-bold text-primary tracking-tight'>{booking.car.brand} {booking.car.model}</p>
                    <p className='text-xs text-text-muted font-bold'>{new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>

                <div className='flex items-center gap-8'>
                  <p className='text-lg font-black text-primary'>{currency}{booking.price}</p>
                  <div className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                    booking.status === 'confirmed' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                    : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              </motion.div>
            )) : (
               <div className="py-12 text-center">
                  <p className="text-text-muted font-bold text-sm">No recent bookings found.</p>
               </div>
            )}
          </div>
        </div>

        {/* Financial Performance */}
        <div className='lg:col-span-4 bg-primary rounded-[2.5rem] p-10 shadow-premium relative overflow-hidden flex flex-col justify-between'>
          {/* Accent decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className='text-2xl font-black text-white tracking-tight'>Analytics</h2>
            <p className='text-[10px] font-black text-white/50 uppercase tracking-widest mt-1'>Revenue Performance</p>
          </div>

          <div className='relative z-10 mt-20 mb-10'>
            <p className='text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4'>Estimated Monthly</p>
            <h2 className='text-6xl font-black text-white tracking-tighter'>
              {currency}{data.monthlyRevenue.toLocaleString()}
            </h2>
            <div className='mt-10'>
               <div className='flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest text-white/60'>
                  <span>Progress to Goal</span>
                  <span>75%</span>
               </div>
               <div className='h-2 w-full bg-white/10 rounded-full overflow-hidden'>
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '75%' }}
                   transition={{ duration: 1, ease: 'easeOut' }}
                   className='h-full bg-accent'
                 />
               </div>
            </div>
          </div>

          <button className="relative z-10 w-full py-4 bg-white/5 hover:bg-white/10 transition-all border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest">
             Export Financial Report
          </button>
        </div>

      </div>
    </motion.div>
  )
}

export default Dashboard
