import React, { useState, useEffect } from "react";

import Hero from "../Components/Home/Hero";
import FAQ from "../Components/Home/FAQ";
import WhyChooseUs from "../Components/Home/WhyUs";
import Gallery from "../Components/Home/Gallery";
import CTASection from "../Components/Home/CTA";

import BG from "../assets/BG.mp4";
import Experience from "../Components/Home/Experience";
import SignatureDishes from "../Components/Home/SignatureDishes";
import Atmosphere from "../Components/Home/Atmosphere";

const HomePage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleVideoEnd = () => {
    setShowIntro(false);
  };


  return (
    <div className="-mt-20 relative">
{showIntro && (
  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
    
    {/* Skip Button */}
    <button
      onClick={() => setShowIntro(false)}
      className="cursor-pointer absolute top-6 right-6 z-50 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
    >
      Skip
    </button>

    <video
      className="w-full h-full object-cover"
      autoPlay
      muted
      playsInline
      onEnded={handleVideoEnd}
    >
      <source src={BG} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}

      {/* 🧠 MAIN WEBSITE */}
      {!showIntro && (
        <>
          <Hero />
          <Experience />
          <SignatureDishes />
          <Atmosphere />
          <CTASection />
          <Gallery />
        </>
      )}
    </div>
  );
};

export default HomePage;