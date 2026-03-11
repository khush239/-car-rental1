import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';

const Footer = () => {
    return (
    <footer className='px-6 md:px-10 lg:px-12 xl:px-14 py-24 bg-primary text-white overflow-hidden relative'>
            
            {/* Decorative background accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-white/5 border-b'>
                    
                    <div className='lg:col-span-5'>
                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            src={assets.logo} alt="logo" className='h-9 brightness-0 invert opacity-90' />

                        <p className='max-w-md mt-10 text-lg md:text-xl leading-relaxed text-white/50 font-medium'>
                            Defining the future of luxury transportation. Experience the world's most exclusive fleet with unparalleled, personalized service.
                        </p>
                        
                        <div className='flex items-center gap-4 mt-12'>
                            {[assets.facebook_logo, assets.instagram_logo, assets.twitter_logo, assets.gmail_logo].map((icon, i) => (
                                <motion.a 
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={i} 
                                    href="#" 
                                    className='w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-all duration-300'>
                                    <img src={icon} className='w-5 h-5 brightness-0 invert opacity-60' alt="" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className='lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12'>
                        <div>
                            <h2 className='text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-10'>Discovery</h2>
                            <ul className='flex flex-col gap-6 text-sm font-bold text-white/40'>
                                <li><a href="#" className='hover:text-white transition-all uppercase tracking-widest'>The Fleet</a></li>
                                <li><a href="#" className='hover:text-white transition-all uppercase tracking-widest'>Privileges</a></li>
                                <li><a href="#" className='hover:text-white transition-all uppercase tracking-widest'>List Vehicle</a></li>
                                <li><a href="#" className='hover:text-white transition-all uppercase tracking-widest'>Locations</a></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className='text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-10'>Support</h2>
                            <ul className='flex flex-col gap-6 text-sm font-bold text-white/40'>
                                <li><a href="#" className='hover:text-white transition-all uppercase tracking-widest'>Concierge</a></li>
                                <li><a href="#" className='hover:text-white transition-all uppercase tracking-widest'>Terms of Use</a></li>
                                <li><a href="#" className='hover:text-white transition-all uppercase tracking-widest'>Privacy</a></li>
                                <li><a href="#" className='hover:text-white transition-all uppercase tracking-widest'>Guidelines</a></li>
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <h2 className='text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-10'>Contact</h2>
                            <ul className='flex flex-col gap-6 text-sm font-bold text-white/40'>
                                <li className="cursor-default uppercase tracking-widest leading-relaxed">Mayfair Street 12,<br/>London W1J 7QS</li>
                                <li className="cursor-default uppercase tracking-widest">+44 20 7946 0958</li>
                                <li className="text-accent hover:text-white transition-all uppercase tracking-widest"><a href="mailto:concierge@carrental.com">concierge@voyage.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-8 items-center justify-between pt-12 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]'>
                    <p>© {new Date().getFullYear()} VOYAGE LUXURY RENTALS. EXCELLENCE REDEFINED.</p>
                    <div className='flex items-center gap-10'>
                        <a href="#" className='hover:text-white transition-all'>Terms</a>
                        <a href="#" className='hover:text-white transition-all'>Privacy</a>
                        <a href="#" className='hover:text-white transition-all'>Security</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
