"use client";

import React from "react";
import { motion } from "framer-motion";
import chefhands from "../../assets/experience/chef-hands.png"
import interior from "../../assets/experience/interior-moody.png"
import plated from "../../assets/experience/plated-dish.png"
import cellar from "../../assets/experience/wine-cellar.png"
export default function Experience() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-b from-[#0c0a08] via-[#1a1612] to-[#0f0c0a]">
      
      {/* Subtle animated background texture + warm color depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#2a241f_0.6px,transparent_1px)] bg-[length:50px_50px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Title */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-5xl md:text-7xl font-serif tracking-widest text-white leading-none"
          >
            A place shaped by time,<br />fire, and patience
          </motion.h2>
        </div>

        {/* Introductory Text */}
        <div className="max-w-2xl mx-auto text-center mb-28">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-2xl md:text-3xl text-amber-100/80 font-light leading-relaxed tracking-wide"
          >
            Every plate tells a story of restraint and precision.<br />
            We do not rush flavor — we refine it.
          </motion.p>
        </div>

        {/* Experience Blocks - Alternating Left / Right */}
        <div className="space-y-40">

          {/* Block 1: The Space - Image LEFT */}
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="relative aspect-[16/9.5] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30"
              >
                <img 
                  src={interior}
                  alt="Bello Vento dining room" 
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-[10000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              </motion.div>
            </div>
            
            <div className="md:col-span-5 order-1 md:order-2 pt-8">
              <div className="inline-block text-amber-400 text-xs tracking-[4px] uppercase mb-6 border-b border-amber-500/30 pb-2">The Room</div>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-10">
                Silence has a sound here.
              </h3>
              <p className="text-xl text-amber-100/70 leading-relaxed">
                Charcoal walls absorb the noise of the world. Warm gold light falls only where it is needed. 
                Every table feels like its own private sanctuary — intimate, intentional, timeless.
              </p>
            </div>
          </div>

          {/* Block 2: The Craft - Image RIGHT */}
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 pt-8">
              <div className="inline-block text-amber-400 text-xs tracking-[4px] uppercase mb-6 border-b border-amber-500/30 pb-2">The Fire</div>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-10">
                What fire teaches us.
              </h3>
              <p className="text-xl text-amber-100/70 leading-relaxed">
                Flames are patient teachers. We watch, we wait, we reduce. 
                A sauce that takes three days. A broth that remembers every ingredient it has ever touched. 
                Flavor is not added — it is revealed.
              </p>
            </div>
            
            <div className="md:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="relative aspect-[16/9.5] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30"
              >
                <img 
                  src={chefhands} 
                  alt="Chef preparing dish" 
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-[10000ms]"
                />
              </motion.div>
            </div>
          </div>

          {/* Block 3: The Plate - Image LEFT */}
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="relative aspect-[16/9.5] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30"
              >
                <img 
                  src={plated} 
                  alt="Signature dish at Bello Vento" 
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-[10000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              </motion.div>
            </div>
            
            <div className="md:col-span-5 pt-8">
              <div className="inline-block text-amber-400 text-xs tracking-[4px] uppercase mb-6 border-b border-amber-500/30 pb-2">The Plate</div>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-10">
                Restraint is the highest form of respect.
              </h3>
              <p className="text-xl text-amber-100/70 leading-relaxed">
                We serve less so you taste more. Each element on the plate has earned its place. 
                Nothing is there for decoration — everything is there for memory.
              </p>
            </div>
          </div>

          {/* Block 4: The Cellar - Image RIGHT */}
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 pt-8">
              <div className="inline-block text-amber-400 text-xs tracking-[4px] uppercase mb-6 border-b border-amber-500/30 pb-2">The Cellar</div>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-10">
                Bottles that have waited longer than we have.
              </h3>
              <p className="text-xl text-amber-100/70 leading-relaxed">
                Time lives here in glass. Some wines have been resting for decades, 
                quietly becoming something greater. We pour them only when the moment deserves them.
              </p>
            </div>
            
            <div className="md:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="relative aspect-[16/9.5] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30"
              >
                <img 
                  src={cellar} 
                  alt="Bello Vento wine cellar" 
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-[10000ms]"
                />
              </motion.div>
            </div>
          </div>

        </div>

        {/* Closing Emotional Line */}
        <div className="mt-40 max-w-2xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3 }}
            className="text-3xl md:text-4xl italic text-amber-100/90 font-light leading-tight tracking-wide"
          >
            This is not a meal.<br />
            This is a memory you will carry long after the last candle is extinguished.
          </motion.p>
        </div>

      </div>
    </section>
  );
}