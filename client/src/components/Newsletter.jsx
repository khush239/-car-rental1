import React from 'react'
import { motion } from 'motion/react';

const Newsletter = () => {
    return (
        <section className="py-24 md:py-32 px-6 flex flex-col items-center justify-center text-center bg-white overflow-hidden relative">
            
            {/* Decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-black text-primary tracking-tight mb-6">
                    Stay Ahead of the <span className="text-gradient">Curve</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-base md:text-xl text-text-muted font-medium mb-12 max-w-2xl leading-relaxed">
                    Subscribe for exclusive early access to our newest arrivals, private collection drops, and bespoke driving experiences.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full glass p-2 rounded-2xl md:rounded-full border border-border shadow-glass">
                    <input
                        className="flex-1 outline-none w-full px-8 py-4 text-lg font-semibold text-text-main bg-transparent placeholder-text-muted/60"
                        type="email"
                        placeholder="Your elite email address"
                        required
                    />
                    <button type="submit" className="w-full sm:w-auto px-10 py-4 text-base font-black text-white bg-primary hover:bg-accent-dull transition-all cursor-pointer rounded-xl md:rounded-full shadow-premium whitespace-nowrap">
                        Join the Inner Circle
                    </button>
                </motion.form>
                
                <p className="mt-8 text-xs text-text-muted font-bold uppercase tracking-widest opacity-60">Join 10,000+ luxury enthusiasts</p>
            </div>
        </section>
    )
}

export default Newsletter
