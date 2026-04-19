"use client";

import React from "react";
import { motion } from "framer-motion";
import storybg from "../../assets/about/aboutstory.png";
export default function AboutStory() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Background Image - Cinematic & Moody */}
      <div className="absolute inset-0">
        <img
          src={storybg}  
          alt="Crafted in silence"
          className="w-full h-full object-cover"
        />
        
        {/* Deep cinematic overlay with warm amber tone */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Subtle gold accent line */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-amber-400" />
            <span className="text-amber-400 text-sm tracking-[4px] uppercase font-light">Our Craft</span>
            <div className="h-px w-12 bg-amber-400" />
          </div>

          {/* Title */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif tracking-widest leading-none text-white mb-10">
            Crafted,<br />not constructed
          </h2>

          {/* Main Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-2xl md:text-3xl text-amber-100/90 font-light leading-relaxed tracking-wide"
          >
            We believe cuisine is discipline before it is creativity.<br />
            Every dish is reduced to what matters — and nothing more.
          </motion.p>
        </motion.div>
      </div>

      {/* Very subtle scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-400/60 text-xs tracking-widest"
      >
        <div className="h-px w-6 bg-amber-400/60" />
        SCROLL
        <div className="h-px w-6 bg-amber-400/60" />
      </motion.div>
    </section>
  );
}