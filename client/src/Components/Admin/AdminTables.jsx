import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";
import { Plus, Trash2, X, Armchair, ArrowLeft, Hash, Users, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminTables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [newTable, setNewTable] = useState({ number: "", capacity: 2 });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/tables`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTables(res.data);
    } catch (err) {
      toast.error("Failed to load floor plan");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE_URL}/tables`, newTable, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTables([...tables, res.data]);
      setShowAddModal(false);
      setNewTable({ number: "", capacity: 2 });
      toast.success(`Table ${newTable.number} added to floor plan`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding table");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTable = async (id, number) => {
    if (!window.confirm(`Permanently remove Table ${number} from the floor plan?`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/tables/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTables(tables.filter((t) => t._id !== id));
      toast.success("Table removed");
    } catch (err) {
      toast.error("Cannot delete table with active reservations");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 pt-32 relative bg-[#0c0a08] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#2a241f_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm tracking-[0.2em] uppercase font-light mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Center
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif tracking-wider text-white">Floor Plan</h1>
            <p className="mt-4 text-xl text-amber-100/50 font-light italic">Orchestrating the dining room flow.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-4 bg-gradient-to-br from-[#1a1612] to-[#120f0d] border border-amber-900/40 hover:border-amber-400/50 px-8 py-5 rounded-3xl transition-all duration-500 group"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-amber-400 text-black group-hover:rotate-90 transition-transform duration-500">
              <Plus size={24} />
            </div>
            <div className="text-left">
              <span className="block text-white text-lg tracking-wide">Add Table</span>
              <span className="text-amber-100/40 text-xs uppercase tracking-widest font-bold">New Inventory</span>
            </div>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#1a1612]/50 border border-amber-900/20 p-6 rounded-2xl flex items-center gap-4">
                <Layers className="text-amber-400" size={32} />
                <div>
                    <span className="block text-2xl font-serif text-white">{tables.length}</span>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Total Tables</span>
                </div>
            </div>
            <div className="bg-[#1a1612]/50 border border-amber-900/20 p-6 rounded-2xl flex items-center gap-4">
                <Users className="text-amber-400" size={32} />
                <div>
                    <span className="block text-2xl font-serif text-white">
                        {tables.reduce((acc, t) => acc + t.capacity, 0)}
                    </span>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Total Capacity</span>
                </div>
            </div>
        </div>

        {/* Tables Grid */}
        {loading ? (
          <div className="h-96 flex items-center justify-center text-amber-100/40 tracking-[0.3em] uppercase text-sm">Mapping the room...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence>
              {tables.map((table, idx) => (
                <motion.div
                  key={table._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative aspect-square bg-gradient-to-b from-[#1a1612] to-[#0c0a08] border border-amber-900/20 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 hover:border-amber-400/30 transition-all duration-500 shadow-2xl"
                >
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDeleteTable(table._id, table.number)} className="text-stone-600 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="p-4 bg-amber-400/5 rounded-full mb-2">
                    <Armchair className="text-amber-400/40 group-hover:text-amber-400 transition-colors duration-500" size={32} />
                  </div>
                  <span className="text-3xl font-serif text-white">#{table.number}</span>
                  <div className="flex items-center gap-2 text-stone-500">
                    <Users size={12} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Fits {table.capacity}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="bg-[#161310] border border-amber-900/30 rounded-[3rem] w-full max-w-md p-12 overflow-hidden relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-stone-500 hover:text-white transition-colors">
                <X size={32} />
              </button>

              <h2 className="text-4xl font-serif text-white mb-2">New Table</h2>
              <p className="text-amber-100/40 text-sm mb-10 font-light">Define a new physical seating area.</p>

              <form onSubmit={handleAddTable} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold ml-2">Table Number</label>
                  <div className="relative">
                    <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
                    <input
                      type="number"
                      required
                      className="w-full bg-black/40 border border-stone-800 focus:border-amber-400 p-5 pl-16 rounded-2xl text-white outline-none transition-all"
                      placeholder="e.g. 12"
                      value={newTable.number}
                      onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold ml-2">Guest Capacity</label>
                  <div className="relative">
                    <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full bg-black/40 border border-stone-800 focus:border-amber-400 p-5 pl-16 rounded-2xl text-white outline-none transition-all"
                      value={newTable.capacity}
                      onChange={(e) => setNewTable({...newTable, capacity: e.target.value})}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full py-6 bg-amber-400 hover:bg-amber-300 text-black rounded-2xl font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-30"
                >
                  {isCreating ? "Adding to Floor..." : "Add Table"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}