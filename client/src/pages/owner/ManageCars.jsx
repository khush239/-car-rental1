import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'

const ManageCars = () => {

  const { isOwner, axios, currency, navigate } = useAppContext()

  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars')
      if (data.success) {
        setCars(data.cars)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?')
      if (!confirm) return null

      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerCars()
  }, [isOwner])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full max-w-7xl mx-auto'>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <Title 
          title="Vehicle Inventory" 
          subTitle="Manage your elite collection, track availability, and curate your fleet." 
        />
        <button 
          onClick={() => navigate('/owner/add-car')}
          className="mb-10 px-8 py-3 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-premium flex items-center gap-3 cursor-pointer">
          <img src={assets.addIconColored} alt="" className="w-4 brightness-0 invert" />
          Register New Vehicle
        </button>
      </div>

      <div className='w-full rounded-[2.5rem] overflow-hidden border border-border/50 bg-white shadow-premium mt-6'>
        <div className="overflow-x-auto">
          <table className='w-full border-collapse text-left'>
            <thead>
              <tr className="bg-surface/50 border-b border-border/50">
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Vehicle Details</th>
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hidden lg:table-cell">Category</th>
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Daily Rate</th>
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hidden md:table-cell">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <AnimatePresence mode='popLayout'>
                {cars.map((car, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    key={car._id} 
                    className='group hover:bg-surface/30 transition-colors'>

                    <td className='px-8 py-6'>
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-surface border border-border overflow-hidden p-2 group-hover:border-accent/30 transition-colors">
                           <img src={car.image} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className='text-base font-black text-primary tracking-tight'>{car.brand} {car.model}</p>
                          <p className='text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5'>{car.year} • {car.transmission}</p>
                        </div>
                      </div>
                    </td>

                    <td className='px-8 py-6 hidden lg:table-cell'>
                       <span className="text-sm font-bold text-text-muted">{car.category}</span>
                    </td>
                    
                    <td className='px-8 py-6'>
                       <p className="text-lg font-black text-primary">{currency}{car.pricePerDay}<span className="text-[10px] text-text-muted ml-1">/day</span></p>
                    </td>

                    <td className='px-8 py-6 hidden md:table-cell'>
                      <div className={`inline-flex items-center px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                        car.isAvaliable 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${car.isAvaliable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                        {car.isAvaliable ? "Live" : "Inactive"}
                      </div>
                    </td>

                    <td className='px-8 py-6'>
                      <div className="flex items-center justify-end gap-3">
                         <button 
                            onClick={() => toggleAvailability(car._id)}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl border border-border transition-all hover:shadow-md cursor-pointer ${car.isAvaliable ? 'hover:bg-rose-50 hover:border-rose-200' : 'hover:bg-emerald-50 hover:border-emerald-200'}`}
                            title={car.isAvaliable ? "Deactivate" : "Activate"}>
                            <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className="w-4 opacity-60" />
                         </button>
                         <button 
                            onClick={() => deleteCar(car._id)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-border hover:bg-rose-50 hover:border-rose-200 transition-all hover:shadow-md cursor-pointer"
                            title="Delete Vehicle">
                            <img src={assets.delete_icon} alt="" className="w-4 opacity-60" />
                         </button>
                      </div>
                    </td>

                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {cars.length === 0 && (
             <div className="py-24 text-center">
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                   <img src={assets.carIconColored} alt="" className="w-8 opacity-20 grayscale" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">No vehicles listed yet</h3>
                <p className="text-text-muted text-sm font-medium">Start building your premium fleet today.</p>
             </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ManageCars
