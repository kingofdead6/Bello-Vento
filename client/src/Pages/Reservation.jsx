"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { CheckCircle, Users, Calendar, Clock, Armchair, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const TIME_SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", guests: 2,
    date: "", time: "", tableId: ""
  });

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (formData.date && formData.time && formData.guests) {
      fetchAvailableTables();
    }
  }, [formData.date, formData.time, formData.guests]);

  const fetchAvailableTables = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/reservations/availability`, { 
        params: { 
          date: formData.date, 
          time: formData.time, 
          guests: formData.guests 
        } 
      });
      setAvailableTables(res.data);
    } catch (err) {
      toast.error("Could not check availability");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/reservations`, { 
        ...formData, 
        table: formData.tableId 
      });
      setSuccess(true);
      setStep(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reservation failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center p-6">
      <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="text-center max-w-md">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-amber-700" />
        </div>
        <h2 className="font-serif text-4xl italic text-[#1a1816] mb-4">Request Received</h2>
        <p className="text-stone-500 leading-relaxed">
          Your table is held for <strong>1 hour</strong>. Our team will review and confirm your reservation shortly.
        </p>
      </motion.div>
    </div>
  );

  return (
    <div className="bg-[#f8f5f2] min-h-screen py-20 px-6 font-sans text-[#2d2a26]">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-16">
          <span className="text-amber-800 uppercase tracking-[0.3em] text-[10px] font-bold">The Guest List</span>
          <h1 className="text-5xl font-serif italic mt-2">Book a Table</h1>
        </header>

        {/* Progress Bar */}
        <div className="flex justify-between mb-12 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-amber-700' : 'bg-stone-200'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-2">Personal Details</label>
                <input className="w-full p-5 rounded-2xl border border-stone-200 bg-white outline-none focus:border-amber-700/30 transition-all" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input className="w-full p-5 rounded-2xl border border-stone-200 bg-white outline-none focus:border-amber-700/30 transition-all" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200">
                  <Users className="text-stone-300" size={20} />
                  <input type="number" className="outline-none w-full bg-transparent" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} />
                </div>
              </div>
              <button 
                disabled={!formData.name || !formData.phone}
                onClick={() => setStep(2)} 
                className="w-full bg-[#1a1816] text-white py-6 rounded-2xl uppercase tracking-widest font-bold text-sm shadow-xl shadow-stone-300 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                Choose Date <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-2">Select Date</label>
                <input type="date" className="w-full p-5 rounded-2xl border-none shadow-sm bg-white font-serif text-lg outline-none" onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              
              {formData.date && (
                <div className="space-y-4">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-2">Available Slots</label>
                   <div className="grid grid-cols-3 gap-3">
                    {TIME_SLOTS.map(t => (
                      <button 
                        key={t}
                        onClick={() => { setFormData({...formData, time: t}); setStep(3); }}
                        className={`py-4 rounded-xl border text-sm font-bold transition-all ${formData.time === t ? 'bg-amber-700 border-amber-700 text-white shadow-lg' : 'bg-white border-stone-100 text-stone-600 hover:border-amber-700/30'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={() => setStep(1)} className="w-full text-stone-400 text-xs uppercase tracking-widest font-bold">Go Back</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="flex justify-between items-end">
                <h2 className="font-serif text-3xl">Select Table</h2>
                <div className="text-[10px] uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">{formData.time} • {formData.date}</div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center py-12 text-stone-400">
                  <Loader2 className="animate-spin mb-4" />
                  <span className="text-xs uppercase tracking-widest">Checking Floor Plan...</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {availableTables.length > 0 ? availableTables.map(table => (
                    <button 
                      key={table._id}
                      onClick={() => setFormData({...formData, tableId: table._id})}
                      className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${formData.tableId === table._id ? 'border-amber-700 bg-white shadow-xl scale-[1.02]' : 'border-white bg-white/50 text-stone-400'}`}
                    >
                      <Armchair size={24} className={formData.tableId === table._id ? 'text-amber-700' : 'text-stone-200'} />
                      <span className="font-bold text-[#1a1816]">Table {table.number}</span>
                      <span className="text-[10px] uppercase tracking-tighter">Up to {table.capacity} Guests</span>
                    </button>
                  )) : (
                    <div className="col-span-2 py-10 text-center border-2 border-dashed border-stone-200 rounded-3xl text-stone-400 italic text-sm">
                      No tables available for this capacity at this time.
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-4">
                <button 
                  onClick={handleBooking} 
                  disabled={!formData.tableId || loading} 
                  className="w-full bg-amber-800 text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl disabled:opacity-30 transition-all"
                >
                  {loading ? "Holding Table..." : "Complete Booking"}
                </button>
                <button onClick={() => setStep(2)} className="w-full text-stone-400 text-xs uppercase tracking-widest font-bold">Change Time</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}