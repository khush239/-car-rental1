import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Testimonial = () => {

  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional."
    },
    {
      name: "John Smith",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial: "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!"
    },
    {
      name: "Ava Johnson",
      location: "Sydney, Australia",
      image: assets.testimonial_image_1,
      testimonial: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service."
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 lg:px-12 xl:px-14 bg-surface overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <Title title="Voices of Excellence" subTitle="Hear from our distinguished clients who rely on CarRental for their most important journeys." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 md:mt-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              key={index} 
              className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-premium hover:shadow-glass transition-all duration-500 border border-border/50 group flex flex-col">
              
              <div className="flex items-center gap-1 mb-6">
                {Array(5).fill(0).map((_, i) => (
                  <img key={i} src={assets.star_icon} alt="star" className='w-4 h-4' />
                ))}
              </div>

              <p className="text-text-main text-lg md:text-xl leading-relaxed italic font-medium mb-10 flex-1">
                "{testimonial.testimonial}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <img className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/20" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <p className="text-lg font-bold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-text-muted font-semibold">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Testimonial
