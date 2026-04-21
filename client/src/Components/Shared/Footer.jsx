"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "../../assets/Logo.png";   // Keep your logo or replace with Bello Vento version

export default function Footer() {
  return (
    <footer className="bg-[#0a0806] text-white pt-20 pb-12 px-6 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={Logo}
                alt="Bello Vento"
                className="h-30 w-auto object-contain"
              />
              <div>
              </div>
            </div>

            <p className="text-amber-100/70 text-lg leading-relaxed max-w-md">
              A place shaped by time, fire, and patience.<br />
              Where flavor becomes memory.
            </p>

            <div className="flex items-center gap-6 text-amber-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">Facebook</a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="lg:col-span-3">
            <h3 className="text-amber-400 text-sm tracking-[3px] uppercase mb-6">Explore</h3>
            <ul className="space-y-4 text-lg text-white/80">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/menu" className="hover:text-white transition">Menu</Link></li>
              <li><Link to="/reservation" className="hover:text-white transition">Reservations</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="lg:col-span-4">
            <h3 className="text-amber-400 text-sm tracking-[3px] uppercase mb-6">Visit Us</h3>
            
            <div className="space-y-6 text-white/70">
              <div className="flex items-start gap-4">
                <MapPin size={22} className="mt-1 text-amber-400" />
                <div>
                  <p>12 Rue des Oliviers</p>
                  <p>75016 Paris, France</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={22} className="text-amber-400" />
                <a href="tel:+33123456789" className="hover:text-white transition">
                  +33 1 23 45 67 89
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={22} className="text-amber-400" />
                <a href="mailto:reservations@bellovento.fr" className="hover:text-white transition">
                  reservations@bellovento.fr
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="mt-10">
              <h4 className="text-amber-400 text-sm tracking-[3px] uppercase mb-3">Hours</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Tuesday – Saturday<br />
                19:00 – 23:00
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 pt-10 border-t border-amber-900/30 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-amber-100/50">
          
          <p>
            © {new Date().getFullYear()} Bello Vento. All rights reserved.
          </p>

          <p>
            Made by <a
              href="https://softwebelevation.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-600 transition"
            >
              SoftWebElevation
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}