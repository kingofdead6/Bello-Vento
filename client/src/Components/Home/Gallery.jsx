"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/gallery`);
        setGalleryImages(res.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger la galerie");
        toast.error("Erreur lors du chargement de la galerie");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 8000,
    slidesToShow: 3,
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

  // Loading State
  if (loading) {
    return (
      <section className="relative bg-[#0a0806] py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 w-40 mx-auto bg-white/10 rounded mb-4"></div>
            <div className="h-16 w-96 mx-auto bg-white/10 rounded mb-12"></div>
            <div className="h-[420px] bg-white/5 rounded-3xl"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error && galleryImages.length === 0) {
    return (
      <section className="relative bg-[#0a0806] py-32 text-center">
        <p className="text-red-400 text-xl mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
        >
          Réessayer
        </button>
      </section>
    );
  }

  return (
    <section className="relative bg-[#0a0806] py-20 md:py-32 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#2a241f_0.6px,transparent_1px)] bg-[length:60px_60px] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-amber-400/60" />
            <span className="text-amber-400 text-sm tracking-[4px] uppercase">Gallery</span>
            <div className="h-px w-12 bg-amber-400/60" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wider text-white">
            Moments captured in silence
          </h2>
          <p className="mt-4 text-amber-100/60 text-lg max-w-md mx-auto">
            Every frame holds a memory • Every light tells a story
          </p>
        </div>

        {/* Gallery Slider */}
        <div className="relative">
          {galleryImages.length > 0 ? (
            <Slider ref={sliderRef} {...settings}>
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image._id || index}
                  className="px-3 md:px-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] group">
                    <img
                      src={image.url}
                      alt={image.alt || "Gallery image"}
                      className="w-full h-full object-cover transition-transform duration-[14000ms] group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/1200x800/1a140f/2a241f?text=Image+Unavailable";
                      }}
                    />
                    
                    {/* Elegant dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Caption on hover */}
                    {image.alt && (
                      <div className="absolute bottom-8 left-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-white/90 text-lg font-light italic">
                          {image.alt}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </Slider>
          ) : (
            <div className="text-center py-20 text-amber-100/50">
              Aucune image dans la galerie pour le moment.
            </div>
          )}
        </div>

        {/* Bottom hint */}
        <div className="text-center mt-12">
          <p className="text-amber-100/40 text-xs tracking-[2px] uppercase">
            Scroll or wait • The gallery moves gently
          </p>
        </div>
      </div>
    </section>
  );
}