"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-b from-[#0f0c0a] to-[#050505] overflow-hidden">
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#2a241f_1px,transparent_1px)] bg-[length:80px_80px] opacity-20" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* Main Text */}
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-serif tracking-wider text-white leading-none mb-8"
        >
          Your table is waiting,<br />not reserved.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-2xl text-amber-100/70 font-light max-w-2xl mx-auto mb-16"
        >
          In a space shaped by time and intention, 
          one seat remains open — waiting for you.
        </motion.p>

        {/* Elegant CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <Link
            to="/reservations"
            className="group inline-flex items-center gap-4 px-14 py-7 bg-transparent border-2 border-amber-400 hover:border-amber-300 text-amber-400 hover:text-white text-xl font-medium rounded-2xl transition-all duration-500 hover:bg-amber-400/10 tracking-wider"
          >
            Begin Your Experience
            <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </motion.div>

        {/* Subtle footer text */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-sm text-white/40 tracking-widest uppercase"
        >
          Limited tables • Timeless evenings
        </motion.p>
      </div>
    </section>
  );
}