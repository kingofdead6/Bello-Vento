"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

import InteriorMoody from "../../assets/experience/interior-moody.png";

const galleryImages = [
  { id: 1, url: InteriorMoody, alt: "Bello Vento intimate dining room" },
  { id: 2, url: InteriorMoody, alt: "Candlelit table setting" },
  { id: 3, url: InteriorMoody, alt: "Signature dish close-up" },
  { id: 4, url: InteriorMoody, alt: "Wine being poured" },
  { id: 5, url: InteriorMoody, alt: "Chef crafting in the kitchen" },
  { id: 6, url: InteriorMoody, alt: "Atmospheric dining space" },
  { id: 7, url: InteriorMoody, alt: "Luxury table details" },
];

export default function Gallery() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 8000,           // Very slow & cinematic movement
    slidesToShow: 3,       // Show 3 images at once on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="relative bg-[#0a0806] py-20 md:py-32 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#2a241f_0.6px,transparent_1px)] bg-[length:60px_60px] opacity-30" />

      <div className="max-w-full mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-amber-400/60" />
            <span className="text-amber-400 text-sm tracking-[4px] uppercase">Gallery</span>
            <div className="h-px w-12 bg-amber-400/60" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif tracking-wider text-white">
            Moments captured in silence
          </h2>
          <p className="mt-4 text-amber-100/60 text-lg max-w-md mx-auto">
            Every frame holds a memory • Every light tells a story
          </p>
        </div>

        {/* Full-Screen Style Carousel */}
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="px-3 md:px-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] group">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-[14000ms] group-hover:scale-105"
                  />
                  
                  {/* Elegant dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Optional subtle caption on hover */}
                  <div className="absolute bottom-8 left-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white/90 text-lg font-light italic">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>

        {/* Bottom subtle text */}
        <div className="text-center mt-12">
          <p className="text-amber-100/40 text-xs tracking-[2px] uppercase">
            Scroll or wait • The gallery moves gently
          </p>
        </div>
      </div>
    </section>
  );
}