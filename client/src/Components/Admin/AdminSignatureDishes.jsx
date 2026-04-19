"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";
import { Plus, Search, Trash2, X, Upload } from "lucide-react";

export default function AdminSignatureDishes() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDishName, setNewDishName] = useState("");
  const [newPoetic, setNewPoetic] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    const filtered = dishes.filter(dish =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDishes(filtered);
  }, [dishes, searchTerm]);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/signature-dishes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes(res.data);
    } catch (err) {
      toast.error("Erreur lors du chargement des plats signature");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();

    if (!newDishName.trim()) {
      return toast.error("Le nom du plat signature est requis");
    }
    if (!selectedImage) {
      return toast.error("Une image est obligatoire pour le plat signature");
    }

    setIsCreating(true);

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", newDishName.trim());
      if (newPoetic.trim()) {
        formData.append("poetic", newPoetic.trim());
      }
      formData.append("image", selectedImage);

      const res = await axios.post(`${API_BASE_URL}/signature-dishes`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setDishes([...dishes, res.data]);
      resetForm();
      setShowAddModal(false);
      toast.success("Plat signature ajouté avec succès");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de l'ajout du plat signature");
    } finally {
      setIsCreating(false);
    }
  };

  const resetForm = () => {
    setNewDishName("");
    setNewPoetic("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleDeleteDish = async (id, name) => {
    if (!window.confirm(`Supprimer le plat signature "${name}" ?`)) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/signature-dishes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes(dishes.filter(dish => dish._id !== id));
      toast.success("Plat signature supprimé avec succès");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen py-8 px-4 mt-14"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-stone-950">
              Plats Signature
            </h1>
            <p className="mt-4 text-lg text-stone-600">
              Gérez vos plats signature avec leurs images et textes poétiques
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-stone-900 text-white font-medium rounded-2xl hover:bg-blue-700 transition"
            >
              <Plus size={24} />
              Ajouter un plat signature
            </button>

            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Rechercher un plat signature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-stone-300 rounded-2xl focus:border-stone-900 outline-none"
              />
            </div>
          </div>

          {/* Dishes Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl text-stone-500">Chargement...</p>
            </div>
          ) : filteredDishes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-stone-400">Aucun plat signature trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredDishes.map((dish) => (
                <motion.div
                  key={dish._id}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-stone-200 hover:shadow-xl transition-all relative"
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    {dish.image ? (
                      <motion.img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        onError={(e) => {
                          e.target.src = "/placeholder.jpg";
                          e.target.onerror = null;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
                        Pas d'image
                      </div>
                    )}

                    <motion.div
                      className="absolute inset-0 bg-black/20"
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-stone-900">{dish.name}</h3>
                    {dish.poetic && (
                      <p className="text-sm text-stone-600 mt-2 italic line-clamp-3">
                        "{dish.poetic}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteDish(dish._id, dish.name)}
                    className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Add Signature Dish Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowAddModal(false); resetForm(); }}
            >
              <motion.div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Nouveau Plat Signature</h2>
                    <button 
                      onClick={() => { setShowAddModal(false); resetForm(); }} 
                      className="text-stone-400 hover:text-stone-600"
                    >
                      <X size={28} />
                    </button>
                  </div>

                  <form onSubmit={handleAddDish} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Nom du plat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newDishName}
                        onChange={(e) => setNewDishName(e.target.value)}
                        className="w-full px-5 py-4 border border-stone-300 rounded-2xl focus:border-stone-900 outline-none"
                        placeholder="Ex: Tajine d'agneau aux pruneaux"
                        required
                        disabled={isCreating}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Texte poétique (optionnel)
                      </label>
                      <textarea
                        value={newPoetic}
                        onChange={(e) => setNewPoetic(e.target.value)}
                        className="w-full px-5 py-4 border border-stone-300 rounded-2xl focus:border-stone-900 outline-none h-24 resize-y"
                        placeholder="Une touche de tradition, une explosion de saveurs..."
                        disabled={isCreating}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-3">
                        Image du plat <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-stone-300 rounded-2xl p-8 text-center hover:border-stone-400 transition">
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                          id="dish-image"
                          disabled={isCreating}
                        />
                        <label htmlFor="dish-image" className="cursor-pointer flex flex-col items-center">
                          <Upload size={40} className="text-stone-400 mb-3" />
                          <span className="text-sm text-stone-600">Cliquez pour ajouter une image</span>
                          <span className="text-xs text-stone-500 mt-1">(Recommandé: 800x600px ou plus)</span>
                        </label>
                      </div>

                      {imagePreview && (
                        <div className="mt-4 relative">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-48 object-cover rounded-2xl" 
                          />
                          <button
                            type="button"
                            onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                            disabled={isCreating}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-medium hover:bg-blue-700 transition disabled:bg-stone-400 flex items-center justify-center gap-2"
                        disabled={isCreating || !newDishName.trim() || !selectedImage}
                      >
                        {isCreating ? (
                          <>
                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                            Création en cours...
                          </>
                        ) : (
                          "Créer le plat signature"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => { setShowAddModal(false); resetForm(); }}
                        className="flex-1 py-4 border border-stone-300 rounded-2xl font-medium hover:bg-stone-100 transition"
                        disabled={isCreating}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}