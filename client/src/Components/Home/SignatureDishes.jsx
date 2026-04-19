"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const signatureDishes = [
  {
    id: 1,
    name: "Charred Wagyu, Smoked Salt Reduction",
    poetic: "A study in depth and silence",
    image: "https://via.placeholder.com/1200x800/1a140f/d4af88?text=Charred+Wagyu", // ← Replace with real URL from backend
  },
  {
    id: 2,
    name: "Scallops, Burnt Butter & Yuzu Kosho",
    poetic: "Whispers from the edge of the sea",
    image: "https://via.placeholder.com/1200x800/1a140f/8ab9a1?text=Scallops",
  },
  {
    id: 3,
    name: "Aged Duck Breast, Cherry Wood Glaze",
    poetic: "Time rendered into one perfect bite",
    image: "https://via.placeholder.com/1200x800/1a140f/a34c3f?text=Aged+Duck",
  },
  {
    id: 4,
    name: "Saffron Risotto, Black Truffle Shavings",
    poetic: "Golden fields meeting ancient earth",
    image: "https://via.placeholder.com/1200x800/1a140f/c9b37e?text=Risotto",
  },
  {
    id: 5,
    name: "Foie Gras Torchon, Burnt Fig & Brioche",
    poetic: "Velvet forged in quiet fire",
    image: "https://via.placeholder.com/1200x800/1a140f/9c7b5e?text=Foie+Gras",
  },
];

export default function SignatureDishesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
    }, 4500); // Change slide every 4.5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + signatureDishes.length) % signatureDishes.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#0c0a08] via-[#1a1612] to-[#0f0c0a] overflow-hidden">
      {/* Background texture for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#2a241f_0.8px,transparent_1px)] bg-[length:70px_70px] opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-amber-400 text-sm tracking-[4px] uppercase font-light">Signature</div>
        </div>

        <h2 className="text-center text-5xl md:text-7xl font-serif tracking-wider text-white mb-4">
          Signature Dishes
        </h2>

        <p className="text-center text-2xl md:text-3xl text-amber-100/70 font-light max-w-2xl mx-auto mb-16">
          Each plate is a chapter.<br />Each bite, a memory.
        </p>

        {/* Carousel Container */}
        <div 
          className="relative mx-auto max-w-6xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }} // Luxurious easing
            >
              {signatureDishes.map((dish) => (
                <div key={dish.id} className="min-w-full px-4">
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/40 group">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-[14000ms] group-hover:scale-110"
                    />
                    
                    {/* Cinematic gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 text-white">
                      <div className="text-amber-400 text-xs tracking-[3px] uppercase mb-3">Signature</div>
                      <h3 className="font-serif text-4xl md:text-6xl leading-none mb-6 max-w-2xl">
                        {dish.name}
                      </h3>
                      <p className="text-2xl md:text-3xl italic text-amber-100/90 font-light max-w-lg">
                        “{dish.poetic}”
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all backdrop-blur-md border border-white/10"
            aria-label="Previous dish"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all backdrop-blur-md border border-white/10"
            aria-label="Next dish"
          >
            →
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {signatureDishes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-amber-400 scale-125" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Closing poetic line */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20 text-lg text-amber-100/60 tracking-wide"
        >
          More than food. A moment suspended in time.
        </motion.p>
      </div>
    </section>
  );
}