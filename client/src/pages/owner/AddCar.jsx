import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const AddCar = () => {

  const { axios, currency } = useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null

    if (!image) {
      return toast.error("Please upload a vehicle image")
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const { data } = await axios.post('/api/owner/add-car', formData)

      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: '',
          pricePerDay: '',
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          description: '',
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = "w-full bg-surface border border-border px-6 py-4 rounded-2xl text-base outline-none focus:border-accent transition-all font-bold text-text-main shadow-sm";
  const labelStyle = "text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-2 mb-2 block";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='w-full max-w-5xl mx-auto'>

      <Title 
        title="Register Vehicle" 
        subTitle="Expand your collection and offer premium driving experiences to our global guests." 
      />

      <form onSubmit={onSubmitHandler} className='mt-12 space-y-12 pb-20'>

        {/* Image Upload */}
        <div className="space-y-4">
           <label className={labelStyle}>Vehicle Presentation</label>
           <div className='relative group'>
             <label htmlFor="car-image" className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border/60 rounded-[2.5rem] bg-surface/50 hover:bg-surface transition-all cursor-pointer overflow-hidden group-hover:border-accent/40'>
                {image ? (
                   <img src={URL.createObjectURL(image)} alt="preview" className='w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-700' />
                ) : (
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-white border border-border flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform">
                         <img src={assets.upload_icon} alt="upload" className="w-6 opacity-40" />
                      </div>
                      <div className="text-center">
                         <p className="text-sm font-black text-primary uppercase tracking-widest">Upload Master Image</p>
                         <p className="text-[10px] font-bold text-text-muted mt-1 uppercase tracking-widest">PNG, JPG or WEBP (Max 5MB)</p>
                      </div>
                   </div>
                )}
                <input type="file" id="car-image" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
             </label>
             {image && (
                <button 
                  type="button" 
                  onClick={() => setImage(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white shadow-premium rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 border border-border cursor-pointer">
                  <img src={assets.delete_icon} alt="remove" className="w-4 opacity-40" />
                </button>
             )}
           </div>
        </div>

        {/* Form Grid */}
        <div className="bg-white rounded-[2.5rem] border border-border/50 p-8 md:p-12 shadow-premium space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className='space-y-2'>
              <label className={labelStyle}>Manufacturer / Brand</label>
              <input type="text" placeholder="e.g. Porsche, Bentley" required className={inputStyle} value={car.brand} onChange={e => setCar({ ...car, brand: e.target.value })} />
            </div>
            <div className='space-y-2'>
              <label className={labelStyle}>Model Name</label>
              <input type="text" placeholder="e.g. Taycan Turbo S" required className={inputStyle} value={car.model} onChange={e => setCar({ ...car, model: e.target.value })} />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            <div className='space-y-2'>
              <label className={labelStyle}>Manufacturing Year</label>
              <input type="number" placeholder="2025" required className={inputStyle} value={car.year} onChange={e => setCar({ ...car, year: e.target.value })} />
            </div>
            <div className='space-y-2'>
              <label className={labelStyle}>Daily Rate ({currency})</label>
              <input type="number" placeholder="450" required className={inputStyle} value={car.pricePerDay} onChange={e => setCar({ ...car, pricePerDay: e.target.value })} />
            </div>
            <div className='space-y-2'>
              <label className={labelStyle}>Category</label>
              <div className="relative">
                <select onChange={e => setCar({ ...car, category: e.target.value })} value={car.category} className={`${inputStyle} appearance-none cursor-pointer`}>
                  <option value="">Select Category</option>
                  <option value="Sedan">Luxury Sedan</option>
                  <option value="SUV">Premium SUV</option>
                  <option value="Van">Executive Van</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-text-muted">
                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            <div className='space-y-2'>
              <label className={labelStyle}>Transmission</label>
              <div className="relative">
                <select onChange={e => setCar({ ...car, transmission: e.target.value })} value={car.transmission} className={`${inputStyle} appearance-none cursor-pointer`}>
                  <option value="">Select Mode</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-text-muted">
                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <label className={labelStyle}>Fuel Specification</label>
              <div className="relative">
                <select onChange={e => setCar({ ...car, fuel_type: e.target.value })} value={car.fuel_type} className={`${inputStyle} appearance-none cursor-pointer`}>
                  <option value="">Select Fuel</option>
                  <option value="Gas">Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-text-muted">
                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <label className={labelStyle}>Seating Capacity</label>
              <input type="number" placeholder="4" required className={inputStyle} value={car.seating_capacity} onChange={e => setCar({ ...car, seating_capacity: e.target.value })} />
            </div>
          </div>

          <div className='space-y-2'>
            <label className={labelStyle}>Operational City</label>
            <div className="relative">
              <select onChange={e => setCar({ ...car, location: e.target.value })} value={car.location} className={`${inputStyle} appearance-none cursor-pointer`}>
                <option value="">Select Location</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Houston">Houston</option>
                <option value="Chicago">Chicago</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-text-muted">
                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <label className={labelStyle}>Experience Description</label>
            <textarea rows={5} placeholder="Describe the luxury features, performance, and unique highlights of this vehicle..." required className={`${inputStyle} rounded-[1.8rem] resize-none h-40`} value={car.description} onChange={e => setCar({ ...car, description: e.target.value })}></textarea>
          </div>

          <div className="pt-6">
             <button 
                disabled={isLoading}
                className='w-full bg-primary hover:bg-black disabled:bg-primary/50 text-white rounded-2xl py-5 font-black uppercase tracking-[0.2em] text-sm shadow-premium transition-all flex items-center justify-center gap-3 cursor-pointer group'>
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <img src={assets.tick_icon} alt="" className="w-4 brightness-0 invert opacity-40 group-hover:opacity-100 transition-opacity" />
                    Publish Listing
                  </>
                )}
             </button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default AddCar
