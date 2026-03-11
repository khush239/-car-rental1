import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Cars = () => {

  // getting search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState('')

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = async () => {

    if (input === '') {
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice().filter((car) => {
      return car.brand.toLowerCase().includes(input.toLowerCase())
        || car.model.toLowerCase().includes(input.toLowerCase())
        || car.category.toLowerCase().includes(input.toLowerCase())
        || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailablity = async () => {
    const { data } = await axios.post('/api/bookings/check-availability', { location: pickupLocation, pickupDate, returnDate })
    if (data.success) {
      setFilteredCars(data.availableCars)
      if (data.availableCars.length === 0) {
        toast('No cars available')
      }
      return null
    }
  }

  useEffect(() => {
    isSearchData && searchCarAvailablity()
  }, [])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  }, [input, cars])

  return (
    <div className="bg-white min-h-screen">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col items-center py-24 md:py-32 bg-surface border-b border-border/50 px-6'>
        <Title 
          title='Our Elite Fleet' 
          subTitle='Browse our curated selection of premium vehicles, each meticulously maintained for an unparalleled driving experience.' 
        />

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.5 }}
           className='flex items-center glass px-6 md:px-10 mt-12 md:mt-16 max-w-4xl w-full h-16 md:h-20 rounded-2xl md:rounded-full shadow-glass border border-border group focus-within:border-accent/40 transition-all'>
           <img src={assets.search_icon} alt="search" className='w-5 h-5 md:w-6 md:h-6 mr-4 opacity-40 grayscale group-focus-within:opacity-100 group-focus-within:grayscale-0 transition-all' />

           <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder='Search by brand, model, or category...' 
              className='w-full h-full outline-none text-lg md:text-xl text-text-main bg-transparent font-semibold placeholder-text-muted/50' 
           />

           <div className='flex items-center gap-4 ml-4'>
             <div className='w-px h-8 bg-border'></div>
             <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className='p-2 hover:bg-white rounded-full transition-all'>
                <img src={assets.filter_icon} alt="filter" className='w-6 h-6 md:w-8 md:h-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all' />
             </motion.button>
           </div>
        </motion.div>
      </motion.div>

      <div className='px-6 md:px-10 lg:px-12 xl:px-14 py-16 md:py-20'>
        <div className='max-w-7xl mx-auto'>
           <div className='flex items-center justify-between mb-12'>
              <p className='text-text-muted text-sm md:text-base font-bold uppercase tracking-widest'>
                Showing <span className="text-primary">{filteredCars.length}</span> Premium Vehicles
              </p>
              <div className="h-px flex-1 bg-border mx-8 hidden md:block"></div>
           </div>

           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
             {filteredCars.map((car, index) => (
               <CarCard key={car._id} car={car} />
             ))}
           </div>

           {filteredCars.length === 0 && (
             <div className="py-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6">
                   <img src={assets.search_icon} alt="not found" className="w-8 h-8 opacity-20 grayscale" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">No vehicles found</h3>
                <p className="text-text-muted font-medium max-w-sm">We couldn't find any cars matching your current search criteria. Try a different keyword.</p>
             </div>
           )}
        </div>
      </div>

    </div>
  )
}

export default Cars
