"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";

export default function SignatureDishesCarousel() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch dishes from backend
  useEffect(() => {
    const fetchSignatureDishes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/signature-dishes`);
        setDishes(res.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les plats signature");
        toast.error("Erreur lors du chargement des plats signature");
      } finally {
        setLoading(false);
      }
    };

    fetchSignatureDishes();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isHovered || loading || dishes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dishes.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, loading, dishes.length]);

  const goToSlide = (index) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % dishes.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length);

  // Loading State
  if (loading) {
    return (
      <section className="relative bg-gradient-to-b from-[#0c0a08] via-[#1a1612] to-[#0f0c0a] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-32 mx-auto bg-white/10 rounded"></div>
            <div className="h-12 md:h-20 w-80 mx-auto bg-white/10 rounded"></div>
            <div className="h-[380px] md:h-[520px] bg-white/5 rounded-3xl mx-auto max-w-5xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error && dishes.length === 0) {
    return (
      <section className="relative bg-gradient-to-b from-[#0c0a08] via-[#1a1612] to-[#0f0c0a] py-24 text-center px-4">
        <p className="text-red-400 text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
        >
          Réessayer
        </button>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-[#0c0a08] via-[#1a1612] to-[#0f0c0a] overflow-hidden py-12 md:py-20">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#2a241f_0.8px,transparent_1px)] bg-[length:60px_60px] md:bg-[length:70px_70px] opacity-40" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="text-amber-400 text-xs md:text-sm tracking-[3px] md:tracking-[4px] uppercase font-light">Signature</div>
        </div>

        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wider text-white mb-3 md:mb-4 px-2">
          Signature Dishes
        </h2>

        <p className="text-center text-lg md:text-2xl lg:text-3xl text-amber-100/70 font-light max-w-2xl mx-auto mb-12 md:mb-16 px-4">
          Each plate is a chapter.<br className="hidden sm:block" /> Each bite, a memory.
        </p>

        {/* Carousel */}
        <div 
          className="relative mx-auto max-w-5xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
            >
              {dishes.map((dish) => (
                <div key={dish._id} className="min-w-full px-2 sm:px-4">
                  <div className="relative aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-amber-900/30 group">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/1200x800/1a140f/d4af88?text=Signature+Dish";
                      }}
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 lg:p-16 text-white">
                      <div className="text-amber-400 text-[10px] sm:text-xs tracking-[2px] uppercase mb-2 md:mb-3">Signature</div>
                      
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-none mb-4 md:mb-6">
                        {dish.name}
                      </h3>

                      {dish.poetic && (
                        <p className="text-base sm:text-lg md:text-2xl italic text-amber-100/90 font-light leading-tight max-w-lg">
                          “{dish.poetic}”
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows - Bigger & Better on Mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-4 sm:p-5 rounded-full transition-all backdrop-blur-md border border-white/20 text-2xl active:scale-95"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-4 sm:p-5 rounded-full transition-all backdrop-blur-md border border-white/20 text-2xl active:scale-95"
            aria-label="Next"
          >
            →
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8 md:mt-10">
            {dishes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 active:scale-125 ${
                  index === currentIndex 
                    ? "bg-amber-400 scale-125" 
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Closing line */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-20 text-sm md:text-lg text-amber-100/60 tracking-wide px-4"
        >
          More than food. A moment suspended in time.
        </motion.p>
      </div>
    </section>
  );
}