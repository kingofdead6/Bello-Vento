"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroBG from "../../assets/HomeBG.mp4"
export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      
      {/* Video Background - Same for Desktop & Mobile */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src={HeroBG} 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark Cinematic Overlay */}
        
        {/* Subtle Gold Gradient Overlay for Luxury Feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">

          {/* Restaurant Name + Icon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <h1 className="text-6xl md:text-7xl font-serif tracking-wider text-white">
              BELLO VENTO
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-2xl md:text-3xl font-light text-stone-500 tracking-wide"
          >
            Where flavor becomes memory
          </motion.p>

          {/* Emotional Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 text-lg md:text-xl text-white/90 max-w-md mx-auto leading-relaxed font-light"
          >
            A ritual of taste.<br />
            Crafted in silence, served with intent.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-16 flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link
              to="/reservations"
              className="group px-10 py-5 bg-gold text-black bg-white/35 font-medium text-lg rounded-xl hover:bg-amber-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Reserve a Table
            </Link>

            <Link
              to="/menu"
              className="group px-10 py-5 border border-white/70 text-white hover:bg-white/10 backdrop-blur-sm font-medium text-lg rounded-xl transition-all duration-300"
            >
              Discover the Menu
            </Link>
          </motion.div>

          {/* Subtle Trust / Atmosphere Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-12 text-xs tracking-[3px] text-white/50 uppercase font-light"
          >
            Fine Dining • Intimate • Timeless
          </motion.p>

        </div>
      </div>
    </section>
  );
}