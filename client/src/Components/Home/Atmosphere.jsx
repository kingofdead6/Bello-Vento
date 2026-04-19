"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Atmosphere() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const videoId = "EeTAvwS9OO8";   // Correct video ID extracted from your link

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!showVideo) {
      setShowVideo(true);
    }
  };

  return (
    <section className="relative  bg-gradient-to-b from-[#0c0a08] via-[#1a1612] to-[#0f0c0a] overflow-hidden">
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#2a241f_0.8px,transparent_1px)] bg-[length:70px_70px] opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-amber-400 text-sm tracking-[4px] uppercase font-light">Atmosphere</div>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-7xl font-serif tracking-wider text-white mb-6"
        >
          Designed for stillness
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-2xl md:text-3xl text-amber-100/70 font-light max-w-2xl mx-auto mb-20"
        >
          Light is softened.<br />
          Sound is reduced.<br />
          Time slows here.
        </motion.p>

        {/* Video Container */}
        <div className="relative mx-auto max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30 aspect-video group bg-black">
          
          {/* YouTube Embed */}
          {showVideo && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? "1" : "0"}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
              title="Bello Vento Atmosphere"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* Custom Play Overlay (shown when paused) */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/30 z-10"
            >
              <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-white/80 backdrop-blur-lg bg-black/40 hover:bg-black/60 hover:scale-110 transition-all duration-500">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-16 h-16 md:w-20 md:h-20 text-white ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 4.01V8" />
                </svg>
              </div>
            </div>
          )}

          {/* Subtle label when paused */}
          {!isPlaying && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest uppercase font-light pointer-events-none z-10">
              Experience the stillness
            </div>
          )}

          {/* Pause button when playing */}
          {isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute top-6 right-6 bg-black/70 hover:bg-black/90 text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 transition-all backdrop-blur-md border border-white/10 z-20"
            >
              ⏸︎ Pause
            </button>
          )}

          {/* Sound hint when playing */}
          {isPlaying && (
            <div className="absolute bottom-6 left-6 text-white/50 text-xs tracking-widest z-20">
              Sound is on • Click pause to stop
            </div>
          )}
        </div>

        {/* Closing poetic line */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 text-lg text-amber-100/60 tracking-wide max-w-md mx-auto"
        >
          In this space, presence becomes the only luxury.
        </motion.p>
      </div>
    </section>
  );
}