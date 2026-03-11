import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const FeaturedSection = () => {

    const navigate = useNavigate()
    const { cars } = useAppContext()

    return (
        <section className='flex flex-col items-center py-24 md:py-32 px-6 md:px-10 lg:px-12 xl:px-14 bg-white overflow-hidden'>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='w-full max-w-7xl px-2'>
                <Title title='Our Featured Vehicles' subTitle='Explore our finest selection of premium vehicles, meticulously maintained for your comfort and safety.' align='left' />
            </motion.div>

            <div
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-16 w-full max-w-7xl'>
                {
                    cars.slice(0, 8).map((car) => (
                        <CarCard key={car._id} car={car} />
                    ))
                }
            </div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onClick={() => {
                    navigate('/cars'); scrollTo(0, 0)
                }}
                className='flex items-center justify-center gap-3 px-10 py-4 border border-border hover:bg-surface rounded-full mt-20 cursor-pointer font-bold text-primary transition-all shadow-sm hover:shadow-md'>
                Explore Entire Collection <img src={assets.arrow_icon} alt="arrow" className='w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform' />
            </motion.button>

        </section>
    )
}

export default FeaturedSection
